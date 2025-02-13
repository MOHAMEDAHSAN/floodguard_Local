import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from keras.models import Model, save_model
from keras.layers import Input, LSTM, Dense, Multiply, Softmax, Concatenate, TimeDistributed
from sklearn.metrics import r2_score
import joblib
import tensorflow as tf

# Configuration
SEQ_LENGTH = 5
STATIC_FEATURES = ["elevation", "impervious_pct", "drainage_capacity", "avg_slope"]
TEMPORAL_FEATURES = ["rainfall", "temperature", "antecedent_precipitation", "river_level", "groundwater_depth"]

def load_and_preprocess_data(file_path):
    """Load and preprocess dataset"""
    data = pd.read_csv(file_path)
    
    # Create sequence-based samples
    sequence_ids = data["sequence_id"].unique()
    X_static, X_temporal, y = [], [], []
    
    for seq_id in sequence_ids:
        seq_data = data[data["sequence_id"] == seq_id].sort_values("date")
        X_static.append(seq_data[STATIC_FEATURES].iloc[0].values)
        X_temporal.append(seq_data[TEMPORAL_FEATURES].values)
        y.append(seq_data["water_level_rise (m)"].values)
    
    return np.array(X_static), np.array(X_temporal), np.array(y)

def create_attention_model(input_shape):
    """Create attention-based LSTM architecture"""
    inputs = Input(shape=input_shape)
    
    # LSTM layer with 128 units
    lstm_out = LSTM(128, return_sequences=True)(inputs)
    
    # Attention mechanism
    attention = TimeDistributed(Dense(1, activation='tanh'))(lstm_out)
    attention = Softmax(axis=1)(attention)
    attended = Multiply()([lstm_out, attention])
    
    # Feature fusion
    merged = Concatenate()([lstm_out, attended])
    
    # Output layers
    dense = TimeDistributed(Dense(64, activation='relu'))(merged)
    outputs = TimeDistributed(Dense(1))(dense)
    
    return Model(inputs, outputs)

def compute_accuracy(y_true, y_pred, tolerance=0.25):
    """Calculate accuracy within tolerance range"""
    return np.mean(np.abs(y_true - y_pred) <= tolerance)

def main():
    # Load and prepare data
    X_static, X_temporal, y = load_and_preprocess_data("backend\\final_dataset_flood.csv")
    
    # Train-test split
    X_static_train, X_static_test, X_temporal_train, X_temporal_test, y_train, y_test = train_test_split(
        X_static, X_temporal, y, test_size=0.2, random_state=42
    )

    # Train Random Forest model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(
        np.repeat(X_static_train, repeats=y_train.shape[1], axis=0),
        y_train.reshape(-1).ravel()
    )
    joblib.dump(rf_model, 'backend/rf_model.pkl')

    # Create and train attention model
    lstm_model = create_attention_model((X_temporal_train.shape[1], X_temporal_train.shape[2]))
    lstm_model.compile(optimizer='adam', loss='mse')
    
    # Calculate residuals
    residuals = y_train - rf_model.predict(
        np.repeat(X_static_train, repeats=y_train.shape[1], axis=0)
    ).reshape(y_train.shape)
    
    # Model training
    lstm_model.fit(
        X_temporal_train,
        residuals,
        epochs=25,
        batch_size=16,
        validation_split=0.1,
        verbose=1
    )
    lstm_model.save('backend/attention_model.h5')

    # Generate predictions
    lstm_pred = lstm_model.predict(X_temporal_test).squeeze()
    rf_pred = rf_model.predict(
        np.repeat(X_static_test, repeats=y_test.shape[1], axis=0)
    ).reshape(y_test.shape)
    
    final_pred = rf_pred + lstm_pred

    # Evaluate performance
    print(f"Test R²: {r2_score(y_test.ravel(), final_pred.ravel()):.4f}")
    print(f"Test Accuracy: {compute_accuracy(y_test, final_pred):.2%}")

if __name__ == "__main__":
    main()
