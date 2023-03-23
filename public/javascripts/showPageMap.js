const goodCampground = campground
console.log(goodCampground.geometry.coordinates)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: goodCampground.geometry.coordinates,
    zoom: 9,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(goodCampground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>${goodCampground.title}</h5><p>${goodCampground.location}</p>`
            )
    )
    .addTo(map);