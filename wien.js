let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
const wienGroup = L.featureGroup();
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

let myMapControl = L.control.layers({ // http://leafletjs.com/reference-1.3.0.html#control-layers
    "OpenStreetMap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
   
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Stadtspaziergang": wienGroup,
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


myMap.setView([48.226653,16.378609],8); // http://leafletjs.com/reference-1.3.0.html#map-setview

// console.log("Spaziergang: ", spaziergang);

async function addGeojson (url) {
    // console.log("Url wird geladen: ", url);
    const response = await fetch(url);
    // console.log("Response: ", response);
    const wiendata = await response.json ();
    console.log("GeoJson: ", wiendata);
    const geojson = L.geoJSON(wiendata, {
        style: function(feature) {
            return {color: "#ff0000" };
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'icons/sight-2.png'
                })
            });
        }
    });
    wienGroup.addLayer(geojson);
    myMap.fitBounds(wienGroup.getBounds());
}
const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

myMap.addLayer(wienGroup);

addGeojson(url);

/*let geojson = L.geoJSON(spaziergang).addTo(wienGroup);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>${props.BEMERKUNG}</p>`;
    return popupText;
});

myMap.fitBounds(wienGroup.getBounds());
*/