window.onload = function() {
  //set mae file path
  txt_path = ["maeAMZN.txt","maeAAPL.txt","maeNVDA.txt","maeDIS.txt","maeWMT.txt"]
  mae_result = []
  
  const fetchPromises = txt_path.map(path =>
      fetch(path)
        .then((res) => res.text())
        .then((text) => {
          mae_result.push(text.toString());
        })
        .catch((e) => console.error(e))
    );
  
    // Wait for all fetch promises to resolve
    Promise.all(fetchPromises)
      .then(() => {
        document.getElementById("forecast").innerHTML = mae_result[0];
        document.getElementById("vis-title").innerHTML = "Amazon";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
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

document.getElementById("first").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("chart-container-1").style.display="inline-block";
        document.getElementById("chart-container-2").style.display="none";
        document.getElementById("chart-container-3").style.display="none";
        document.getElementById("chart-container-4").style.display="none";
        document.getElementById("chart-container-5").style.display="none";


        var char1 = document.getElementById("myChart");

        char1.style.width="1000px";
        char1.style.height="500px";
    document.getElementById("forecast").innerHTML = mae_result[0]; 
    document.getElementById("vis-title").innerHTML = "Amazon"; 
});

document.getElementById("second").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="inline-block";
  
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="none";


  var char2 = document.getElementById("myChart2")

  char2.style.width="1000px";
  char2.style.height="500px";


  document.getElementById("forecast").innerHTML = mae_result[1]; 
  document.getElementById("vis-title").innerHTML = "Apple"; 

});

document.getElementById("third").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="inline-block";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="none";


  var char3 = document.getElementById("myChart3")

  char3.style.width="1000px";
  char3.style.height="500px";

  document.getElementById("forecast").innerHTML = mae_result[2]; 
  document.getElementById("vis-title").innerHTML = "Nvidia"; 
});

document.getElementById("forth").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="inline-block";
  document.getElementById("chart-container-5").style.display="none";

  var char4 = document.getElementById("myChart4")

  char4.style.width="1000px";
  char4.style.height="500px";

  document.getElementById("forecast").innerHTML = mae_result[3]; 
  document.getElementById("vis-title").innerHTML = "Disney"; 
});

document.getElementById("fifth").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="inline-block";


  var char5 = document.getElementById("myChart5")

  char5.style.width="1000px";
  char5.style.height="500px";

  document.getElementById("forecast").innerHTML = mae_result[4];
  document.getElementById("vis-title").innerHTML = "Walmart";  
});

function showChart(chart_class) {
  
     
  // Close the dropdown if the user clicks outside of it
  
 
  
    // display amazon result
   // if (chart_class == "first"){
        

        

        //document.getElementById("forecast").innerHTML = mae_result[0]; 

    // display apple result
    //}else if(chart_class=="second"){
        

        

        //document.getElementById("forecast").innerHTML = mae_result[1]; 
    // display Nvdia result
    //}else if(chart_class=="third"){
        


       
  
        //document.getElementById("forecast").innerHTML = mae_result[2]; 


    }

    
    

    //fs.readFile(txt_path, (error, data) => {
     // if (error) throw error;
   
     // mae=data.toString();
  //})

    
    //document.getElementById("perform").innerHTML = 100;

      
    
  
