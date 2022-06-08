/*var PM25Chart;
var PM10Chart;
var O3Chart;
var NO2Chart;
var SO2Chart;
var PM25Button;
var PM10Button;
var NO2Button;
var SO2Button;

function initializeVariables(){
    PM25Chart= document.getElementById("PM25Chart");
}*/


function togglePM25() {
    var pm25 = document.getElementById("PM25Chart");
    var pm10 = document.getElementById("PM10Chart");
    var o3 = document.getElementById("O3Chart");
    var no2 = document.getElementById("NO2Chart");
    var so2 = document.getElementById("SO2Chart");
    if (pm25.style.display === "none") {
        pm25.style.display = "flex";
        pm10.style.display = "none";
        o3.style.display = "none";
        no2.style.display = "none";
        so2.style.display = "none";
    }
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    PM25Button.style.textDecoration = "underline";
    PM10Button.style.textDecoration = "none";
    O3Button.style.textDecoration = "none";
    NO2Button.style.textDecoration = "none";
    SO2Button.style.textDecoration = "none";
}

function togglePM10() {
    var pm25 = document.getElementById("PM25Chart");
    var pm10 = document.getElementById("PM10Chart");
    var o3 = document.getElementById("O3Chart");
    var no2 = document.getElementById("NO2Chart");
    var so2 = document.getElementById("SO2Chart");
    if (pm10.style.display === "none") {
        pm25.style.display = "none";
        pm10.style.display = "flex";
        o3.style.display = "none";
        no2.style.display = "none";
        so2.style.display = "none";
    }
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    PM25Button.style.textDecoration = "none";
    PM10Button.style.textDecoration = "underline";
    O3Button.style.textDecoration = "none";
    NO2Button.style.textDecoration = "none";
    SO2Button.style.textDecoration = "none";
}
function toggleO3() {
    var pm25 = document.getElementById("PM25Chart");
    var pm10 = document.getElementById("PM10Chart");
    var o3 = document.getElementById("O3Chart");
    var no2 = document.getElementById("NO2Chart");
    var so2 = document.getElementById("SO2Chart");
    if (o3.style.display === "none") {
        pm25.style.display = "none";
        pm10.style.display = "none";
        o3.style.display = "flex";
        no2.style.display = "none";
        so2.style.display = "none";
    }
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    PM25Button.style.textDecoration = "none";
    PM10Button.style.textDecoration = "none";
    O3Button.style.textDecoration = "underline";
    NO2Button.style.textDecoration = "none";
    SO2Button.style.textDecoration = "none";
}
function toggleNO2() {
    var pm25 = document.getElementById("PM25Chart");
    var pm10 = document.getElementById("PM10Chart");
    var o3 = document.getElementById("O3Chart");
    var no2 = document.getElementById("NO2Chart");
    var so2 = document.getElementById("SO2Chart");
    if (no2.style.display === "none") {
        pm25.style.display = "none";
        pm10.style.display = "none";
        o3.style.display = "none";
        no2.style.display = "flex";
        so2.style.display = "none";
    }
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    PM25Button.style.textDecoration = "none";
    PM10Button.style.textDecoration = "none";
    O3Button.style.textDecoration = "none";
    NO2Button.style.textDecoration = "underline";
    SO2Button.style.textDecoration = "none";
}
function toggleSO2() {
    var pm25 = document.getElementById("PM25Chart");
    var pm10 = document.getElementById("PM10Chart");
    var o3 = document.getElementById("O3Chart");
    var no2 = document.getElementById("NO2Chart");
    var so2 = document.getElementById("SO2Chart");
    if (so2.style.display === "none") {
        pm25.style.display = "none";
        pm10.style.display = "none";
        o3.style.display = "none";
        no2.style.display = "none";
        so2.style.display = "flex";
    }
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    PM25Button.style.textDecoration = "none";
    PM10Button.style.textDecoration = "none";
    O3Button.style.textDecoration = "none";
    NO2Button.style.textDecoration = "none";
    SO2Button.style.textDecoration = "underline";
}

