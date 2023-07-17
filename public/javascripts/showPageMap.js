mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: spot.geometry.coordinates, // starting position [lng, lat]
    zoom: 14, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat(spot.geometry.coordinates)
.addTo(map);

new mapboxgl.Marker()
.setLngLat(spot.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        `<h4>${spot.title}</h4><p>${spot.location}</p>`
    )
).addTo(map)
