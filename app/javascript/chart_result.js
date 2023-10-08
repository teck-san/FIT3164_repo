// Code using $ as usual goes here.


async function fetchCloseValues() {
  const response = await fetch("/Apple.csv");
  const csvString = await response.text();
      
  const results = Papa.parse(csvString, { header: true });
  const closeValues = results.data.map(row => row['Close']);
      
  return closeValues;
  }
  
  // Usage
fetchCloseValues().then(values => {
    console.log(values);
}).catch(error => {
    console.error("Error fetching close values:", error);
});
  

function fetchTrueData() {
  fetch('/Amazon.csv') 
  .then(response => response.text())
  .then(data => {
      const result = Papa.parse(data,{header:true,dynamicTyping:true});
      const extractedData = results.data.map(row => row["Close"])
      console.log(123)
      console.log(extractedData)

      return extractedData
  })
  .catch(error => {
      console.error('There was a problem with fetching the CSV data:', error);
  });
    // Return an array of historical data points
}
x = fetchTrueData();
console.log(1234)

const ctx = document.getElementById('myChart');
const data = fetchTrueData();
const data2 = generatePredictedData();
const totalDuration = 10000000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};


let chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: getLabels(),
    datasets: [
        {
            label: 'True Data',
            data: data, // True historical data
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        },
        {
            label: 'Predicted Data',
            data: data2, // Predicted data
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        },
    ],
    },
    options: {
        animation : animation,
        interaction : {
            intersect : false 
        },
        plugins:{
            legend : false
        },

        
    responsive: true,
    
    scales: {
        x: { type : 'linear'},
        y: {
        beginAtZero: true
        }
    }
    }
},);




/*
function getLabels(){
  lst = [2023-06-08    ,
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
    2023-08-18    ,
    2023-08-21    ,
    2023-08-22    ,
    2023-08-23    ,
    2023-08-24    ,
    2023-08-25    ,
    2023-08-28    ,
    2023-08-29   ,
    2023-08-30    ]
  return lst
}*/
// Function to generate predicted data based on animation progress
function generatePredictedData(animationProgress) {
    // Read csv file data to extract predicted value
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








