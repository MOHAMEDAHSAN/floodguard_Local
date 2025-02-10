from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the models
rf_model = joblib.load('backend/rf_model.pkl')
lstm_model = load_model('backend/lstm_model.h5', custom_objects={'mse': MeanSquaredError()})

# Initialize scalers
static_scaler = StandardScaler()
temporal_scaler = StandardScaler()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received input data:", data)  # Log input data

    # Validate input data
    required_fields = [
        "elevation", "impervious_pct", "drainage_capacity", "avg_slope",
        "rainfall", "temperature", "antecedent_precipitation", "river_level", "groundwater_depth"
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Extract static and temporal parameters
    static_input = np.array([[
        data['elevation'],
        data['impervious_pct'],
        data['drainage_capacity'],
        data['avg_slope']
    ]])

    temporal_input = np.array([[
        [data['rainfall'][0], data['temperature'][0], data['antecedent_precipitation'][0], data['river_level'][0], data['groundwater_depth'][0]],
        [data['rainfall'][1], data['temperature'][1], data['antecedent_precipitation'][1], data['river_level'][1], data['groundwater_depth'][1]],
        [data['rainfall'][2], data['temperature'][2], data['antecedent_precipitation'][2], data['river_level'][2], data['groundwater_depth'][2]],
        [data['rainfall'][3], data['temperature'][3], data['antecedent_precipitation'][3], data['river_level'][3], data['groundwater_depth'][3]],
        [data['rainfall'][4], data['temperature'][4], data['antecedent_precipitation'][4], data['river_level'][4], data['groundwater_depth'][4]]
    ]])

    print("Static input:", static_input)  # Log static input
    print("Temporal input:", temporal_input)  # Log temporal input

    # Normalize input data
    try:
        static_input_normalized = static_scaler.fit_transform(static_input)
        temporal_input_normalized = temporal_scaler.fit_transform(temporal_input.reshape(-1, temporal_input.shape[-1])).reshape(temporal_input.shape)
    except Exception as e:
        return jsonify({'error': f'Error normalizing input data: {str(e)}'}), 500

    print("Normalized static input:", static_input_normalized)  # Log normalized static input
    print("Normalized temporal input:", temporal_input_normalized)  # Log normalized temporal input

    # Predict using the RF model
    try:
        static_input_repeated = np.repeat(static_input_normalized, repeats=temporal_input_normalized.shape[1], axis=0)
        static_pred = rf_model.predict(static_input_repeated).reshape((1, temporal_input_normalized.shape[1]))
    except Exception as e:
        return jsonify({'error': f'Error predicting with RF model: {str(e)}'}), 500

    print("Static prediction:", static_pred)  # Log static prediction

    # Predict the temporal (residual) component using the LSTM model
    try:
        lstm_pred = lstm_model.predict(temporal_input_normalized).squeeze()
    except Exception as e:
        return jsonify({'error': f'Error predicting with LSTM model: {str(e)}'}), 500

    print("LSTM prediction:", lstm_pred)  # Log LSTM prediction

    # Final water level rise prediction is the sum of the static and temporal predictions
    final_pred = static_pred + lstm_pred

    print("Final prediction:", final_pred)  # Log final prediction

    # Check for NaN in predictions
    if np.isnan(final_pred).any():
        return jsonify({'error': 'Model predictions resulted in NaN values'}), 500

    return jsonify({'prediction': final_pred.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
