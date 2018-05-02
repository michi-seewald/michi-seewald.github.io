let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();
let myLayers ={

geolandbasemap: L.tileLayer (
    "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution : "Datenquelle: <a href= 'https://www.basemap.at'> basemap.at"
    }
), 
bmaporthofoto30cm: L.tileLayer (
    "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
        attribution : "Datenquelle: <a href= 'https://www.basemap.at'> basemap.at"
        }
),
};


myMap.addLayer(myLayers.geolandbasemap);

let myMapControl = L.control.layers({ 
"geolandbasemap": myLayers.geolandbasemap,
"bmaporthofoto30cm": myLayers.bmaporthofoto30cm,
},{
"Marker": markerGroup,
},{
    collapsed : true
});

myMap.addControl(myMapControl); 

L.control.scale({ 
    position: 'bottomleft', 
    metric: true,
    imperial: false, 
    maxWidth: 200,    
}).addTo(myMap);

myMap.setView([47.267,11.383], 11);


var awsdata = [
    {lat:47.387131,lng:11.133717,name:"Gehrenspitze",temperatur:"0.6",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {lat:47.312079,lng:11.383623,name:"Hafelekar",temperatur:"1.6",datum:"2018-04-26T08:10:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {lat:47.346295,lng:11.080385,name:"Hohe Munde Gipfel",temperatur:"",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png"},
    {lat:47.346612,lng:11.083694,name:"Hohe Munde Windstation",temperatur:"-4.1",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {lat:47.336922,lng:10.862333,name:"Nassereith Wannig",temperatur:"-1.2",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {lat:47.344376,lng:10.849554,name:"Nassereither Alm",temperatur:"4",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {lat:47.394844,lng:11.152817,name:"Puitegg",temperatur:"5.3",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {lat:47.345909,lng:11.104943,"name":"Rauthhütte",temperatur:"11.7",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {lat:47.342025,lng:11.227903,name:"Rosshütte Windstation",temperatur:"4.1",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png"},
    {lat:47.3063819943737,lng:11.3779335010812,name:"Seegrube",temperatur:"3.1",datum:"2018-04-26T08:10:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {lat:47.448514,lng:11.751511,name:"Dalfazkamm",temperatur:"0.4",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {lat:47.441861,lng:11.762127,name:"Erfurterhütte",temperatur:"2.4",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {lat:47.069889,lng:10.862306,name:"Agetwoad",temperatur:"1.5",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png"},
    {lat:47.0839527777778,lng:11.0273833333333,name:"Breiter Grieskogel Schneestation",temperatur:"1.1",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {lat:47.1010555555556,lng:11.0230388888889,name:"Breiter Grieskogel Windstation",temperatur:"-3.4",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {lat:47.071488,lng:10.76282,name:"Falkaunsalpe",temperatur:"2.2",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {lat:47.099611,lng:11.15541667,name:"Franz-Senn-Hütte Horntaler Spitzl",temperatur:"4.3",datum:"2018-04-25T20:40:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {lat:47.0960000187559,lng:11.1623888694066,name:"Franz-Senn-Hütte Kl Horntal",temperatur:"5.5",datum:"2018-04-25T20:40:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {lat:47.153491,lng:11.120722,name:"Lampsenspitze Schneestation",temperatur:"1.7",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {lat:47.156075,lng:11.095642,name:"Lampsenspitze Windstation",temperatur:"-0.8",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {lat:47.04,lng:10.7181,name:"Roter Schrofen",temperatur:"-1",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {lat:47.154432,lng:11.303207,name:"Schlicker Alm",temperatur:"6.5",datum:"2018-04-26T07:50:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png"},
    {lat:47.0339,lng:10.8528,name:"Seirlöcher Kogel",temperatur:"0",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png"},
    {lat:47.181266,lng:11.751717,name:"Lämmerbichlalm",temperatur:"3",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {lat:47.192132,lng:11.767481,name:"Rastkogel Windstation",temperatur:"0.1",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {lat:47.2750109996958,lng:11.7520860028295,name:"Sonntagsköpfl",temperatur:"1.2",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {lat:47.271989,lng:11.755802,name:"Sonntagsköpfl Windstation",temperatur:"3.3",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {lat:47.093149,lng:11.648053,name:"Tuxerjoch Schneestation",temperatur:"6",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {lat:47.089717,lng:11.648987,name:"Tuxerjoch Windstation",temperatur:"1.5",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {lat:47.121858,lng:11.661969,name:"Wandspitze Schneestation",temperatur:"1.3",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"},
    {lat:47.120752,lng:11.658062,name:"Wandspitze Windstation",temperatur:"-0.3",datum:"2018-04-26T08:00:00+02:00",link:"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"}
    ];
    
    for (var i = 0; i < awsdata.length; i++){
    var marker=L.marker([awsdata[i].lat, awsdata[i].lng]).addTo(markerGroup);
marker.bindTooltip(awsdata[i].name);
marker.bindPopup('<h3>' + awsdata[i].name + '</h3><p>' + 'Temperatur:  ' + awsdata[i].temperatur + '°'+'</p><p>' + awsdata[i].datum + '</p><p>' + '<a href="'+ awsdata[i].link +'">Wetterdaten</a>' + '</p>');
    }
markerGroup.addTo(myMap);

myMap.fitBounds(markerGroup.getBounds());

// zusammen mit Michaela Seewald gemacht
// haben vergessen nach jeder Änderung zu comitten, daher nur einmal ;)