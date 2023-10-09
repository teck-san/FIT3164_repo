// Code using $ as usual goes here.

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');
async function fetchCloseValues(csvFilePath) {
  const response = await fetch(csvFilePath);
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });
  let closeValues = results.data.map(row => row['Close']);
  let label = results.data.map(row=> row['Date']);
  closeValues = closeValues.slice(-120).map(value=>parseFloat(value));
  label = label.slice(-120);

  return {label , closeValues};
}

async function fetchPredictedValues(csvFilePath){
  const response = await fetch(csvFilePath);
  const csvString = await response.text();
    
  const results = Papa.parse(csvString, { header: true });
  let predictValue = results.data.map(row => row['NHITS']).filter(value=> value !== undefined && value !== '');
  predictValue = predictValue.map(value=>parseFloat(value));
  let label = results.data.map(row=> row['ds']).filter(value=> value !== undefined && value !== '');


  return {label ,predictValue};
}

async function combineDataAndLabel (){
const [ amazon , prediction] = await Promise.all(
  [
    fetchCloseValues("/Amazon.csv"),
    fetchPredictedValues("/prediction.csv")
  ]);

  const combinedData = amazon.closeValues.concat(prediction.predictValue);
  const combinedLabels = amazon.label.concat(prediction.label);

  return {combinedData,combinedLabels};
}



async function initialiseChart(){
  const {combinedData,combinedLabels} = await combineDataAndLabel();
  let gradient = ctx.createLinearGradient (0,0,canvas.clientWidth,0);
  gradient.addColorStop(0,'green');
  gradient.addColorStop(0.67,'green');
  gradient.addColorStop(0.67,'red');
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

      annotation:{
        annotation : [{
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value : combinedLabels[121],
          borderColor: 'black',
          borderWidth: 2,
          label:{
              content:'Predicted Data Start',
              enabled : true,
              position: 'top'
            }
          }]

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

initialiseChart();





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








