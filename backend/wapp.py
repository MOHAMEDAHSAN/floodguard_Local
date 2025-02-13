from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "https://flood-65.vercel.app"}})

# Global model loading
try:
    rf_model = joblib.load('backend\\rf_model.pkl')
    lstm_model = load_model('backend\\attention_model.h5', 
                           custom_objects={'MeanSquaredError': MeanSquaredError()})
except Exception as e:
    print(f"Model loading failed: {str(e)}")
    raise

def validate_input(data):
    """Validate and structure input data"""
    required = {
        "static": ["elevation", "impervious_pct", "drainage_capacity", "avg_slope"],
        "temporal": ["rainfall", "temperature", "antecedent_precipitation", 
                    "river_level", "groundwater_depth"]
    }
    
    if not all(key in data for key in required["static"]):
        return False, "Missing static parameters"
        
    for t_param in required["temporal"]:
        if len(data.get(t_param, [])) != 5:
            return False, f"Incorrect temporal parameter format for {t_param}"
            
    return True, ""

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Input validation
        is_valid, message = validate_input(data)
        if not is_valid:
            return jsonify({"error": message}), 400

        # Prepare model inputs
        static_input = np.array([[
            data['elevation'],
            data['impervious_pct'],
            data['drainage_capacity'],
            data['avg_slope']
        ]])
        
        temporal_input = np.array([[
            [data['rainfall'][i], data['temperature'][i], 
             data['antecedent_precipitation'][i], data['river_level'][i],
             data['groundwater_depth'][i]] for i in range(5)
        ]])

        # Generate predictions
        static_pred = rf_model.predict(
            np.repeat(static_input, repeats=5, axis=0)
        ).reshape(1, 5)
        
        lstm_pred = lstm_model.predict(temporal_input).squeeze()
        final_pred = (static_pred + lstm_pred).tolist()[0]

        return jsonify({
            "predictions": final_pred,
            "average_rise": round(np.mean(final_pred), 3),
            "max_rise": round(max(final_pred), 3),
            "confidence": "high" if np.std(final_pred) < 0.2 else "medium"
        })

    except Exception as e:
        return jsonify({
            "error": f"Prediction failed: {str(e)}",
            "success": False
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
