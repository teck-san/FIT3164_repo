from neuralforecast import NeuralForecast
from neuralforecast.models import NBEATS, NHITS
from neuralforecast.auto import AutoNHITS
from neuralforecast.core import NeuralForecast
from neuralforecast.losses.pytorch import MAE,MSE,DistributionLoss, HuberLoss
from neuralforecast.losses.numpy import mae, mse,mape
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd

scale=None

def read_csv(filename):
    df=pd.read_csv(file)
    return df

def scale_value(x, max):
    return x/max

def descale_value(y, max):
    return y*max

def preprocess_data(df):
    df=df[['Date','High','Low','Close','Volume']]
    df=df.rename(columns={'Date': 'ds'})
    df['Datetime'] = pd.to_datetime(df['ds'])
    # Calculate the EMV
    emv_values = []
    for i in range(1, len(df)):
        high_today = df['High'].iloc[i]
        low_today = df['Low'].iloc[i]
        high_yesterday = df['High'].iloc[i - 1]
        low_yesterday = df['Low'].iloc[i - 1]
        volume_today = df['Volume'].iloc[i]

        numerator = ((high_today + low_today) / 2) - ((high_yesterday + low_yesterday) / 2)
        denominator = (volume_today / 1_000_000) / ((high_today - low_today) / 2)

        emv = numerator / denominator

        emv_values.append(emv)

    # Add EMV values to the DataFrame
    df['EMV'] = [0] + emv_values
    scale = df['Close'].max()
    df = df.melt(id_vars=['ds'], var_name='unique_id', value_name='y')
    df['y'] = df['y'].apply(lambda x: scale_value(x,scale))


def predict_in_sample(filename):
    df=read_csv('dataset/'+filename)
    preprocess_data(df)
    input_data=df[-180:-60]
    test_data=df[-60:]
    nhits_model = NeuralForecast.load(path='./model/')
    prediction=nhits_model.predict(df=input_data).reset_index()
    close_prediction=prediction[prediction['unique_id']=='Close']
    close_prediction['AutoNHITS'] = close_prediction['AutoNHITS'].apply(lambda y: descale_value(y, scale))
    merged = test_data.merge(close_prediction, how='inner', on=['ds'])
    mae_score  =mae(merged['AutoNHITS'], merged['y'])
    close_prediction.to_csv('prediction.csv', index=False)
    with open('mae.txt', 'w') as file:
        # Write new content to the file
        file.write(mae_score)