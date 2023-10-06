

class HomeController < ApplicationController

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

    end

end



