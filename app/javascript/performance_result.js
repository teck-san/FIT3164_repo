async function initialisePerformance(id_name,trueDataCSVPath,predictDataCSVFile){
    const response = await fetch(trueDataCSVPath);
    const csvString = await response.text();
  
    const results = Papa.parse(csvString, { header: true });
    let closeValues = results.data.map(row => row['Close']);
    let label = results.data.map(row=> row['Date']);
    closeValues = closeValues.slice(-180).map(value=>parseFloat(value));
    label = label.slice(-180);
  
    const response2 = await fetch(predictDataCSVFile);
    const csvString2 = await response2.text();
  
    const results2 = Papa.parse(csvString2, { header: true });
    let predictValue = results2.data.map(row => row['NHITS']);
    
    // Ensure that predicted values align with the last 60 days of true data
    predictValue = [...Array(120).fill(null), ...predictValue];
  
    let canvas = document.getElementById(id_name);
    let ctx = canvas.getContext('2d');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
              label: 'True Stock price',
              data: closeValues, // True historical data
              borderColor: 'black',
              fill: false,
          },
          {
            label: 'Predict price',
            data: predictValue, // Predicted data
            borderColor: 'blue',
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
                  value: label[label.length-60], 
                  borderColor: 'red',
                  borderWidth: 2,
                  label: {
                      content: 'Prediction Starts',
                      enabled: true,
                      position: 'top'
                  }
          }]
        },
        
        legend: {display: true},
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      },
    });
  }

  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  document.getElementById("drop-btn-p").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("myDropdown-p").classList.toggle("show");

});
document.getElementById("performance-page").addEventListener("click", function(event) {
     //set mae file path
     txt_path = ["maeAmazon.txt","maeAAPL.txt","maeNVDA.txt","maeGOOG.txt","maeWMT.txt"]
     mae_result = []
     
     const fetchPromises = txt_path.map(path =>
         fetch(path)
           .then((res) => res.text())
           .then((text) => {
             mae_result.push(Number(text).toFixed(2));
           })
           .catch((e) => console.error(e))
       );

       alert("hello world")
});

   
    
    
  
       
   

document.getElementById("first-p").addEventListener("click", function(event) {
    event.preventDefault();
    initialisePerformance("performance-chart1","/Amazon.csv","/predictionAmazon.csv");
    document.getElementById("chart-perform1").style.display="inline-block";
    document.getElementById("chart-perform2").style.display="none";
    document.getElementById("chart-perform3").style.display="none";
    document.getElementById("chart-perform4").style.display="none";
    document.getElementById("chart-perform5").style.display="none";
    
    document.getElementById("forecast").innerHTML = mae_result[0]; 
});

document.getElementById("second-p").addEventListener("click", function(event) {
  event.preventDefault();
  initialisePerformance("performance-chart2","/AAPL.csv","/predictionAAPL.csv");
  document.getElementById("chart-perform1").style.display="none";
    document.getElementById("chart-perform2").style.display="inline-block";
    document.getElementById("chart-perform3").style.display="none";
    document.getElementById("chart-perform4").style.display="none";
    document.getElementById("chart-perform5").style.display="none";

    document.getElementById("forecast").innerHTML = mae_result[1];
    
});

document.getElementById("third-p").addEventListener("click", function(event) {
  event.preventDefault();
  initialisePerformance("performance-chart3","/NVDA.csv","/predictionNVDA.csv");
  
  document.getElementById("chart-perform1").style.display="none";
    document.getElementById("chart-perform2").style.display="none";
    document.getElementById("chart-perform3").style.display="inline-block";
    document.getElementById("chart-perform4").style.display="none";
    document.getElementById("chart-perform5").style.display="none";

    document.getElementById("forecast").innerHTML = mae_result[2]; 
  
});

document.getElementById("forth-p").addEventListener("click", function(event) {
  event.preventDefault();
  initialisePerformance("performance-chart4","/GOOG.csv","/predictionGOOG.csv");
  
  document.getElementById("chart-perform1").style.display="none";
    document.getElementById("chart-perform2").style.display="none";
    document.getElementById("chart-perform3").style.display="none";
    document.getElementById("chart-perform4").style.display="inline-block";
    document.getElementById("chart-perform5").style.display="none";

    document.getElementById("forecast").innerHTML = mae_result[3]; 
  
});

document.getElementById("fifth-p").addEventListener("click", function(event) {
  event.preventDefault();
  initialisePerformance("performance-chart5","/WMT.csv","/predictionWMT.csv");
  document.getElementById("chart-perform1").style.display="none";
    document.getElementById("chart-perform2").style.display="none";
    document.getElementById("chart-perform3").style.display="none";
    document.getElementById("chart-perform4").style.display="none";
    document.getElementById("chart-perform5").style.display="inline-block";
    document.getElementById("forecast").innerHTML = mae_result[4];
    
});




  
  
  
  
