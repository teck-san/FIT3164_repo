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


function showChart(chart_class) {
     
  // Close the dropdown if the user clicks outside of it
  
    if (chart_class == "first"){
        document.getElementById("chart-container-1").style.display="inline-block";
        document.getElementById("chart-container-2").style.display="none";
        document.getElementById("chart-container-3").style.display="none";

        var char1 = document.getElementById("myChart");

        char1.style.width="1000px";
        char1.style.height="500px";

        // set forecast result
        document.getElementById("forecast").innerHTML = 100;
        document.getElementById("perform").innerHTML = 100;

        


    }else if(chart_class=="second"){
        document.getElementById("chart-container-1").style.display="none";
        document.getElementById("chart-container-2").style.display="inline-block";
        
        document.getElementById("chart-container-3").style.display="none";

        var char2 = document.getElementById("myChart2")

        char2.style.width="1000px";
        char2.style.height="500px";

        // set performance result
        document.getElementById("forecast").innerHTML = 1000;
        document.getElementById("perform").innerHTML = 1000;

    }else if(chart_class=="third"){
        document.getElementById("chart-container-1").style.display="none";
        document.getElementById("chart-container-2").style.display="none";
        document.getElementById("chart-container-3").style.display="inline-block";

        var char3 = document.getElementById("myChart3")

        char3.style.width="1000px";
        char3.style.height="500px";


        // set performance result
        document.getElementById("forecast").innerHTML = 10000;
        document.getElementById("perform").innerHTML = 10000;


    }
      
    }
  
