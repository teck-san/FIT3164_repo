from neuralforecast import NeuralForecast
from neuralforecast.models import NBEATS, NHITS
from neuralforecast.auto import AutoNHITS
from neuralforecast.core import NeuralForecast
from neuralforecast.losses.pytorch import MAE,MSE,DistributionLoss, HuberLoss
from neuralforecast.losses.numpy import mae, mse,mape
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd
import torch
import os
import sys


def read_csv(filename):
    df=pd.read_csv(filename)
    return df

def scale_value(x, max):
    return x/max

def descale_value(y, max):
    return y*max

def preprocess_data(df,scaling=True):
    df=df[['Date','High','Low','Close','Volume']]
    df=df.rename(columns={'Date': 'ds'})
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
    df['ds']=df['ds'].apply(lambda x:pd.Timestamp(x))
    if(scaling):
        df['y'] = df['y'].apply(lambda x: scale_value(x,scale))
    return df,scale




def predict_in_sample(filename,output):
    df=read_csv(filename)
    input_data=df[-180:-60]
    input_data,scale=preprocess_data(input_data)
    test_data=df[-60:]
    test_data,test_scale=preprocess_data(test_data,False)
    nhits_model = NeuralForecast.load(path='./lib//nhits/model/')
    prediction=nhits_model.predict(df=input_data).reset_index()
    close_prediction=prediction[prediction['unique_id']=='Close']
    test_data=test_data[test_data['unique_id']=='Close']
    close_prediction['NHITS'] = close_prediction['NHITS'].apply(lambda y: descale_value(y, scale))
    merged = test_data.merge(close_prediction, how='inner', on=['ds'])
    mae_score  =mae(merged['NHITS'], merged['y'])
    close_prediction.to_csv('public/prediction'+output+'.csv', index=False)
    with open('public/mae'+output+'.txt', 'w') as file:
        # Write new content to the file
        file.write(str(mae_score))
    torch.cuda.empty_cache()
    return mae_score
    


