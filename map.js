mapboxgl.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw';

var filterGroup = document.getElementById('filter-group');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.95, 40.72],
    zoom: 12.5
});

map.on('load', function() {
    map.addSource("points", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-73.9577239, 40.7178469]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "icon": "monument"
                }
            }]
        }
    });

    map.addLayer({
        "id": "startPoint",
        "source": "points",
        "type": "symbol",
        "layout": {
            "icon-image": "marker-15",
            "icon-size": 1
        }
    });



    map.addSource("isochrones", {
        "type": "geojson",
        "data": isochrones
    });


    isochrones.features.forEach(function(feature) {
        var layerID = feature.properties['router'];

        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'fill',
                'source': 'isochrones',
                'layout': {},
                'paint': {
                    'fill-color': feature.properties.fill,
                    'fill-opacity': 0.8
                },
                "filter": ["==", "router", layerID]
            }, "startPoint");

            var button = document.getElementById(layerID + '-button');

            if (feature.properties.visibility == 'visible') {
                map.setLayoutProperty(layerID, 'visibility', 'visible');
                button.style.borderColor = feature.properties.fill;
                button.setAttribute("state", "active");
            } else {
                map.setLayoutProperty(layerID, 'visibility', 'none');
                button.style.borderColor = 'transparent';
                button.setAttribute("state", "inactive");
            }

            button.onclick = function(e) {
                if (e.target.getAttribute('state') === 'active') {
                    map.setLayoutProperty(layerID, 'visibility', 'none');
                    e.target.setAttribute("state", "inactive");
                    button.style.borderColor = 'transparent';
                } else {
                    map.setLayoutProperty(layerID, 'visibility', 'visible');
                    e.target.setAttribute("state", "active");
                    button.style.borderColor = feature.properties.fill;
                }
            }
        }
    });
});
