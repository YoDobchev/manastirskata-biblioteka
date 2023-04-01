var map = L.map("map").setView([51.505, -0.09], 6);
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
).addTo(map);

// Marker icon boilerplate 
function createCustomIcon(iconUrl, iconSize, iconAnchor, popupAnchor) {
  return L.icon({
    iconUrl: iconUrl,           // Path to icon
    iconSize: iconSize,         // Size of icon [x, y]
    iconAnchor: iconAnchor,     // Anchor of icon [x, y]
    popupAnchor: popupAnchor,   // Anchor of popup [x, y]
  });
}

var currentLocationIcon = createCustomIcon( 
  "icons/current.svg",
  [32, 32],
  [16, 16],
  [0, -16]
); // Icon for current location of the user
var checkpointLocationIcon = createCustomIcon( 
  "icons/checkpoint.svg",
  [32, 32],
  [16, 16],
  [0, -16]
); // Icon for a checkpoint

L.marker([51.5, -0.09], { icon: currentLocationIcon }).addTo(map);

const userLocation = L.marker([0.0, 0.0], {
  icon: currentLocationIcon,
}).addTo(map);
let uLon, uLan;

// Get the user's location using the Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {

    // Set the marker's position to the user's location
    userLocation.setLatLng([
      position.coords.latitude,
      position.coords.longitude,
    ]);

    // Set the map's view to the user's location
    map.setView([position.coords.latitude, position.coords.longitude], 13);
    uLan = position.coords.latitude;
    uLon = position.coords.longitude;
  },
  (error) => {
    console.error(error);
  }
);

var control = L.Routing.control({
  options: [
    {
      routeWhileDragging: true, // Alows dynamically redrawing of the route
    },
  ],
  waypoints: [ // Waypoints of the route
    // L.latLng(userLocation.latitude, userLocation.longitude),
    L.latLng(52.23163710555889, 21.020493507385257),
    L.latLng(52.2163710555889, 21.040493507385257),
  ],

  lineOptions: { // Options for the line between the waypoints
    styles: [{ color: "purple", opacity: 0.7, weight: 8 }],
  },

  createMarker: function (i, waypoint, n) {
    // i is the i-th checkpoint, n is the number of waypoints
    // Adding checkpointLocationIcon marker to the waypoints
    return L.marker(waypoint.latLng, { icon: checkpointLocationIcon }).addTo(map);
  },
}).addTo(map);
