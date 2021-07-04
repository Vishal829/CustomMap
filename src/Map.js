import React from 'react';
import L from 'leaflet';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

// import '@geoman-io/leaflet-geoman-free';
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const style = {
    width: "100vw",
    height: "100vw"
};

function Map() {
    React.useEffect(() => {
        // create map
        console.log(L)
        var map = L.map('map').setView([51.5293, 0.0528], 14);
        console.log(map)// define toolbar options
        // add leaflet.pm controls to the map
        map.pm.addControls({
            position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
            drawMarker: true, // adds button to draw markers
            drawPolyline: true, // adds button to draw a polyline
            drawRectangle: true, // adds button to draw a rectangle
            drawPolygon: true, // adds button to draw a polygon
            drawCircle: true, // adds button to draw a cricle
            cutPolygon: true, // adds button to cut a hole in a polygon
            editMode: true, // adds button to toggle edit mode for all layers
            removalMode: true, // adds a button to remove layers
            drawControls: true,
            editControls: true,
            optionsControls: true,
            customControls: true,
            oneBlock: false,
        });
        // optional options for line style during draw. These are the defaults
        var options = {
            // snapping
            snappable: true,
            snapDistance: 20,

            // allow snapping to the middle of segments
            snapMiddle: false,

            // self intersection
            allowSelfIntersection: true,

            // the lines between coordinates/markers
            templineStyle: {
                color: 'red',
            },

            // the line from the last marker to the mouse cursor
            hintlineStyle: {
                color: 'red',
                dashArray: [5, 5],
            },

            // show a marker at the cursor
            cursorMarker: false,

            // specify type of layer event to finish the drawn shape
            // example events: 'mouseout', 'dblclick', 'contextmenu'
            // List: http://leafletjs.com/reference-1.2.0.html#interactive-layer-click
            finishOn: null,

            // custom marker style (only for Marker draw)
            markerStyle: {
                opacity: 0.5,
                draggable: true,
            },
        };

        // enable drawing mode for shape - e.g. Poly, Line, etc
        map.pm.enableDraw('Poly', options);
        map.pm.enableDraw('Rectangle', options);
        map.pm.enableDraw('Line', options);
        map.pm.enableDraw('Marker', options);
        map.pm.enableDraw('Circle', options);

        // get array of all available shapes
        map.pm.Draw.getShapes();

        // listen to when drawing mode gets enabled
        map.on('pm:drawstart', function (e) {
            console.log(e.shape); // the name of the shape being drawn (i.e. 'Circle')
            console.log(e.workingLayer); // the leaflet layer displayed while drawing
        });

        // disable drawing mode
        map.pm.disableDraw('Poly');

        // listen to when drawing mode gets disabled
        map.on('pm:drawend', function (e) {
            console.log(e.shape); // the name of the shape being drawn (i.e. 'Circle')
        });

        // listen to when a new layer is created
        map.on('pm:create', function (e) {
            console.log(e.shape); // the name of the shape being drawn (i.e. 'Circle')
        });

        // listen to vertexes being added to the workingLayer (works only on polylines & polygons)
        map.on('pm:drawstart', function (e) {
            var layer = e.workingLayer;
            layer.on('pm:vertexadded', function (e) {
                // e includes the new vertex, it's marker
                // the index in the coordinates array
                // the working layer and shape
            });

            // also fired on the markers of the polygon
            layer.on('pm:snapdrag', function (e) {
                // e includes marker, snap coordinates
                // segment, the working layer
                // and the distance
            });
        });

        // listen to the center of a circle being added
        map.on('pm:drawstart', function (e) {
            var circle = e.workingLayer;

            // this fires only for circles
            circle.on('pm:centerplaced', function (e) {
                console.log(e);
            });
        });

        // listen to when the center of a circle is moved
        map.on('pm:create', function (e) {
            var circle = e.layer;

            // this fires only for circles
            circle.on('pm:centerplaced', function (e) {
                console.log(e);
            });
        });
        L.circle([51.5293, 0.0528], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 1000
        }).addTo(map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5293, 0.0528]).addTo(map)
            .bindPopup('Central park')
            .openPopup();
    }, []);

    return <div id="map" style={style}></div>
}

export default Map;