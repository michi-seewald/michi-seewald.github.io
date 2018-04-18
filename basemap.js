let myMap = L.map("mapdiv");
let myLayers = {
    osm : L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap : L.tileLayer(
        "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapoverlay :  L.tileLayer(
        "https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapgrau : L.tileLayer(
        "https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmaphidpi : L.tileLayer(
        "https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg"
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg"
    ),
}

myMap.addLayer(myLayers.bmaporthofoto30cm);
myMap.setView([47.267,11.383],11);

/* Objekte erstellen
let myLayers = {
    wert : 100,
    alter : 50,
    farbe : "grün",
    liste : [1,2,3,4],
    nocheinobjekt = {

    }
}
*/


/*
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png")
// let url = "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"

myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg")
myLayer = L.tileLayer("https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg")
*/

