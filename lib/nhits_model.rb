
require 'pycall/import'

include PyCall::Import


module Nhits_model
    def forecast_model
        pyimport :os
        PyCall.sys.path.append('./nhits')
        app=PyCall.import_module("nhits")
        mae=app.predict_in_sample('./nhits/Amazon.csv')
        return mae
    end
  end   


