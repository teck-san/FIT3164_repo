
#require 'pycall/import'

#include PyCall::Import

#require 'nhits_model'

  

class HomeController < ApplicationController
    #include Nhits_model
    
    
    def index
  
      

        @forecasted = `python3 lib/assets/python/model.py`
        @forelist=[1,2,3,4,5]
        @data_keys = [
            'January',
            'February',
          'March',
              'April',
              'May',
              'June',
            ]
        @data_values = [0, 10, 5, 2, 20, 30, 45]
        
      
        PyCall.sys.path.append('./lib/nhits')
        

        #@path = f
        app=PyCall.import_module("nhits")
       
       
        @mae= app.predict_in_sample("./lib/nhits/Amazon.csv")
        @mae = @mae.round(2) 
        #print @mae

        
  
        

    end

end



