from neuralforecast import NeuralForecast
from neuralforecast.models import NHITS
from neuralforecast.auto import AutoNHITS
from neuralforecast.core import NeuralForecast
from neuralforecast.losses.pytorch import MAE,MSE,DistributionLoss, HuberLoss
from neuralforecast.losses.numpy import mae, mse,mape
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import os
import sys
import requests
from io import StringIO
import json


API_URL = "https://www.alphavantage.co/query"
API_KEY = "LGKO47FQPHVWG39B"
SYMBOL = "AAPL"
ERROR_INVALID_STOCK=-1
ERROR_API_USAGE_LIMIT=-2

#read csv and return dataframe
def read_csv(filename):
    df=pd.read_csv(filename)
    return df

#scale value
def scale_value(x, max):
    return x/max

#descale value
def descale_value(y, max):
    return y*max

#preprocess data
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



#in sample prediction based on historical data from csv files
def predict_in_sample(filename):
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
    close_prediction.to_csv('public/in_sample_prediction.csv', index=False)
    with open('public/mae.txt', 'w') as file:
        # Write mae score  to the file
        file.write(str(mae_score))
    return mae_score

#perform prediction on future stock price based on recent data from api  
def predict(stock_name):
    df=retrieve_data(stock_name)
    #return error if fetching data  encountered error
    if type(df)==int:
        return df
    input_data=df[-120:]
    input_data,scale=preprocess_data(input_data)
    nhits_model = NeuralForecast.load(path='./lib//nhits/model/')
    prediction=nhits_model.predict(df=input_data).reset_index()
    close_prediction=prediction[prediction['unique_id']=='Close']
    close_prediction['NHITS'] = close_prediction['NHITS'].apply(lambda y: descale_value(y, scale))
    df[-120:].to_csv('public/input.csv',index=False)
    close_prediction.to_csv('public/prediction.csv', index=False)
    return 0


#retrieve data from stock api 
def retrieve_data(stockname):
    symbol =stockname
    data = {
        "function" : "TIME_SERIES_DAILY",
        "symbol" : symbol,
        "apikey" : API_KEY,
        "outputsize" : "full",
        "datatype" : "csv"

    }
    response = requests.get(API_URL,params= data)
    try:
        stock_df = pd.read_csv(StringIO(response.content.decode('utf-8')))
        stock_df=stock_df.rename(columns={'timestamp': 'Date','open':'Open','high':'High','low':'Low','close':'Close','volume':'Volume'})
        stock_date=stock_df['Date']
        return stock_df[::-1]

    except:
        response_string = response.content.decode('utf-8')
        response_json = json.loads(response_string)
        keys=response_json.keys()
        print(response_json)
        for key in keys:
            print(key)
            #invalid stock name
            if key.lower()=="error message":
                
                return ERROR_INVALID_STOCK
            #api key reached usage limit
            else:
                return ERROR_API_USAGE_LIMIT


print(API_KEY)
print(predict("GOOG"))