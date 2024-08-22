// Define the API endpoint for earthquake data
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get earthquake data from the API
d3.json(queryUrl).then(function (data) {
  // Pass the earthquake features to the function that creates the map layers
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  //Define style of each earthquake marker based on magnitude
  function styleInfo(feature) {
    return {
      radius: feature.properties.mag * 4,
      fillColor: getColor(feature.properties.mag),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  }

  // Define marker color based on earthquake magnitude
  function getColor(magnitude) {
    return magnitude > 5 ? "#ea2c2c" :
           magnitude > 4 ? "#ea822c" :
           magnitude > 3 ? "#ee9c00" :
           magnitude > 2 ? "#eecc00" :
           magnitude > 1 ? "#d4ee00" :
                           "#98ee00";
  }

  // Create a GeoJSON layer with earthquake markers
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      // Bind a popup to each marker with earthquake details
      layer.bindPopup(`<h3>${feature.properties.place}</h3>
                       <hr><p>${new Date(feature.properties.time)}</p>
                       <h2>Magnitude: ${feature.properties.mag}</h2>`);
    }
  });

  // Create the map with earthquake markers
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Define base layers for the map
  let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });

  let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors, SRTM | Map style &copy; OpenTopoMap (CC-BY-SA)'
  });

  // Define base and overlay maps
  let baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
  };

  let overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map with default layers
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [streetMap, earthquakes]
  });

  // Add layer control to switch between base and overlay maps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Create and add the legend to the map
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend'),
        magnitudes = [0, 1, 2, 3, 4, 5],
        colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];

    // Loop through our magnitude intervals and generate a label with a colored square for each interval
    for (let i = 0; i < magnitudes.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '"></i> ' +
        magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);
}