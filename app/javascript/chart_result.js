// Code using $ as usual goes here.

async function fetchCloseValues(csvFilePath) {
  const response = await fetch(csvFilePath);

  //Check if the response is status is not ok
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV file from ${csvFilePath}. Status: ${response.status} ${response.statusText}`);
  }
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });

  if (results.data.length < 180) {
    throw new Error(`The CSV file at ${csvFilePath} contains fewer than 180 data points. Found: ${results.data.length} data points.`);
  }
  let closeValues = results.data.map(row => row['Close']);
  let label = results.data.map(row=> row['Date']);
  closeValues = closeValues.slice(-180,-60).map(value=>parseFloat(value));
  label = label.slice(-180,-60);

  return {label , closeValues};
}



async function fetchPredictedValues(csvFilePath){
  const response = await fetch(csvFilePath);

  if (!response.ok) {
    throw new Error(`Failed to fetch CSV file from ${csvFilePath}. Status: ${response.status} ${response.statusText}`);
  }
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });
  let predictValue = results.data.map(row => row['NHITS']).filter(value=> value !== undefined && value !== '');
  predictValue = predictValue.map(value=>parseFloat(value));
  let label = results.data.map(row=> row['ds']).filter(value=> value !== undefined && value !== '');

  return {label ,predictValue};
}



async function combineDataAndLabel (inputCSVFilePath,outputCSVFilePath){
const [ amazon , prediction] = await Promise.all(
  [
    fetchCloseValues(inputCSVFilePath),
    fetchPredictedValues(outputCSVFilePath)
  ]);

  const combinedData = amazon.closeValues.concat(prediction.predictValue);
  const combinedLabels = amazon.label.concat(prediction.label);

  return {combinedData,combinedLabels};
}



async function initialiseChart(id_name,id_name2,inputCSVFilePath,outputCSVFilePath){
  
  const {combinedData,combinedLabels} = await combineDataAndLabel(inputCSVFilePath,outputCSVFilePath);
  let canvas = document.getElementById(id_name);
  let ctx = canvas.getContext('2d');
  let canvas2 = document.getElementById(id_name2);
  let ctx2 = canvas2.getContext('2d');
  document.getElementById("perform-start").innerHTML = "Start Date: "+combinedLabels[combinedLabels.length-60] ;  
  document.getElementById("perform-end").innerHTML = "End Date: "+combinedLabels[combinedLabels.length-1];  
  document.getElementById("perform-start-price" ).innerHTML = "$ "+Math.round(combinedData[combinedData.length-60]*100)/100;  
  document.getElementById("perform-end-price").innerHTML = "$ "+Math.round(combinedData[combinedData.length-1]*100)/100; 
  
  // set the percentage css if value <0 the box is red else is green
  var val = Math.round((((combinedData[combinedData.length-1]/combinedData[combinedData.length-60])-1 )*100)*100)/100
  var percent_space = document.getElementById("perform-percent");
  percent_space.style.padding="2rem";
  percent_space.style.borderRadius="1rem";
  if (val<0) {
    
    percent_space.style.backgroundColor="red";
    w_msg = "Loss: "
    
  } else {
    percent_space.style.backgroundColor="lightgreen";
    w_msg = "Gained: "
  }  
  
  document.getElementById("perform-percent").innerHTML = w_msg + Math.round((((combinedData[combinedData.length-1]/combinedData[combinedData.length-60])-1 )*100)*100)/100+"%";  
  let gradient = ctx.createLinearGradient (0,0,canvas.clientWidth,0);
  gradient.addColorStop(0,'black');
  gradient.addColorStop(0.68,'black');
  gradient.addColorStop(0.68,'blue');
  gradient.addColorStop(1,'blue');
  const totalDuration = 10000000;
  const delayBetweenPoints = totalDuration / combinedData.length;
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

  
  return new Promise((resolve) => {new Chart (ctx2,{
    type: 'line',
    data: {
      labels : [combinedLabels[combinedLabels.length-60],combinedLabels[combinedLabels.length-1]],
      datasets: [
        {
            label: 'Stock price',
            data: [combinedData[combinedData.length-60],combinedData[combinedData.length-1]], // True historical data
            borderColor: 'black',
            fill: false,
            pointBackgroundColor : ['black','blue'],
            pointRadius : 5,
            pointHoverRadius: 7,
        },
    ],
  
    
    },
    options:{
      
      legend: {display : false},
      scales : {
        yAxes : [{
          gridLines : {
            display : false
          }
        }]
      },
      annotation : {
        annotations : [ {
          type : 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value : combinedLabels[combinedLabels.length-1],
          borderColor : 'black',
          label : {
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            content: 'Predicted price: ' + combinedData[combinedData.length-1],
            enabled: true,
            position: 'left',
            xAdjust: -32,
            yAdjust: -40,
            font :{
              size : 20
            }
          }
        }]
      }

    },
    
  })


  new Chart(ctx, {
    type: 'line',
    data: {
    labels: combinedLabels,
    datasets: [
        {
            label: 'Stock price',
            data: combinedData, // True historical data
            borderColor: gradient,
            fill: false,
        },
    ],
    },
    options: {
      tooltips : {
        xPadding: 20,
        yPadding: 20,
        bodyFontSize : 20,
        callbacks: {
          title : function(){
            return '';

          },
          label: function(tooltipItem, data) {
              const date = data.labels[tooltipItem.index];
              const closePrice = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

              // Round off the close price to 2 decimal places
              const roundedClosePrice = closePrice.toFixed(2);

              return `${date}  -  ${roundedClosePrice} USD`;
          }
      },

      },
      legend: {display : true},
      annotation:{
        annotations:[{
          type : 'line',
          mode: 'vertical',
                scaleID: 'x-axis-0', 
                value: combinedLabels[combinedData.length-60], 
                borderColor: 'black',
                borderWidth: 2,
                label: {
                    content: 'Prediction Starts',
                    enabled: true,
                    position: 'top'
                }
        }]
      },
        animation : {
          animation,
          duration:2000,
          onComplete:() => resolve()
        },
        interaction : {
            intersect : false 
        },
        plugins:{
            legend : false
        },


        
    responsive: true,
    
    scales: {
        xAxes : [{
          gridLines:{color:"rgba(0,0,0,0)"},
        },
        ],
        
        x: { type : 'linear'
   },
        y: {
        beginAtZero: true,        

        }
    }
    }})}

  
  )
  



  
};

//window.onload = function() {
//alert("byebye")
//}
//function myFunction(){
//  initialiseChart("myChart","myChart6", "/AMZN.csv","/predictionAMZN.csv");
//  alert("HIHI")
//}

function myFunction() {
  
  initialiseChart("myChart","myChart6", "/Amazon.csv","/predictionAmazon.csv");
  document.getElementById("vis-title").innerHTML = "Amazon"; 



  
}


document.getElementById("first").addEventListener("click", async function(event) {
 
  initialiseChart("myChart","myChart6", "/Amazon.csv","/predictionAmazon.csv");
  document.getElementById("vis-title").innerHTML = "Amazon"; 
  
  

       
  
});

document.getElementById("second").addEventListener("click", async function(event) {
  event.preventDefault();
  await initialiseChart("myChart2","myChart7","/AAPL.csv","/predictionAAPL.csv");
  
 
});

document.getElementById("third").addEventListener("click", async function(event) {
  event.preventDefault();
  await initialiseChart("myChart3","myChart8","/NVDA.csv","/predictionNVDA.csv");
  
});

document.getElementById("forth").addEventListener("click", async function(event) {
  event.preventDefault();
  
  await initialiseChart("myChart4","myChart9","/GOOG.csv","/predictionGOOG.csv");
});

document.getElementById("fifth").addEventListener("click", async function(event) {
  event.preventDefault();
  await initialiseChart("myChart5","myChart10","/WMT.csv","/predictionWMT.csv");
 
});



