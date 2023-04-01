// import L from 'leaflet/dist/leaflet'
// import 'leaflet-routing-machine'
// alert(1)
// var currentIcon = L.icon({
//     iconUrl: '..assets/icons/current.svg',
//     iconSize: [40, 40], // size of the icon
//     iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
// });
// var map = L.map('map').setView([51.505, -0.09], 13);


// 	L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// 	L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('sex')
//     .openPopup();
    
//     var start = L.latLng(51.5, -0.09);
//     var end = L.latLng(51.51, -0.1);
//     const userLocation = L.marker([0.0, 0.0], {icon: currentIcon}).addTo(map);

//     // Get the user's location using the Geolocation API
//     navigator.geolocation.getCurrentPosition(position => {
//     // Set the marker's position to the user's location
//     userLocation.setLatLng([position.coords.latitude, position.coords.longitude]);

//     // Set the map's view to the user's location
//     map.setView([position.coords.latitude, position.coords.longitude], 13);
//     }, error => {
//     console.error(error);
//     });

// var ors = L.Routing.control({
//         router: new L.Routing.openrouteservice({
//             api_key: process.env.ORS_API_KEY
//         }),
//         waypoints: [
//             L.latLng(51.5, -0.1),
//             L.latLng(51.52, -0.12)
//         ],
//         routeWhileDragging: true
//     }).addTo(map);

