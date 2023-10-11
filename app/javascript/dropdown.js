  
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


        var char1 = document.getElementById("myChart");

        char1.style.width="1000px";
        char1.style.height="500px";

        var char6 = document.getElementById("myChart6");

        char6.style.width="500px";
        char6.style.height="200px";

    

    
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



  var char2 = document.getElementById("myChart2")

  char2.style.width="1000px";
  char2.style.height="500px";

  var char7 = document.getElementById("myChart7");

        char7.style.width="500px";
        char7.style.height="200px";


   
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



  var char3 = document.getElementById("myChart3")

  char3.style.width="1000px";
  char3.style.height="500px";

  var char8 = document.getElementById("myChart8");

        char8.style.width="500px";
        char8.style.height="200px";

  
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

  var char4 = document.getElementById("myChart4")

  char4.style.width="1000px";
  char4.style.height="500px";

  var char9 = document.getElementById("myChart9");

        char9.style.width="500px";
        char9.style.height="200px";

  
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


  var char5 = document.getElementById("myChart5")

  char5.style.width="1000px";
  char5.style.height="500px";

  var char10 = document.getElementById("myChart10");

        char10.style.width="500px";
        char10.style.height="200px";

  
  document.getElementById("vis-title").innerHTML = "Walmart";  
});

      
    
  
