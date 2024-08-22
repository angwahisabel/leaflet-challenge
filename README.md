## 
http://127.0.0.1:5500/leaflet-challenge/Leaflet-Part-1/index.html

# Earthquake Map Visualization

This project visualizes recent earthquake data using Leaflet.js and D3.js. The map displays earthquake markers based on their magnitude, with a color-coded legend to indicate the scale of each magnitude.

### 1. **Clone the Repository**

### 2. **Install Dependencies**
Leaflet.js - For map rendering and interactivity.
D3.js - For fetching and processing data.

### 3. Project Setup
- **index.html** - The main HTML file containing the map container and links to the necessary CSS and JavaScript files.
- **static/css/style.css** - Custom CSS for styling the map and legend.
- **static/js/logic.js** - JavaScript file containing the logic for fetching earthquake data, creating map layers, and adding the legend.

### 4. Running the Project
Open the index.html file in a web browser to view the interactive earthquake map.

### 5. How It Works
API Data Fetching:

The project fetches earthquake data from the USGS Earthquake API.

### 6. Data Visualization:

http://127.0.0.1:5500/leaflet-challenge/Leaflet-Part-1/index.html

![Map Screenshot](images/Map1.png)
![Map Screenshot](images/Map2.png)




Earthquake data is visualized as circle markers on the map.
The size and color of each marker are based on the earthquake's magnitude.

### 7. Map Layers:

Two base map layers are available: Street Map and Topographic Map.
An overlay layer displays earthquake data.

### 8. Legend:

A legend is provided in the bottom-right corner of the map to indicate the magnitude scale with corresponding colors.