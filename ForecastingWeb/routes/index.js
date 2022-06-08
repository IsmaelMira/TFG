var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  //const pastWeather= await getPastWeatherData();
  //const futureWeather= await getFutureWeatherForecast();
  //const responsePollution= await getPollutionData();
  var startDate = new Date();
  var finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + 7);

  const getDaysArray = getDates(startDate, finishDate);

  //res.send(respuesta);
  res.render('index', { title: "Express", 
  /*tMin0: futureWeather.days[0].tempmin, tMax0: futureWeather.days[0].tempmax, tAvg0: futureWeather.days[0].temp,  pressure0: futureWeather.days[0].pressure, humidity0: futureWeather.days[0].humidity, windSpeed0: futureWeather.days[0].windspeed, precipitations0: futureWeather.days[0].precip,
  tMin1: futureWeather.days[1].tempmin, tMax1: futureWeather.days[1].tempmax, tAvg1: futureWeather.days[1].temp,  pressure1: futureWeather.days[1].pressure, humidity1: futureWeather.days[1].humidity, windSpeed1: futureWeather.days[1].windspeed, precipitations1: futureWeather.days[1].precip,
  tMin2: futureWeather.days[2].tempmin, tMax2: futureWeather.days[2].tempmax, tAvg2: futureWeather.days[2].temp,  pressure2: futureWeather.days[2].pressure, humidity2: futureWeather.days[2].humidity, windSpeed2: futureWeather.days[2].windspeed, precipitations2: futureWeather.days[2].precip,
  tMin3: futureWeather.days[3].tempmin, tMax3: futureWeather.days[3].tempmax, tAvg3: futureWeather.days[3].temp,  pressure3: futureWeather.days[3].pressure, humidity3: futureWeather.days[3].humidity, windSpeed3: futureWeather.days[3].windspeed, precipitations3: futureWeather.days[3].precip,
  tMin4: futureWeather.days[4].tempmin, tMax4: futureWeather.days[4].tempmax, tAvg4: futureWeather.days[4].temp,  pressure4: futureWeather.days[4].pressure, humidity4: futureWeather.days[4].humidity, windSpeed4: futureWeather.days[4].windspeed, precipitations4: futureWeather.days[4].precip,
  tMin5: futureWeather.days[5].tempmin, tMax5: futureWeather.days[5].tempmax, tAvg5: futureWeather.days[5].temp,  pressure5: futureWeather.days[5].pressure, humidity5: futureWeather.days[5].humidity, windSpeed5: futureWeather.days[5].windspeed, precipitations5: futureWeather.days[5].precip,
  tMin6: futureWeather.days[6].tempmin, tMax6: futureWeather.days[6].tempmax, tAvg6: futureWeather.days[6].temp,  pressure6: futureWeather.days[6].pressure, humidity6: futureWeather.days[6].humidity, windSpeed6: futureWeather.days[6].windspeed, precipitations6: futureWeather.days[6].precip,
  tMin7: futureWeather.days[7].tempmin, tMax7: futureWeather.days[7].tempmax, tAvg7: futureWeather.days[7].temp,  pressure7: futureWeather.days[7].pressure, humidity7: futureWeather.days[7].humidity, windSpeed7: futureWeather.days[7].windspeed, precipitations7: futureWeather.days[7].precip,
  tMinMinus1: pastWeather.days[0].tempmin, tMaxMinus1: pastWeather.days[0].tempmax, tAvgMinus1: pastWeather.days[0].temp, pressureMinus1:pastWeather.days[0].pressure, humidityMinus1:pastWeather.days[0].humidity, windSpeedMinus1:pastWeather.days[0].windspeed, precipitationsMinus1: pastWeather.days[0].precip,
  */date0: getDaysArray[0], date1: getDaysArray[1], date2: getDaysArray[2], date3: getDaysArray[3], date4: getDaysArray[4], date5: getDaysArray[5], date6: getDaysArray[6], date7: getDaysArray[7],
  //totalAQI: responsePollution.aqi//SEND POLLUTION DATA*/
  });
});

/*async function getFutureWeatherForecast() {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', 
      {params: {
          lat: '40.42',
          lon: '-3.7',
          exclude: 'current,minutely,hourly',
          lang: 'es',
          units: 'metric',
          appid: '45bd9e741eba4b3938082a76011bbb27'
    }});
    //console.log(response.data.daily[0].temp.min)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}*/

function getDates(start, end) {
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
      
  //    console.log(dt.toLocaleDateString('en-GB'));
      arr.push(dt.toLocaleDateString('en-GB', options));
  }
  //console.log(arr);
  return arr;
};


async function getPastWeatherData() {
  try {
    const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madrid/yesterday', 
      {params: {
          unitGroup: 'metric',
          key: 'SSV9Q7VEQD32YLW8WE85DXWZP',
          contentType: 'json'
    }});
    //console.log(response.data.days[0].tempmax)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

async function getFutureWeatherForecast() {
  try {
    const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madrid/next7days', 
      {params: {
        unitGroup: 'metric',
        key: 'SSV9Q7VEQD32YLW8WE85DXWZP',
        contentType: 'json'
    }});
    //console.log(response.data.daily[0].temp.min)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

/*function getYesterdayUnixDate(){
  /*var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  var unixDate=Math.floor(new Date(yesterday).getTime() / 1000)
  return unixDate;
}*/


async function getPollutionData() {
  try {
    const response = await axios.get('https://api.waqi.info/feed/madrid', 
      {params: {
          token: 'fdfe8e5fc89f795e0e19ac42fc1277e97f4804da'
    }});
    //console.log(response.data.data.aqi)
    return response.data.data
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = router;