// Code using $ as usual goes here.

const ctx = document.getElementById('myChart');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: [2023-06-08    ,
        2023-06-09    ,
        2023-06-12   ,
        2023-06-13   ,
        2023-06-14    ,
        2023-06-15   ,
        2023-06-16   ,
        2023-06-20    ,
        2023-06-21   ,
        2023-06-22    ,
        2023-06-23   ,
        2023-06-26   ,
        2023-06-27    ,
        2023-06-28    ,
        2023-06-29    ,
        2023-06-30    ,
        2023-07-03    ,
        2023-07-05   ,
        2023-07-06    ,
        2023-07-07    ,
        2023-07-10    ,
        2023-07-11    ,
        2023-07-12   ,
        2023-07-13    ,
        2023-07-14    ,
        2023-07-17    ,
        2023-07-18    ,
        2023-07-19    ,
        2023-07-20    ,
        2023-07-21   ,
        2023-07-24    ,
        2023-07-25    ,
        2023-07-26   ,
        2023-07-27    ,
        2023-07-28    ,
        2023-07-31    ,
        2023-08-01    ,
        2023-08-02   ,
        2023-08-03   ,
        2023-08-04    ,
        2023-08-07   ,
        2023-08-08    ,
        2023-08-09   ,
        2023-08-10    ,
        2023-08-11    ,
        2023-08-14    ,
        2023-08-15    ,
        2023-08-16   ,
        2023-08-17    ,
        2023-08-18    ,
        2023-08-21    ,
        2023-08-22    ,
        2023-08-23    ,
        2023-08-24    ,
        2023-08-25    ,
        2023-08-28    ,
        2023-08-29   ,
        2023-08-30    ],
    datasets: [
        {
            label: 'True Data',
            data: fetchTrueData(), // True historical data
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        },
        {
            label: 'Predicted Data',
            data: generatePredictedData(), // Predicted data
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        },
    ],
    },
    options: {
        
    responsive: true,
    animation: {
        enabled: true,
        duration: 5000, // Total duration of the animation in milliseconds
        onProgress: function (animation){
            let chartInstance = this.chart,
                    dataset = chartInstance.data.datasets[0];
                
                for (let i = 0; i < dataset.data.length - 1; i++) {
                    let progress = animation.currentStep / animation.numSteps;
                    let nextDataPoint = dataset.data[i + 1];
                    if (progress > (i + 1) / dataset.data.length) {
                        nextDataPoint._noAnimation = true;
                    }
                }
                chartInstance.update();

        },
        onComplete: () => {
            let chartInstance = this.chart,
                    dataset = chartInstance.data.datasets[0];
                
                for (let i = 0; i < dataset.data.length; i++) {
                    dataset.data[i]._noAnimation = true;
                }
                chartInstance.update();
        }
    },
    
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});

function fetchTrueData() {
    // Replace with code to fetch real historical stock market data
    lst =  [127.256406
    ,   122.109906
    ,132.864865
    ,    129.117211
   ,  133.203587
    ,   128.343222
   ,   129.550245
    ,    125.474758
   ,   129.621716
    ,   131.157377
    ,   131.803428
    ,  127.751952
   ,  128.844584
    ,   125.359297
    ,   128.846908
    ,   124.514019
    ,  134.149693
   ,   134.869584
    ,   129.986089
    ,136.378181
    ,   132.371143
   ,   135.313979
    ,   128.677479
   ,    138.532054
    ,   139.771107
    ,    143.430751
    ,    139.188143
    ,   133.423347
   ,    137.535511
   ,    133.245155
    ,    133.762600
    ,   136.757103
    ,  135.930141
    ,   137.136040
    ,  141.995828
   ,   137.982518
    ,   140.905124
    ,    135.812698
   ,   142.931090
    ,   135.842875
   ,   145.814392
    ,   145.741524
   ,   144.640508
    ,   148.376256
 ,    146.302146
    ,   146.034137
   ,    145.783927
    ,    143.473336
    ,   140.411872
   ,   147.381581
    ,   143.574620
    ,   137.501036
   ,    145.442001
   ,   143.292532
    ,   147.198408
   ,   139.539805
   ,   146.266684
   ,   143.722559]
    return lst
    // Return an array of historical data points
}

// Function to generate predicted data based on animation progress
function generatePredictedData(animationProgress) {
    // Implement your forecasting model logic here
    lst = [   124.250000
        ,  123.430000
        ,  126.570000
       ,   126.660004
       ,   126.419998
       ,   127.110001
        ,   125.489998
       ,   125.779999
       ,   124.830002
        ,   130.149994
        ,    129.330002
       ,   127.330002
       ,   129.179993
       ,   129.039993
        ,   127.900002
       ,  130.360001
       ,  130.220001
       ,   130.380005
       ,  128.360001
       ,   129.779999
       ,  127.129997
       ,   128.779999
       ,   130.800003
       ,   134.300003
     ,   134.679993
       ,  133.559998
       ,   132.830002
       , 135.360001
      ,   129.960007
       ,   130.000000
       ,   128.800003
       ,   129.130005
        ,   128.149994
      ,  128.250000
      ,   132.210007
       ,   133.679993
       ,   131.690002
        ,  128.210007
      ,   128.910004
       ,   139.570007
       ,   142.220001
       ,   139.940002
        ,   137.850006
      ,   138.559998
       ,   138.410004
       ,   140.570007
       ,  137.669998
      ,   135.070007
        ,  133.979996
        ,  133.220001
        ,   134.679993
        ,   134.250000
       ,   135.520004
     ,   131.839996
        ,   133.259995
        ,   133.139999
       ,   134.910004
        ,  135.070007]
    return lst
    // Generate predicted data based on animation progress
    // Return an array of predicted data points
}



const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {
    type: 'bar',
    data: {
    labels: ['dog', 'cat', 'fish', 'lion', 'whale', 'monkey'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});



const ctx3 = document.getElementById('myChart3');

new Chart(ctx3, {
    type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});








