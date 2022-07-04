function togglePM25() {
    var PM25Chart = document.getElementById("PM25Chart");
    var PM10Chart = document.getElementById("PM10Chart");
    var O3Chart = document.getElementById("O3Chart");
    var NO2Chart = document.getElementById("NO2Chart");
    var SO2Chart = document.getElementById("SO2Chart");
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    var PM25Info = document.getElementById("PM25Info");
    var PM10Info = document.getElementById("PM10Info");
    var O3Info = document.getElementById("O3Info");
    var NO2Info = document.getElementById("NO2Info");
    var SO2Info = document.getElementById("SO2Info");
    if (PM25Chart.style.display === "none") {
        PM25Chart.style.display = "flex";
        PM10Chart.style.display = "none";
        O3Chart.style.display = "none";
        NO2Chart.style.display = "none";
        SO2Chart.style.display = "none";

        PM25Button.style.textDecoration = "underline";
        PM25Button.style.fontWeight = "bolder";
        PM10Button.style.textDecoration = "none";
        PM10Button.style.fontWeight = "normal";
        O3Button.style.textDecoration = "none";
        O3Button.style.fontWeight = "normal";
        NO2Button.style.textDecoration = "none";
        NO2Button.style.fontWeight = "normal";
        SO2Button.style.textDecoration = "none";
        SO2Button.style.fontWeight = "normal";

        PM25Info.style.display = "block";
        PM10Info.style.display = "none";
        O3Info.style.display = "none";
        NO2Info.style.display = "none";
        SO2Info.style.display = "none";
    }
}

function togglePM10() {
    var PM25Chart = document.getElementById("PM25Chart");
    var PM10Chart = document.getElementById("PM10Chart");
    var O3Chart = document.getElementById("O3Chart");
    var NO2Chart = document.getElementById("NO2Chart");
    var SO2Chart = document.getElementById("SO2Chart");
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    var PM25Info = document.getElementById("PM25Info");
    var PM10Info = document.getElementById("PM10Info");
    var O3Info = document.getElementById("O3Info");
    var NO2Info = document.getElementById("NO2Info");
    var SO2Info = document.getElementById("SO2Info");
    if (PM10Chart.style.display === "none") {
        PM25Chart.style.display = "none";
        PM10Chart.style.display = "flex";
        O3Chart.style.display = "none";
        NO2Chart.style.display = "none";
        SO2Chart.style.display = "none";

        PM25Button.style.textDecoration = "none";
        PM25Button.style.fontWeight = "normal";
        PM10Button.style.textDecoration = "underline";
        PM10Button.style.fontWeight = "bolder";
        O3Button.style.textDecoration = "none";
        O3Button.style.fontWeight = "normal";
        NO2Button.style.textDecoration = "none";
        NO2Button.style.fontWeight = "normal";
        SO2Button.style.textDecoration = "none";
        SO2Button.style.fontWeight = "normal";

        PM25Info.style.display = "none";
        PM10Info.style.display = "block";
        O3Info.style.display = "none";
        NO2Info.style.display = "none";
        SO2Info.style.display = "none";
    }
}

