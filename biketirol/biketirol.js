/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren
let myMap = L.map("map", {
    fullscreenControl: true
});

const markerGroup = L.featureGroup();
const etappe25Group = L.featureGroup();

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol
let myLayers = {
    osm : L.tileLayer( 
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"], 
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>OpenStreetMap"
        }
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at'>Land Tirol" 
        }
    ),
    gdi_base_summer :  L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution : "Datenquelle: <a href='https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Land Tirol"
        }
    ),
    gdi_base_winter : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution : "Datenquelle: <a href='https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Land Tirol"
        }
    ),
    gdi_base_ortho : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution : "Datenquelle: <a href='https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Land Tirol"
        }
    ),
    gdi_nomenklatur : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8",{
        attribution : "Datenquelle: <a href='https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Land Tirol",
        pane: "overlayPane",
    }
    ),
}

myMap.addLayer(myLayers.geolandbasemap); 


// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen
let myMapControl = L.control.layers({ 
    "OpenStreetMap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "Karte Tirol Sommer" : myLayers.gdi_base_summer,
    "Karte Tirol Winter" : myLayers.gdi_base_winter,
    "Karte Tirol Orthofoto" : myLayers.gdi_base_ortho,
},{ // Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen
    "Etappenstrecke" : etappe25Group,
},{ 
    collapsed: true,
});

myMap.addControl(myMapControl); 


/*
const gdi_summer = L.layerGroup([
    myLayers.gdi_base_summer, 
    myLayers.gdi_nomenklatur
]);
const gdi_winter = L.layerGroup([
    myLayers.gdi_base_winter, 
    myLayers.gdi_nomenklatur
]);
const gdi_ortho = L.layerGroup([
    myLayers.gdi_base_ortho, 
    myLayers.gdi_nomenklatur
]);
*/

// Maßstab metrisch ohne inch
L.control.scale({ 
    position: 'bottomleft', 
    metric: true, 
    imperial: false, 
    maxWidth: 200, 
}).addTo(myMap);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
const start = ([47.21327,11.213662])
L.marker(start, L.icon({
    iconUrl: 'icons/start-flag.png',
    })
).addTo(markerGroup)
.bindPopup(function(layer) {
    const popupText = `<h1>Sellrain</h1><a href="https://de.wikipedia.org/wiki/Sellrain">Mehr Infos...</a>`;
    return popupText;
});

const finish = ([47.201644,10.899395])
L.marker(finish, L.icon({
    iconUrl: 'icons/finish.png',
    })
).addTo(markerGroup)
.bindPopup(function(layer) {
    const popupText = `<h1>Oetz</h1><a href="https://de.wikipedia.org/wiki/Oetz">Mehr Infos...</a>`;
    return popupText;
});

myMap.addLayer(markerGroup);

// Höhenprofil control hinzufügen
let hoehenProfil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed : true,
}).addTo(myMap);



// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)
// let geojson = L.geoJSON(strecke).addTo(etappe25Group);
myMap.addLayer(etappe25Group);
// myMap.fitBounds(etappe25Group.getBounds());
// let line = L.polyline(geojson, {color: 'blue'}).addTo(myMap);


// stattdessen: Strecke als GPX einfügen
/*
var gpx = '...'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
    async: true}).on('loaded', function(e) {
  myMap.fitBounds(e.target.getBounds());
}).addTo(myMap);
*/

let gpxTrack = new L.GPX("data/etappe25.gpx", { // https://github.com/mpetazzoni/leaflet-gpx
    async : true,
}).addTo(etappe25Group); // ad to overlay Group - eigentlich!
gpxTrack.on("loaded", function(evt) {
    console.log(evt.target.get_distance().toFixed(0))
    console.log(evt.target.get_elevation_min().toFixed(0))
    console.log(evt.target.get_elevation_max().toFixed(0))
    console.log(evt.target.get_elevation_gain().toFixed(0))
    console.log(evt.target.get_elevation_loss().toFixed(0))

    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge

    let min = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("min").innerHTML = min

    let max = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("max").innerHTML = max

    let hinauf = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("hinauf").innerHTML = hinauf

    let hinab = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("hinab").innerHTML = hinab

    myMap.fitBounds(evt.target.getBounds());
});


gpxTrack.on('addline', function(evt){
    hoehenProfil.addData(evt.line);
})
// um die Position zu bestimmen im leaflet.elevation.src.js und min.js L.Browser.touch durch L.Browser.mobile ersetzen

