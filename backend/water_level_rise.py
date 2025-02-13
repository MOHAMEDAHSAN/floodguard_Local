import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from keras.models import Model
from keras.layers import LSTM, Dense, Input
from sklearn.metrics import r2_score
import joblib

# Load and preprocess the data
data = pd.read_csv("backend\\final_dataset_flood.csv")

# Define feature names
static_features = ["elevation", "impervious_pct", "drainage_capacity", "avg_slope"]
temporal_features = ["rainfall", "temperature", "antecedent_precipitation", "river_level", "groundwater_depth"]

# Group by sequence_id to create time-series samples
sequence_ids = data["sequence_id"].unique()
X_static, X_temporal, y = [], [], []

for seq_id in sequence_ids:
    seq_data = data[data["sequence_id"] == seq_id].sort_values("date")
    X_static.append(seq_data[static_features].iloc[0].values)
    X_temporal.append(seq_data[temporal_features].values)
    y.append(seq_data["water_level_rise (m)"].values)

X_static = np.array(X_static)
X_temporal = np.array(X_temporal)
y = np.array(y)

# Split data into training and testing sets
X_static_train, X_static_test, X_temporal_train, X_temporal_test, y_train, y_test = train_test_split(
    X_static, X_temporal, y, test_size=0.2, random_state=42
)

# Train Random Forest on static features
y_train_flat = y_train.reshape(-1, 1).ravel()
X_static_train_flat = np.repeat(X_static_train, repeats=y_train.shape[1], axis=0)

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_static_train_flat, y_train_flat)

# Save the Random Forest model
joblib.dump(rf_model, 'backend/rf_model.pkl')
print("Random Forest model saved as 'rf_model.pkl'.")

# Define and Train LSTM to learn the residual (temporal) part
temporal_input = Input(shape=(X_temporal_train.shape[1], X_temporal_train.shape[2]))
lstm_layer = LSTM(64, return_sequences=True)(temporal_input)
dense_layer = Dense(32, activation='relu')(lstm_layer)
lstm_output = Dense(1)(dense_layer)

lstm_model = Model(inputs=temporal_input, outputs=lstm_output)
lstm_model.compile(optimizer='adam', loss='mse')

# Train the LSTM model on the residuals
lstm_model.fit(
    X_temporal_train, y_train - rf_model.predict(np.repeat(X_static_train, repeats=y_train.shape[1], axis=0)).reshape(y_train.shape),
    epochs=50, batch_size=16, validation_split=0.1
)

# Save the LSTM model
lstm_model.save('backend/lstm_model.h5')
print("LSTM model saved as 'lstm_model.h5'.")
