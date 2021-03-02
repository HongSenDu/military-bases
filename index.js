mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3NlbmR1IiwiYSI6ImNrbHNheHp4djAwcm8ycG5xcTNwMzdmenIifQ.d5odq3XatUL5El3D1N0-PQ'; // replace this with your access token
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hongsendu/cklsa3j6p19qb17kxrsd9lo6x', // replace this with your style URL
    center: [-15.404901, 28.872168],
    zoom: 2
});


map.on('load', function () {
    document.getElementById("reset").addEventListener("click", () => {
        map.flyTo({
            center: [-15.404901, 28.872168],
            zoom: 2,
            duration: 0
        });
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['military-bases'] // replace this with the name of the layer
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        map.flyTo({
            center: feature.geometry.coordinates,
            zoom: 16,
            speed: 30
        });

        let description = feature.properties.description;
        console.log(description)
        let source = feature.properties.sources;
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`<h3> ${feature.properties.title} </h3>${description == null ? '' : `<p>${description}</p>`} ${source == null ? '' : `<p>${source}</p>`}`)
            .addTo(map);
    });
}); 
