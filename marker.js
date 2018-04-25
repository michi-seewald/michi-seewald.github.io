let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();
let myLayers = {
    osm : L.tileLayer( // http://leafletjs.com/reference-1.3.0.html#tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"], // subdomains hinzugefuegt https://gis.stackexchange.com/questions/201881/what-is-an-appropriate-tilelayer-source-for-tiles-served-on-an-apache-localhost
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>OpenStreetMap"
        }
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" // http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
    ),
    bmapoverlay :  L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    basemapneu : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" // http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
    ),
}

myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#map-addlayer
// geolandbasemap ist voreingestellt


let myMapControl = L.control.layers({ // http://leafletjs.com/reference-1.3.0.html#control-layers
    "OpenStreetMap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
   
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Marker" : markerGroup,
},{
    collapsed: false,
});

myMap.addControl(myMapControl); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol

L.control.scale({ // http://leafletjs.com/reference-1.3.0.html#control-scale
    position: 'bottomleft', // http://leafletjs.com/reference-1.3.0.html#control-scale
    metric: true, // http://leafletjs.com/reference-1.3.0.html#control-scale
    imperial: false, // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    maxWidth: 200,    // http://leafletjs.com/reference-1.3.0.html#control-scale
}).addTo(myMap);


myMap.setView([47.267,11.383],11); // http://leafletjs.com/reference-1.3.0.html#map-setview

const uni = [47.264,11.385];
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const patscherkofel = [47.217, 11.466];
const igls = [47.232, 11.408];

myMap.addLayer(markerGroup);
const markerOptions = {
    title: "Universität Innsbruck",
    draggable: true,
    opacity: 0.7,
};
L.marker(uni, markerOptions).addTo(markerGroup);
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
let patscherkofelMarker = L.marker(patscherkofel, {
    title: "Patscherkofel",
}).addTo(markerGroup);

patscherkofelMarker.bindPopup("<p>Patscherkofel</p><img style='width:200px' src = 'js/leaflet/images/patscherkofel.jpg' alt = 'Patscherkofl' />")

//alternativ: .addTo(markerGroup.bindPopup())

L.marker(igls, {
    title: "Igls",
}).addTo(markerGroup);

let lift = L.polyline([igls, patscherkofel], {
    color: 'red',
})
myMap.addLayer(lift)

let uniPolygon = L.polygon([uni, usi, technik]);
myMap.addLayer(uniPolygon);
uniPolygon.bindPopuup("Ende!")

myMap.fitBounds(markerGroup.getBounds())


