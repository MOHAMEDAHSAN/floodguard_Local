import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
import pickle
from sklearn.ensemble import RandomForestRegressor
from tensorflow.keras.models import Model
from tensorflow.keras.layers import LSTM, Dense, Input, Attention, Multiply, Concatenate
from sklearn.preprocessing import RobustScaler
from sklearn.model_selection import TimeSeriesSplit, GridSearchCV

class FloodDataProcessor:
    def __init__(self, seq_length=5):
        self.seq_length = seq_length
        self.static_scaler = RobustScaler()
        self.ts_scaler = RobustScaler()
    
    def load_data(self, path='cleaned_data.csv'):
        df = pd.read_csv(path)
        df['date'] = pd.to_datetime(df['date'])
        return df
    
    def preprocess(self, df):
        grouped = df.groupby('sequence_id')
        sequences, targets, static_features = [], [], []
        
        for seq_id, group in grouped:
            ts_features = self.ts_scaler.fit_transform(group[['daily_rainfall', 'daily_water_release',
                                                               'lagged_level_3', 'lagged_level_5', 'lagged_level_7']])
            static = self.static_scaler.fit_transform(group[['urbanization_score', 'total_rainfall',
                                                              'drainage_quality', 'population_density']].iloc[0].values.reshape(1, -1))
            for i in range(len(group) - self.seq_length):
                sequences.append(ts_features[i:i+self.seq_length])
                static_features.append(static)
                targets.append(group['water_level_rise'].iloc[i+self.seq_length])
        
        return np.array(sequences), np.array(static_features).squeeze(), np.array(targets)

class HybridFloodModel:
    def __init__(self, processor, n_static_features=4):
        self.seq_length = processor.seq_length
        self.n_static_features = n_static_features
        self.rf_model = None
        self.lstm_model = None
        self.ensemble_weights = None
        self.processor = processor
    
    def build_attention_lstm(self):
        ts_input = Input(shape=(self.seq_length, 5))
        lstm1 = LSTM(64, return_sequences=True)(ts_input)
        attention = Attention()([lstm1, lstm1])
        attn_mult = Multiply()([lstm1, attention])
        
        static_input = Input(shape=(self.n_static_features,))
        static_dense = Dense(32, activation='relu')(static_input)
        
        lstm2 = LSTM(32)(attn_mult)
        merged = Concatenate()([lstm2, static_dense])
        output = Dense(1)(merged)
        
        model = Model(inputs=[ts_input, static_input], outputs=output)
        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                      loss='mean_squared_error', metrics=['mae'])
        return model
    
    def train_hybrid(self, X_seq, X_static, y):
        self.rf_model = RandomForestRegressor(n_estimators=200, max_depth=None)
        self.rf_model.fit(X_static, y)
        
        self.lstm_model = self.build_attention_lstm()
        self.lstm_model.fit([X_seq, X_static], y, epochs=5, batch_size=64, validation_split=0.2, verbose=1)
        
        rf_pred = self.rf_model.predict(X_static)
        lstm_pred = self.lstm_model.predict([X_seq, X_static]).flatten()
        self.ensemble_weights = np.linalg.lstsq(np.vstack([rf_pred, lstm_pred]).T, y, rcond=None)[0]
        self.ensemble_weights /= np.sum(self.ensemble_weights)
    
    def save_models(self, path='flood_model'):
        joblib.dump(self.rf_model, f'{path}_rf.pkl')
        self.lstm_model.save(f'{path}_lstm.h5')
        np.save(f'{path}_weights.npy', self.ensemble_weights)
    
    @classmethod
    def load_models(cls, processor, path='flood_model'):
        model = cls(processor)
        model.rf_model = joblib.load(f'{path}_rf.pkl')
        model.lstm_model = tf.keras.models.load_model(f'{path}_lstm.h5')
        model.ensemble_weights = np.load(f'{path}_weights.npy')
        return model

if __name__ == "__main__":
    processor = FloodDataProcessor()
    df = processor.load_data()
    sequences, static_features, targets = processor.preprocess(df)
    
    split_idx = int(0.8 * len(sequences))
    X_seq_train, X_seq_test = sequences[:split_idx], sequences[split_idx:]
    X_static_train, X_static_test = static_features[:split_idx], static_features[split_idx:]
    y_train, y_test = targets[:split_idx], targets[split_idx:]
    
    flood_model = HybridFloodModel(processor)
    flood_model.train_hybrid(X_seq_train, X_static_train, y_train)
    flood_model.save_models()
