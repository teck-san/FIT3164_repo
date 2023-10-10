// Code using $ as usual goes here.

const canvas = document.getElementById('myChart');
const canvas2 = document.getElementById('myChart2');
const canvas3 = document.getElementById('myChart3');
const canvas4 = document.getElementById('myChart4');
const canvas5 = document.getElementById('myChart5');

const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
const ctx4 = canvas4.getContext('2d');
const ctx5 = canvas5.getContext('2d');


async function fetchCloseValues(csvFilePath) {
  const response = await fetch(csvFilePath);
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });
  let closeValues = results.data.map(row => row['Close']);
  let label = results.data.map(row=> row['Date']);
  closeValues = closeValues.slice(-180,-60).map(value=>parseFloat(value));
  label = label.slice(-180,-60);

  return {label , closeValues};
}

let predictNumber = 0
async function fetchPredictedValues(csvFilePath){
  const response = await fetch(csvFilePath);
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });
  let predictValue = results.data.map(row => row['NHITS']).filter(value=> value !== undefined && value !== '');
  predictValue = predictValue.map(value=>parseFloat(value));
  let label = results.data.map(row=> row['ds']).filter(value=> value !== undefined && value !== '');
  predictNumber = predictValue.length;

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


async function initialiseChart(id_name,inputCSVFilePath,outputCSVFilePath){
  const {combinedData,combinedLabels} = await combineDataAndLabel(inputCSVFilePath,outputCSVFilePath);
  let gradient = ctx.createLinearGradient (0,0,canvas.clientWidth,0);
  gradient.addColorStop(0,'green');
  gradient.addColorStop(0.68,'green');
  gradient.addColorStop(0.68,'red');
  gradient.addColorStop(1,'red');
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
  
  new Chart(id_name, {
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
      annotation:{
        annotations:[{
          type : 'line',
          mode: 'vertical',
                scaleID: 'x-axis-0', 
                value: combinedLabels[combinedData.length-predictNumber], 
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
        },
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
  
  
}

initialiseChart(ctx,"/AMZN.csv","/predictionAMZN.csv");
initialiseChart(ctx2,"/AAPL.csv","/predictionAAPL.csv");
initialiseChart(ctx3,"/NVDA.csv","/predictionNVDA.csv");
initialiseChart(ctx4,"/DIS.csv","/predictionDIS.csv");
initialiseChart(ctx5,"/WMT.csv","/predictionWMT.csv");



