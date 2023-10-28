  
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
  document.getElementById("drop-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");

});

document.getElementById("first").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("chart-container-1").style.display="inline-block";
    document.getElementById("chart-container-2").style.display="none";
    document.getElementById("chart-container-3").style.display="none";
    document.getElementById("chart-container-4").style.display="none";
    document.getElementById("chart-container-5").style.display="none";
    document.getElementById("chart-container-6").style.display="inline-block";
    document.getElementById("chart-container-7").style.display="none";
    document.getElementById("chart-container-8").style.display="none";
    document.getElementById("chart-container-9").style.display="none";
    document.getElementById("chart-container-10").style.display="none";


    

    
    document.getElementById("vis-title").innerHTML = "Amazon"; 
});

document.getElementById("second").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="inline-block";
  
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="none";
  document.getElementById("chart-container-6").style.display="none";
    document.getElementById("chart-container-7").style.display="inline-block";
    document.getElementById("chart-container-8").style.display="none";
    document.getElementById("chart-container-9").style.display="none";
    document.getElementById("chart-container-10").style.display="none";




     


   
  document.getElementById("vis-title").innerHTML = "Apple"; 

});

document.getElementById("third").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="inline-block";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="none";
  document.getElementById("chart-container-6").style.display="none";
    document.getElementById("chart-container-7").style.display="none";
    document.getElementById("chart-container-8").style.display="inline-block";
    document.getElementById("chart-container-9").style.display="none";
    document.getElementById("chart-container-10").style.display="none";



  
  document.getElementById("vis-title").innerHTML = "Nvidia"; 
});

document.getElementById("forth").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="inline-block";
  document.getElementById("chart-container-5").style.display="none";
  document.getElementById("chart-container-6").style.display="none";
    document.getElementById("chart-container-7").style.display="none";
    document.getElementById("chart-container-8").style.display="none";
    document.getElementById("chart-container-9").style.display="inline-block";
    document.getElementById("chart-container-10").style.display="none";



  
  document.getElementById("vis-title").innerHTML = "Google"; 
});

document.getElementById("fifth").addEventListener("click", function(event) {
  event.preventDefault();

  document.getElementById("chart-container-1").style.display="none";
  document.getElementById("chart-container-2").style.display="none";
  document.getElementById("chart-container-3").style.display="none";
  document.getElementById("chart-container-4").style.display="none";
  document.getElementById("chart-container-5").style.display="inline-block";
  document.getElementById("chart-container-6").style.display="none";
    document.getElementById("chart-container-7").style.display="none";
    document.getElementById("chart-container-8").style.display="none";
    document.getElementById("chart-container-9").style.display="none";
    document.getElementById("chart-container-10").style.display="inline-block";

  
  document.getElementById("vis-title").innerHTML = "Walmart";  
});

      
    
  
