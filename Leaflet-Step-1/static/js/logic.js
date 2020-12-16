// Initialize map

var myMap = L.map('map', {
    center: [29.76, -95.68],
    zoom:5
    
});


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
}).addTo(myMap);


var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'

d3.json(link, function(data) {
    earthquakes = data.features;

  for (var i=0; i < earthquakes.length;i++){
      coords = [earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]];
      
      mag = earthquakes[i].properties.mag;
      place =  earthquakes[i].properties.place;
    

      var color = "";
      color = "#d7191c";
          if (mag > 5.8) {
      }
      else if (mag <= 5.0 ) {
        color = "#fc710d";
      }
      else if (mag > 4.5) {
        color = "#1a9641";
      }
      else if (mag> 4.0) {
        color = "yellow";
      }
    //   else if (mag > 4.5){
    //       color = "orange";
    //   }
      else { 
          color = "#f7f7f7";
      }

      L.circle(coords, {
          fillOpacity: .75,
          color: color,
                   
          fillColor: color,

          // Adjust radius
          radius:  25000*mag
        }).bindPopup("<h3>" + place + "</h3>" + "<hr>" + "Magnitude:"+mag ).addTo(myMap);
      } 

      function getColor(d) {
        return d > 5.8 ? "#d7191c":
            //    d > 5.5 ? 'blue' :
               d <= 5.0 ? "#fc710d" :
            //    d > 4.7 ? 'green' :
               d > 4.5 ? "#1a9641" :
               d > 4   ? 'yellow' :
                         '#f7f7f7';                     
    }



    
    var legend = L.control({position: 'bottomright'});
        
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [4.0,4.5,5.0,5.8],
      labels = [];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
       
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    
    legend.addTo(myMap);
  }
  
  )












	