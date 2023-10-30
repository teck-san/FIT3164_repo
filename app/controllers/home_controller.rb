
require 'pycall/import'


class HomeController < ApplicationController
    
    
    def index
        @stockname = params[:search]
        PyCall.sys.path.append('./public/nhits')
        @return_status = nil
        app=PyCall.import_module("nhits")
        @return_status= app.predict(@stockname)
        
        print(@return_status)
        #mae = mae.round(2) 


        if @return_status === 0
            @flag = true

        elsif @return_status == -1
            @flag = false

        elsif @return_status == -2
            @flag = false
        elsif @return_status == -3
            @flag = false
        end

        
    end


































        #mae= app.predict_in_sample("./public/AAPL.csv","AAPL")
        #mae = mae.round(2)
        #mae= app.predict_in_sample("./public/DIS.csv","DIS")
        #mae= app.predict_in_sample("./public/NVDA.csv","NVDA")
        #mae= app.predict_in_sample("./public/WMT.csv","WMT")


        
        #pyimport :math

       # puts "xxxx"+request.path
       # if request.path == "/button1"
            #include Nhits_model
            #@mae=math.degrees(math.pi / 2)
            
            #@mae= app.predict_in_sample("./public/AMZN.csv")
            #@mae = @mae.round(2) 
        #elsif request.path == "/button2"
            #include Nhits_model

            #p app.scale_value(2,6)
            #p math.degrees(math.pi / 10)
            #@mae=math.degrees(math.pi / 10)
            #@mae= app.predict_in_sample("./public/AMZN.csv")
            #@mae = @mae.round(2) 
        #end
        
        

        
  
        


    #def nhits_model
        #@para="success"

        #PyCall.sys.path.append('./public/nhits')
    
        #@path = f
        #app=PyCall.import_module("nhits")
       
       
        #@mae= app.predict_in_sample("./public/nhits/Amazon.csv")
        #@mae = @mae.round(2) 
        #print @mae

       # puts "hehre"+button1_path+" "+button2_path
        
        
    #end


end