function toggleO3() {
    var PM25Chart = document.getElementById("PM25Chart");
    var PM10Chart = document.getElementById("PM10Chart");
    var O3Chart = document.getElementById("O3Chart");
    var NO2Chart = document.getElementById("NO2Chart");
    var SO2Chart = document.getElementById("SO2Chart");
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    var PM25Info = document.getElementById("PM25Info");
    var PM10Info = document.getElementById("PM10Info");
    var O3Info = document.getElementById("O3Info");
    var NO2Info = document.getElementById("NO2Info");
    var SO2Info = document.getElementById("SO2Info");
    if (O3Chart.style.display === "none") {
        PM25Chart.style.display = "none";
        PM10Chart.style.display = "none";
        O3Chart.style.display = "flex";
        NO2Chart.style.display = "none";
        SO2Chart.style.display = "none";

        PM25Button.style.textDecoration = "none";
        PM25Button.style.fontWeight = "normal";
        PM10Button.style.textDecoration = "";
        PM10Button.style.fontWeight = "normal";
        O3Button.style.textDecoration = "underline";
        O3Button.style.fontWeight = "bolder";
        NO2Button.style.textDecoration = "none";
        NO2Button.style.fontWeight = "normal";
        SO2Button.style.textDecoration = "none";
        SO2Button.style.fontWeight = "normal";

        PM25Info.style.display = "none";
        PM10Info.style.display = "none";
        O3Info.style.display = "block";
        NO2Info.style.display = "none";
        SO2Info.style.display = "none";
    }
}
function toggleNO2() {
    var PM25Chart = document.getElementById("PM25Chart");
    var PM10Chart = document.getElementById("PM10Chart");
    var O3Chart = document.getElementById("O3Chart");
    var NO2Chart = document.getElementById("NO2Chart");
    var SO2Chart = document.getElementById("SO2Chart");
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    var PM25Info = document.getElementById("PM25Info");
    var PM10Info = document.getElementById("PM10Info");
    var O3Info = document.getElementById("O3Info");
    var NO2Info = document.getElementById("NO2Info");
    var SO2Info = document.getElementById("SO2Info");
    if (NO2Chart.style.display === "none") {
        PM25Chart.style.display = "none";
        PM10Chart.style.display = "none";
        O3Chart.style.display = "none";
        NO2Chart.style.display = "flex";
        SO2Chart.style.display = "none";

        PM25Button.style.textDecoration = "none";
        PM25Button.style.fontWeight = "normal";
        PM10Button.style.textDecoration = "none";
        PM10Button.style.fontWeight = "normal";
        O3Button.style.textDecoration = "none";
        O3Button.style.fontWeight = "normal";
        NO2Button.style.textDecoration = "underline";
        NO2Button.style.fontWeight = "bolder";
        SO2Button.style.textDecoration = "none";
        SO2Button.style.fontWeight = "normal";

        PM25Info.style.display = "none";
        PM10Info.style.display = "none";
        O3Info.style.display = "none";
        NO2Info.style.display = "block";
        SO2Info.style.display = "none";
    }
}
function toggleSO2() {
    var PM25Chart = document.getElementById("PM25Chart");
    var PM10Chart = document.getElementById("PM10Chart");
    var O3Chart = document.getElementById("O3Chart");
    var NO2Chart = document.getElementById("NO2Chart");
    var SO2Chart = document.getElementById("SO2Chart");
    var PM25Button = document.getElementById("PM25Button");
    var PM10Button = document.getElementById("PM10Button");
    var O3Button = document.getElementById("O3Button");
    var NO2Button = document.getElementById("NO2Button");
    var SO2Button = document.getElementById("SO2Button");
    var PM25Info = document.getElementById("PM25Info");
    var PM10Info = document.getElementById("PM10Info");
    var O3Info = document.getElementById("O3Info");
    var NO2Info = document.getElementById("NO2Info");
    var SO2Info = document.getElementById("SO2Info");
    if (SO2Chart.style.display === "none") {
        PM25Chart.style.display = "none";
        PM10Chart.style.display = "none";
        O3Chart.style.display = "none";
        NO2Chart.style.display = "none";
        SO2Chart.style.display = "flex";

        PM25Button.style.textDecoration = "none";
        PM25Button.style.fontWeight = "normal";
        PM10Button.style.textDecoration = "none";
        PM10Button.style.fontWeight = "normal";
        O3Button.style.textDecoration = "none";
        O3Button.style.fontWeight = "normal";
        NO2Button.style.textDecoration = "none";
        NO2Button.style.fontWeight = "normal";
        SO2Button.style.textDecoration = "underline";
        SO2Button.style.fontWeight = "bolder";

        PM25Info.style.display = "none";
        PM10Info.style.display = "none";
        O3Info.style.display = "none";
        NO2Info.style.display = "none";
        SO2Info.style.display = "block";
    }
}

