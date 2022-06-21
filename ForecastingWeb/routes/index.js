var express = require('express');
var router = express.Router();
const axios = require("axios");

var today_day;
var today_month;
var today_weekday;

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  //Get weather and pollution data
  /*const yesterdayWeather= await getYesterdayWeatherData();
  const todayWeather= await getTodayWeatherData();
  const pollutionData= await getPollutionData();*/

  //Get dates
  var startDate = new Date();
  var finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + 7);
  const getDaysArray = getDates(startDate, finishDate);

  //Calculate outputs using the model
  neuralNetworkModel(/*yesterdayWeather.days[0].precip, yesterdayWeather.days[0].temp, yesterdayWeather.days[0].tempmax, yesterdayWeather.days[0].tempmin, 
    yesterdayWeather.days[0].pressure, yesterdayWeather.days[0].windspeed, yesterdayWeather.days[0].humidity, today_day, today_month, today_weekday, 
    pollutionData.iaqi.pm25.v, pollutionData.iaqi.pm10.v, pollutionData.iaqi.o3.v, pollutionData.iaqi.no2.v, pollutionData.iaqi.so2.v,
    todayWeather.days[0].precip, todayWeather.days[0].temp, todayWeather.days[0].tempmax, todayWeather.days[0].tempmin, 
    todayWeather.days[0].pressure, todayWeather.days[0].windspeed, todayWeather.days[0].humidity*/);

  res.render('index', { title: "Air contamination forecast", 
  /*tMin0: futureWeather.days[0].tempmin, tMax0: futureWeather.days[0].tempmax, tAvg0: futureWeather.days[0].temp,  pressure0: futureWeather.days[0].pressure, humidity0: futureWeather.days[0].humidity, windSpeed0: futureWeather.days[0].windspeed, precipitations0: futureWeather.days[0].precip,
  tMin1: futureWeather.days[1].tempmin, tMax1: futureWeather.days[1].tempmax, tAvg1: futureWeather.days[1].temp,  pressure1: futureWeather.days[1].pressure, humidity1: futureWeather.days[1].humidity, windSpeed1: futureWeather.days[1].windspeed, precipitations1: futureWeather.days[1].precip,
  tMin2: futureWeather.days[2].tempmin, tMax2: futureWeather.days[2].tempmax, tAvg2: futureWeather.days[2].temp,  pressure2: futureWeather.days[2].pressure, humidity2: futureWeather.days[2].humidity, windSpeed2: futureWeather.days[2].windspeed, precipitations2: futureWeather.days[2].precip,
  tMin3: futureWeather.days[3].tempmin, tMax3: futureWeather.days[3].tempmax, tAvg3: futureWeather.days[3].temp,  pressure3: futureWeather.days[3].pressure, humidity3: futureWeather.days[3].humidity, windSpeed3: futureWeather.days[3].windspeed, precipitations3: futureWeather.days[3].precip,
  tMin4: futureWeather.days[4].tempmin, tMax4: futureWeather.days[4].tempmax, tAvg4: futureWeather.days[4].temp,  pressure4: futureWeather.days[4].pressure, humidity4: futureWeather.days[4].humidity, windSpeed4: futureWeather.days[4].windspeed, precipitations4: futureWeather.days[4].precip,
  tMin5: futureWeather.days[5].tempmin, tMax5: futureWeather.days[5].tempmax, tAvg5: futureWeather.days[5].temp,  pressure5: futureWeather.days[5].pressure, humidity5: futureWeather.days[5].humidity, windSpeed5: futureWeather.days[5].windspeed, precipitations5: futureWeather.days[5].precip,
  tMin6: futureWeather.days[6].tempmin, tMax6: futureWeather.days[6].tempmax, tAvg6: futureWeather.days[6].temp,  pressure6: futureWeather.days[6].pressure, humidity6: futureWeather.days[6].humidity, windSpeed6: futureWeather.days[6].windspeed, precipitations6: futureWeather.days[6].precip,
  tMin7: futureWeather.days[7].tempmin, tMax7: futureWeather.days[7].tempmax, tAvg7: futureWeather.days[7].temp,  pressure7: futureWeather.days[7].pressure, humidity7: futureWeather.days[7].humidity, windSpeed7: futureWeather.days[7].windspeed, precipitations7: futureWeather.days[7].precip,
  tMinMinus1: pastWeather.days[0].tempmin, tMaxMinus1: pastWeather.days[0].tempmax, tAvgMinus1: pastWeather.days[0].temp, pressureMinus1:pastWeather.days[0].pressure, humidityMinus1:pastWeather.days[0].humidity, windSpeedMinus1:pastWeather.days[0].windspeed, precipitationsMinus1: pastWeather.days[0].precip,
  currentTemperature: futureWeather.currentConditions.temp, condition: futureWeather.currentConditions.conditions,*/
  date0: getDaysArray[0], date1: getDaysArray[1], date2: getDaysArray[2], date3: getDaysArray[3], date4: getDaysArray[4], date5: getDaysArray[5], date6: getDaysArray[6], date7: getDaysArray[7],
  //totalAQI: responsePollution.aqi, actualPM25: responsePollution.iaqi.pm25.v, actualPM10: responsePollution.iaqi.pm10.v, actualO3: responsePollution.iaqi.o3.v, actualNO2: responsePollution.iaqi.no2.v, actualSO2: responsePollution.iaqi.so2.v //SEND POLLUTION DATA*/
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
  var flag=0;
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };
  for(var datesArray=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
      datesArray.push(dt.toLocaleDateString('en-GB', options));
      if(flag==0){
        today_day=dt.getDate();
        today_month=dt.getMonth() + 1;
        today_weekday= dt.getDay() || 7;
        flag=1;
      }   
  }
  return datesArray;
};


async function getYesterdayWeatherData() {
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

async function getTodayWeatherData() {
  try {
    const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madrid/today', 
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

function neuralNetworkModel(/*PRECIPITATIONS_lag_1, TAVG_lag_1, TMAX_lag_1, TMIN_lag_1, PRESSURE_lag_1, 
  WINDSPEED_lag_1, HUMIDITY_lag_1, DAY_lag_0, MONTH_lag_0, WEEKDAY_lag_0, PM25_lag_0, PM10_lag_0, O3_lag_0, NO2_lag_0, SO2_lag_0, PRECIPITATIONS_lag_0, 
  TAVG_lag_0, TMAX_lag_0, TMIN_lag_0, PRESSURE_lag_0, WINDSPEED_lag_0, HUMIDITY_lag_0*/){


  /*console.log(PRECIPITATIONS_lag_1, TAVG_lag_1, TMAX_lag_1, TMIN_lag_1, PRESSURE_lag_1, 
    WINDSPEED_lag_1, HUMIDITY_lag_1, DAY_lag_0, MONTH_lag_0, WEEKDAY_lag_0, PM25_lag_0, PM10_lag_0, O3_lag_0, NO2_lag_0, SO2_lag_0, PRECIPITATIONS_lag_0, 
    TAVG_lag_0, TMAX_lag_0, TMIN_lag_0, PRESSURE_lag_0, WINDSPEED_lag_0, HUMIDITY_lag_0);*/
  var PRECIPITATIONS_lag_1= 0;
  var TAVG_lag_1= 20.2;
  var TMAX_lag_1= 26.6;
  var TMIN_lag_1= 16.3;
  var PRESSURE_lag_1=1011.9;
  var WINDSPEED_lag_1=36;
  var HUMIDITY_lag_1=43.3;
  var DAY_lag_0=21;
  var MONTH_lag_0=6;
  var WEEKDAY_lag_0=2;
  var PM25_lag_0=5;
  var PM10_lag_0=3;
  var O3_lag_0=37;
  var NO2_lag_0=9.2;
  var SO2_lag_0=3.1;
  var PRECIPITATIONS_lag_0=0;
  var TAVG_lag_0=20.2;
  var TMAX_lag_0=27.9;
  var TMIN_lag_0=12;
  var PRESSURE_lag_0=1011.9;
  var WINDSPEED_lag_0=36;
  var HUMIDITY_lag_0=37.2;

  /*prueba1 = (PRECIPITATIONS_lag_1-1.074939966)/3.714220047;
	outputs[1] = (scaled_TAVG_lag_1-15.34309959)/8.136810303;
	outputs[2] = (scaled_TMAX_lag_1-21.96590042)/8.941390038;
	outputs[3] = (scaled_TMIN_lag_1-8.650710106)/6.915160179;
	outputs[4] = (scaled_PRESSURE_lag_1-1017.659973)/7.241010189;
	outputs[5] = (scaled_WINDSPEED_lag_1-10.52610016)/5.435560226;
	outputs[6] = (scaled_HUMIDITY_lag_1-58.64630127)/19.50839996;
	outputs[7] = (scaled_DAY_lag_0-15.70559978)/8.796839714;
	outputs[8] = (scaled_MONTH_lag_0-6.37677002)/3.491719961;
	outputs[9] = (scaled_WEEKDAY_lag_0-3.991379976)/1.996790051;
	outputs[10] = (scaled_PM25_lag_0-54.49160004)/19.51469994;
	outputs[11] = (scaled_PM10_lag_0-24.5359993)/11.86429977;
	prueba2 = (O3_lag_0-32.80110168)/14.55000019;
	outputs[13] = (scaled_NO2_lag_0-24.17860031)/10.28530025;
	outputs[14] = (scaled_SO2_lag_0-3.112720013)/2.052930117;
	outputs[15] = (scaled_PRECIPITATIONS_lag_0-1.073040009)/3.713360071;
	outputs[16] = (scaled_TAVG_lag_0-15.34749985)/8.136360168;
	outputs[17] = (scaled_TMAX_lag_0-21.9720993)/8.939259529;
	outputs[18] = (scaled_TMIN_lag_0-8.652810097)/6.915589809;
	prueba3 = (PRESSURE_lag_0-1017.659973)/7.242730141;
	//outputs[20] = (scaled_WINDSPEED_lag_0-10.52620029)/5.435550213;
	//outputs[21] = (scaled_HUMIDITY_lag_0-58.62919998)/19.4993;*/



  var scaled_PRECIPITATIONS_lag_1 = (PRECIPITATIONS_lag_1-1.074939966)/3.714220047;
  var scaled_TAVG_lag_1 = (TAVG_lag_1-15.34309959)/8.136810303;
  var scaled_TMAX_lag_1 = (TMAX_lag_1-21.96590042)/8.941390038;
  var scaled_TMIN_lag_1 = (TMIN_lag_1-8.650710106)/6.915160179;
  var scaled_PRESSURE_lag_1 = (PRESSURE_lag_1-1017.659973)/7.241010189;
  var scaled_WINDSPEED_lag_1 = (WINDSPEED_lag_1-10.52610016)/5.435560226;
  var scaled_HUMIDITY_lag_1 = (HUMIDITY_lag_1-58.64630127)/19.50839996;
  var scaled_DAY_lag_0 = (DAY_lag_0-15.70559978)/8.796839714;
  var scaled_MONTH_lag_0 = (MONTH_lag_0-6.37677002)/3.491719961;
  var scaled_WEEKDAY_lag_0 = (WEEKDAY_lag_0-3.991379976)/1.996790051;
  var scaled_PM25_lag_0 = (PM25_lag_0-54.49160004)/19.51469994;
  var scaled_PM10_lag_0 = (PM10_lag_0-24.5359993)/11.86429977;
  var scaled_O3_lag_0 = (O3_lag_0-32.80110168)/14.55000019;
  var scaled_NO2_lag_0 = (NO2_lag_0-24.17860031)/10.28530025;
  var scaled_SO2_lag_0 = (SO2_lag_0-3.112720013)/2.052930117;
  var scaled_PRECIPITATIONS_lag_0 = (PRECIPITATIONS_lag_0-1.073040009)/3.713360071;
  var scaled_TAVG_lag_0 = (TAVG_lag_0-15.34749985)/8.136360168;
  var scaled_TMAX_lag_0 = (TMAX_lag_0-21.9720993)/8.939259529;
  var scaled_TMIN_lag_0 = (TMIN_lag_0-8.652810097)/6.915589809;
  var scaled_PRESSURE_lag_0 = (PRESSURE_lag_0-1017.659973)/7.242730141;
  var scaled_WINDSPEED_lag_0 = (WINDSPEED_lag_0-10.52620029)/5.435550213;
  var scaled_HUMIDITY_lag_0 = (HUMIDITY_lag_0-58.62919998)/19.4993;

  //console.log(scaled_PRECIPITATIONS_lag_1, scaled_TAVG_lag_1, scaled_TMAX_lag_1, scaled_TMIN_lag_1, scaled_PRESSURE_lag_1);
  //console.log(scaled_WINDSPEED_lag_1, scaled_HUMIDITY_lag_1, scaled_DAY_lag_0, scaled_MONTH_lag_0);
  //console.log(scaled_WEEKDAY_lag_0, scaled_PM25_lag_0, scaled_PM10_lag_0, scaled_O3_lag_0,scaled_NO2_lag_0);
  //console.log(scaled_SO2_lag_0, scaled_PRECIPITATIONS_lag_0, scaled_TAVG_lag_0, scaled_TMAX_lag_0);
  //console.log( scaled_TMIN_lag_0, scaled_PRESSURE_lag_0, scaled_WINDSPEED_lag_0, scaled_HUMIDITY_lag_0);

  /*var perceptron_layer_1_output_0 = Math.tanh( 0.748729 + (scaled_PRECIPITATIONS_lag_1*-0.0266187) + (scaled_TAVG_lag_1*0.546072) + (scaled_TMAX_lag_1*-0.534654) + (scaled_TMIN_lag_1*-0.281487) + (scaled_PRESSURE_lag_1*0.0988471) + (scaled_WINDSPEED_lag_1*-0.0462336) + (scaled_HUMIDITY_lag_1*0.0831667) + (scaled_DAY_lag_0*0.0598321) + (scaled_MONTH_lag_0*0.123732) + (scaled_WEEKDAY_lag_0*0.053093) + (scaled_PM25_lag_0*-0.326849) + (scaled_PM10_lag_0*0.199533) + (scaled_O3_lag_0*-0.183352) + (scaled_NO2_lag_0*0.0293667) + (scaled_SO2_lag_0*0.366551) + (scaled_PRECIPITATIONS_lag_0*-0.0246935) + (scaled_TAVG_lag_0*0.446503) + (scaled_TMAX_lag_0*-0.648738) + (scaled_TMIN_lag_0*-0.184787) + (scaled_PRESSURE_lag_0*-0.0422924) + (scaled_WINDSPEED_lag_0*-0.193681) + (scaled_HUMIDITY_lag_0*-0.0298389) );
  var perceptron_layer_1_output_1 = Math.tanh( 0.422928 + (scaled_PRECIPITATIONS_lag_1*0.00781069) + (scaled_TAVG_lag_1*0.560394) + (scaled_TMAX_lag_1*-0.275308) + (scaled_TMIN_lag_1*-0.152949) + (scaled_PRESSURE_lag_1*0.0224417) + (scaled_WINDSPEED_lag_1*0.010371) + (scaled_HUMIDITY_lag_1*0.0509056) + (scaled_DAY_lag_0*-0.0750207) + (scaled_MONTH_lag_0*-0.0418926) + (scaled_WEEKDAY_lag_0*-0.00177951) + (scaled_PM25_lag_0*-0.10242) + (scaled_PM10_lag_0*-0.159697) + (scaled_O3_lag_0*0.318706) + (scaled_NO2_lag_0*0.115512) + (scaled_SO2_lag_0*0.0457017) + (scaled_PRECIPITATIONS_lag_0*0.00256751) + (scaled_TAVG_lag_0*0.207437) + (scaled_TMAX_lag_0*-0.107807) + (scaled_TMIN_lag_0*-0.140817) + (scaled_PRESSURE_lag_0*0.0263342) + (scaled_WINDSPEED_lag_0*-0.0216186) + (scaled_HUMIDITY_lag_0*-0.0210207) );
  var perceptron_layer_1_output_2 = Math.tanh( 0.210519 + (scaled_PRECIPITATIONS_lag_1*-0.0134152) + (scaled_TAVG_lag_1*-0.396918) + (scaled_TMAX_lag_1*0.248167) + (scaled_TMIN_lag_1*0.23199) + (scaled_PRESSURE_lag_1*0.0300114) + (scaled_WINDSPEED_lag_1*-0.031099) + (scaled_HUMIDITY_lag_1*-0.0588599) + (scaled_DAY_lag_0*-0.00309225) + (scaled_MONTH_lag_0*-0.209103) + (scaled_WEEKDAY_lag_0*0.114991) + (scaled_PM25_lag_0*-0.245431) + (scaled_PM10_lag_0*0.350996) + (scaled_O3_lag_0*-0.383681) + (scaled_NO2_lag_0*-0.395128) + (scaled_SO2_lag_0*0.249171) + (scaled_PRECIPITATIONS_lag_0*-0.0211148) + (scaled_TAVG_lag_0*-0.20601) + (scaled_TMAX_lag_0*-0.0757152) + (scaled_TMIN_lag_0*0.318761) + (scaled_PRESSURE_lag_0*0.0339537) + (scaled_WINDSPEED_lag_0*-0.0527031) + (scaled_HUMIDITY_lag_0*-0.0178776) );
  var perceptron_layer_1_output_3 = Math.tanh( -1.08828 + (scaled_PRECIPITATIONS_lag_1*-0.624464) + (scaled_TAVG_lag_1*-0.915644) + (scaled_TMAX_lag_1*0.322456) + (scaled_TMIN_lag_1*-0.708638) + (scaled_PRESSURE_lag_1*-0.663222) + (scaled_WINDSPEED_lag_1*-0.0128406) + (scaled_HUMIDITY_lag_1*-0.138655) + (scaled_DAY_lag_0*-0.366684) + (scaled_MONTH_lag_0*0.42304) + (scaled_WEEKDAY_lag_0*-0.174586) + (scaled_PM25_lag_0*1.29139) + (scaled_PM10_lag_0*-0.278742) + (scaled_O3_lag_0*0.755765) + (scaled_NO2_lag_0*0.113535) + (scaled_SO2_lag_0*0.44887) + (scaled_PRECIPITATIONS_lag_0*-2.6867) + (scaled_TAVG_lag_0*0.0952437) + (scaled_TMAX_lag_0*0.756211) + (scaled_TMIN_lag_0*-0.618249) + (scaled_PRESSURE_lag_0*0.0976544) + (scaled_WINDSPEED_lag_0*0.236902) + (scaled_HUMIDITY_lag_0*-0.112758) );
  var perceptron_layer_1_output_4 = Math.tanh( -0.225697 + (scaled_PRECIPITATIONS_lag_1*0.0183002) + (scaled_TAVG_lag_1*-0.199975) + (scaled_TMAX_lag_1*0.15097) + (scaled_TMIN_lag_1*0.0128636) + (scaled_PRESSURE_lag_1*-0.0949914) + (scaled_WINDSPEED_lag_1*0.0357681) + (scaled_HUMIDITY_lag_1*-0.0208924) + (scaled_DAY_lag_0*-0.0101172) + (scaled_MONTH_lag_0*-0.146686) + (scaled_WEEKDAY_lag_0*0.0217939) + (scaled_PM25_lag_0*0.0404426) + (scaled_PM10_lag_0*-0.0186956) + (scaled_O3_lag_0*0.354251) + (scaled_NO2_lag_0*-0.185823) + (scaled_SO2_lag_0*0.38382) + (scaled_PRECIPITATIONS_lag_0*0.0249576) + (scaled_TAVG_lag_0*0.529437) + (scaled_TMAX_lag_0*-0.0414755) + (scaled_TMIN_lag_0*-0.164664) + (scaled_PRESSURE_lag_0*0.0441035) + (scaled_WINDSPEED_lag_0*0.0323441) + (scaled_HUMIDITY_lag_0*-0.0223405) );
  var perceptron_layer_1_output_5 = Math.tanh( -0.341546 + (scaled_PRECIPITATIONS_lag_1*0.00773454) + (scaled_TAVG_lag_1*0.767167) + (scaled_TMAX_lag_1*-0.165092) + (scaled_TMIN_lag_1*-0.197953) + (scaled_PRESSURE_lag_1*-0.0126345) + (scaled_WINDSPEED_lag_1*0.00940837) + (scaled_HUMIDITY_lag_1*-0.0148063) + (scaled_DAY_lag_0*-0.0343222) + (scaled_MONTH_lag_0*-0.0984154) + (scaled_WEEKDAY_lag_0*-0.0999983) + (scaled_PM25_lag_0*-0.0906683) + (scaled_PM10_lag_0*-0.229746) + (scaled_O3_lag_0*0.0283444) + (scaled_NO2_lag_0*0.214492) + (scaled_SO2_lag_0*0.477662) + (scaled_PRECIPITATIONS_lag_0*1.42723e-05) + (scaled_TAVG_lag_0*-0.0234358) + (scaled_TMAX_lag_0*-0.0913749) + (scaled_TMIN_lag_0*0.0390777) + (scaled_PRESSURE_lag_0*0.0672403) + (scaled_WINDSPEED_lag_0*0.00232897) + (scaled_HUMIDITY_lag_0*0.0182657) );
  var perceptron_layer_1_output_6 = Math.tanh( -0.231893 + (scaled_PRECIPITATIONS_lag_1*-0.0295497) + (scaled_TAVG_lag_1*0.450918) + (scaled_TMAX_lag_1*-0.436988) + (scaled_TMIN_lag_1*-0.344781) + (scaled_PRESSURE_lag_1*0.198719) + (scaled_WINDSPEED_lag_1*0.0637861) + (scaled_HUMIDITY_lag_1*0.119392) + (scaled_DAY_lag_0*-0.0822505) + (scaled_MONTH_lag_0*0.269136) + (scaled_WEEKDAY_lag_0*-0.130456) + (scaled_PM25_lag_0*0.284251) + (scaled_PM10_lag_0*-0.288229) + (scaled_O3_lag_0*0.0552019) + (scaled_NO2_lag_0*-0.221381) + (scaled_SO2_lag_0*0.190319) + (scaled_PRECIPITATIONS_lag_0*-0.00234716) + (scaled_TAVG_lag_0*0.655606) + (scaled_TMAX_lag_0*-0.414451) + (scaled_TMIN_lag_0*-0.360362) + (scaled_PRESSURE_lag_0*-0.140593) + (scaled_WINDSPEED_lag_0*0.10087) + (scaled_HUMIDITY_lag_0*0.0944479) );
  var perceptron_layer_1_output_7 = Math.tanh( 0.000245101 + (scaled_PRECIPITATIONS_lag_1*-0.00258948) + (scaled_TAVG_lag_1*-0.483645) + (scaled_TMAX_lag_1*0.274426) + (scaled_TMIN_lag_1*0.0704776) + (scaled_PRESSURE_lag_1*-0.0264077) + (scaled_WINDSPEED_lag_1*0.00436645) + (scaled_HUMIDITY_lag_1*-0.0224051) + (scaled_DAY_lag_0*0.0257676) + (scaled_MONTH_lag_0*0.0140236) + (scaled_WEEKDAY_lag_0*0.0245347) + (scaled_PM25_lag_0*0.108726) + (scaled_PM10_lag_0*-0.270966) + (scaled_O3_lag_0*-0.208041) + (scaled_NO2_lag_0*-0.145577) + (scaled_SO2_lag_0*-0.0326737) + (scaled_PRECIPITATIONS_lag_0*0.00839847) + (scaled_TAVG_lag_0*-0.0324367) + (scaled_TMAX_lag_0*0.113047) + (scaled_TMIN_lag_0*0.0451814) + (scaled_PRESSURE_lag_0*-0.0352984) + (scaled_WINDSPEED_lag_0*0.0368902) + (scaled_HUMIDITY_lag_0*0.00646428) );
  var perceptron_layer_1_output_8 = Math.tanh( -2.16577 + (scaled_PRECIPITATIONS_lag_1*0.405555) + (scaled_TAVG_lag_1*0.230976) + (scaled_TMAX_lag_1*0.074005) + (scaled_TMIN_lag_1*-0.800558) + (scaled_PRESSURE_lag_1*-0.652733) + (scaled_WINDSPEED_lag_1*0.226836) + (scaled_HUMIDITY_lag_1*0.40582) + (scaled_DAY_lag_0*2.45069) + (scaled_MONTH_lag_0*3.62215) + (scaled_WEEKDAY_lag_0*0.0578529) + (scaled_PM25_lag_0*-0.56407) + (scaled_PM10_lag_0*-0.465572) + (scaled_O3_lag_0*0.635116) + (scaled_NO2_lag_0*-0.061197) + (scaled_SO2_lag_0*0.400092) + (scaled_PRECIPITATIONS_lag_0*0.809057) + (scaled_TAVG_lag_0*0.295951) + (scaled_TMAX_lag_0*0.782559) + (scaled_TMIN_lag_0*-0.255066) + (scaled_PRESSURE_lag_0*0.613042) + (scaled_WINDSPEED_lag_0*-0.48323) + (scaled_HUMIDITY_lag_0*-0.0842927) );
  var perceptron_layer_1_output_9 = Math.tanh( -0.887206 + (scaled_PRECIPITATIONS_lag_1*0.00966743) + (scaled_TAVG_lag_1*-0.76238) + (scaled_TMAX_lag_1*0.267776) + (scaled_TMIN_lag_1*0.261702) + (scaled_PRESSURE_lag_1*-0.0721652) + (scaled_WINDSPEED_lag_1*-0.0237281) + (scaled_HUMIDITY_lag_1*0.0095891) + (scaled_DAY_lag_0*-0.0131208) + (scaled_MONTH_lag_0*0.0118307) + (scaled_WEEKDAY_lag_0*0.283062) + (scaled_PM25_lag_0*0.0398136) + (scaled_PM10_lag_0*0.0255655) + (scaled_O3_lag_0*0.0438906) + (scaled_NO2_lag_0*0.0545683) + (scaled_SO2_lag_0*0.122534) + (scaled_PRECIPITATIONS_lag_0*0.0137832) + (scaled_TAVG_lag_0*-0.0142049) + (scaled_TMAX_lag_0*0.0144254) + (scaled_TMIN_lag_0*0.0456167) + (scaled_PRESSURE_lag_0*0.0912792) + (scaled_WINDSPEED_lag_0*0.0299137) + (scaled_HUMIDITY_lag_0*0.0520957) );
*/
  var perceptron_layer_1_combinations_0 = -0.346637 -0.0441849*scaled_PRECIPITATIONS_lag_1 +1.05292*scaled_TAVG_lag_1 -0.831433*scaled_TMAX_lag_1 -0.626594*scaled_TMIN_lag_1 +0.107856*scaled_PRESSURE_lag_1 +0.0125538*scaled_WINDSPEED_lag_1 -0.103813*scaled_HUMIDITY_lag_1 +0.154938*scaled_DAY_lag_0 +1.24721*scaled_MONTH_lag_0 -0.143869*scaled_WEEKDAY_lag_0 -0.177797*scaled_PM25_lag_0 -0.0521652*scaled_PM10_lag_0 +0.145478*scaled_O3_lag_0 -0.48542*scaled_NO2_lag_0 +1.18975*scaled_SO2_lag_0 -0.0156739*scaled_PRECIPITATIONS_lag_0 +1.21353*scaled_TAVG_lag_0 -1.05205*scaled_TMAX_lag_0 -0.273978*scaled_TMIN_lag_0 -0.241094*scaled_PRESSURE_lag_0 -0.169633*scaled_WINDSPEED_lag_0 +0.0527748*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_1 = 0.0425986 +0.00343028*scaled_PRECIPITATIONS_lag_1 -0.196673*scaled_TAVG_lag_1 +0.129786*scaled_TMAX_lag_1 -0.00632853*scaled_TMIN_lag_1 -0.0749024*scaled_PRESSURE_lag_1 +0.00806534*scaled_WINDSPEED_lag_1 -0.00650671*scaled_HUMIDITY_lag_1 +0.0632948*scaled_DAY_lag_0 +0.0111115*scaled_MONTH_lag_0 +0.0336547*scaled_WEEKDAY_lag_0 +0.05322*scaled_PM25_lag_0 +0.0628366*scaled_PM10_lag_0 +0.361727*scaled_O3_lag_0 -0.33123*scaled_NO2_lag_0 +0.29585*scaled_SO2_lag_0 +0.00427932*scaled_PRECIPITATIONS_lag_0 +0.373282*scaled_TAVG_lag_0 -0.0189687*scaled_TMAX_lag_0 -0.118783*scaled_TMIN_lag_0 +0.0466251*scaled_PRESSURE_lag_0 +0.0718744*scaled_WINDSPEED_lag_0 -0.0225012*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_2 = 0.246285 -0.0365745*scaled_PRECIPITATIONS_lag_1 +0.284916*scaled_TAVG_lag_1 -0.342186*scaled_TMAX_lag_1 -0.24604*scaled_TMIN_lag_1 -0.142189*scaled_PRESSURE_lag_1 -0.0356778*scaled_WINDSPEED_lag_1 -0.00110732*scaled_HUMIDITY_lag_1 +0.295999*scaled_DAY_lag_0 +0.286897*scaled_MONTH_lag_0 +0.0654988*scaled_WEEKDAY_lag_0 +0.0797368*scaled_PM25_lag_0 +0.564487*scaled_PM10_lag_0 +0.12958*scaled_O3_lag_0 -0.11137*scaled_NO2_lag_0 -0.474527*scaled_SO2_lag_0 -0.00976152*scaled_PRECIPITATIONS_lag_0 +0.332489*scaled_TAVG_lag_0 -0.111639*scaled_TMAX_lag_0 -0.356498*scaled_TMIN_lag_0 -0.0182123*scaled_PRESSURE_lag_0 +0.0908593*scaled_WINDSPEED_lag_0 +0.111337*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_3 = 0.634233 +0.0232833*scaled_PRECIPITATIONS_lag_1 -0.817331*scaled_TAVG_lag_1 +0.253038*scaled_TMAX_lag_1 +0.282561*scaled_TMIN_lag_1 -0.130065*scaled_PRESSURE_lag_1 -0.0255798*scaled_WINDSPEED_lag_1 -0.0280793*scaled_HUMIDITY_lag_1 +0.0399491*scaled_DAY_lag_0 -0.131321*scaled_MONTH_lag_0 +0.373385*scaled_WEEKDAY_lag_0 +0.0389286*scaled_PM25_lag_0 -0.133932*scaled_PM10_lag_0 +0.127419*scaled_O3_lag_0 +0.00765754*scaled_NO2_lag_0 +0.0496958*scaled_SO2_lag_0 +0.0198496*scaled_PRECIPITATIONS_lag_0 -0.104173*scaled_TAVG_lag_0 +0.360696*scaled_TMAX_lag_0 +0.0647542*scaled_TMIN_lag_0 +0.0537974*scaled_PRESSURE_lag_0 +0.0104921*scaled_WINDSPEED_lag_0 -0.0650983*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_4 = 0.0103413 +0.0186729*scaled_PRECIPITATIONS_lag_1 -0.237878*scaled_TAVG_lag_1 +0.102495*scaled_TMAX_lag_1 +0.0696742*scaled_TMIN_lag_1 -0.103967*scaled_PRESSURE_lag_1 -0.0278385*scaled_WINDSPEED_lag_1 -0.0201828*scaled_HUMIDITY_lag_1 +0.0490018*scaled_DAY_lag_0 +0.0173524*scaled_MONTH_lag_0 +0.143964*scaled_WEEKDAY_lag_0 +0.0394173*scaled_PM25_lag_0 +0.10306*scaled_PM10_lag_0 +0.158129*scaled_O3_lag_0 +0.118696*scaled_NO2_lag_0 +0.112769*scaled_SO2_lag_0 +0.00734638*scaled_PRECIPITATIONS_lag_0 -0.17127*scaled_TAVG_lag_0 +0.22555*scaled_TMAX_lag_0 +0.0660015*scaled_TMIN_lag_0 +0.0764167*scaled_PRESSURE_lag_0 +0.00563322*scaled_WINDSPEED_lag_0 -0.0220356*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_5 = 4.70904 +0.0553398*scaled_PRECIPITATIONS_lag_1 +0.3469*scaled_TAVG_lag_1 -0.493825*scaled_TMAX_lag_1 +0.939083*scaled_TMIN_lag_1 -0.177738*scaled_PRESSURE_lag_1 -0.182096*scaled_WINDSPEED_lag_1 -0.674914*scaled_HUMIDITY_lag_1 +0.0950511*scaled_DAY_lag_0 -0.731387*scaled_MONTH_lag_0 -0.221718*scaled_WEEKDAY_lag_0 +0.202811*scaled_PM25_lag_0 +0.207156*scaled_PM10_lag_0 -0.0479088*scaled_O3_lag_0 -0.551825*scaled_NO2_lag_0 -0.690397*scaled_SO2_lag_0 +0.315262*scaled_PRECIPITATIONS_lag_0 +1.77664*scaled_TAVG_lag_0 +0.297884*scaled_TMAX_lag_0 -0.0896825*scaled_TMIN_lag_0 -0.565442*scaled_PRESSURE_lag_0 -0.0895788*scaled_WINDSPEED_lag_0 -0.723777*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_6 = -0.373749 +0.00642064*scaled_PRECIPITATIONS_lag_1 +1.89088*scaled_TAVG_lag_1 -1.01489*scaled_TMAX_lag_1 -1.03759*scaled_TMIN_lag_1 -0.104676*scaled_PRESSURE_lag_1 +0.0461583*scaled_WINDSPEED_lag_1 +0.0546048*scaled_HUMIDITY_lag_1 +0.420407*scaled_DAY_lag_0 +0.849822*scaled_MONTH_lag_0 -0.183607*scaled_WEEKDAY_lag_0 -0.0959196*scaled_PM25_lag_0 -0.177751*scaled_PM10_lag_0 +0.257162*scaled_O3_lag_0 -0.190973*scaled_NO2_lag_0 +0.586336*scaled_SO2_lag_0 +0.0132492*scaled_PRECIPITATIONS_lag_0 +1.14248*scaled_TAVG_lag_0 -0.855701*scaled_TMAX_lag_0 -0.486636*scaled_TMIN_lag_0 -0.10482*scaled_PRESSURE_lag_0 -0.0225176*scaled_WINDSPEED_lag_0 +0.0601152*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_7 = 0.00291251 +0.0846519*scaled_PRECIPITATIONS_lag_1 +0.0080739*scaled_TAVG_lag_1 +0.34674*scaled_TMAX_lag_1 -0.0838019*scaled_TMIN_lag_1 -0.038851*scaled_PRESSURE_lag_1 -0.0261845*scaled_WINDSPEED_lag_1 +0.00991936*scaled_HUMIDITY_lag_1 -0.0392795*scaled_DAY_lag_0 +0.180076*scaled_MONTH_lag_0 +0.0282114*scaled_WEEKDAY_lag_0 -0.0582974*scaled_PM25_lag_0 -0.893278*scaled_PM10_lag_0 -0.0243617*scaled_O3_lag_0 +0.542637*scaled_NO2_lag_0 +0.205699*scaled_SO2_lag_0 +0.0309974*scaled_PRECIPITATIONS_lag_0 -0.625391*scaled_TAVG_lag_0 +0.341046*scaled_TMAX_lag_0 +0.214731*scaled_TMIN_lag_0 +0.110719*scaled_PRESSURE_lag_0 -0.114876*scaled_WINDSPEED_lag_0 -0.0760541*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_8 = 0.440711 +0.0203499*scaled_PRECIPITATIONS_lag_1 +0.128834*scaled_TAVG_lag_1 -0.0951416*scaled_TMAX_lag_1 +0.0528857*scaled_TMIN_lag_1 +0.00403846*scaled_PRESSURE_lag_1 -0.0259612*scaled_WINDSPEED_lag_1 -0.0507026*scaled_HUMIDITY_lag_1 -0.0209599*scaled_DAY_lag_0 +0.17338*scaled_MONTH_lag_0 -0.0277537*scaled_WEEKDAY_lag_0 -0.0490982*scaled_PM25_lag_0 -0.00209834*scaled_PM10_lag_0 +0.0199502*scaled_O3_lag_0 +0.160181*scaled_NO2_lag_0 -0.396723*scaled_SO2_lag_0 +0.00162496*scaled_PRECIPITATIONS_lag_0 -0.298693*scaled_TAVG_lag_0 +0.205586*scaled_TMAX_lag_0 +0.0987165*scaled_TMIN_lag_0 -0.0328049*scaled_PRESSURE_lag_0 -0.0877363*scaled_WINDSPEED_lag_0 -0.080501*scaled_HUMIDITY_lag_0;
	var perceptron_layer_1_combinations_9 = -0.0985322 +0.0284023*scaled_PRECIPITATIONS_lag_1 +0.335518*scaled_TAVG_lag_1 +0.192009*scaled_TMAX_lag_1 -0.535832*scaled_TMIN_lag_1 -0.168389*scaled_PRESSURE_lag_1 -0.393743*scaled_WINDSPEED_lag_1 +0.0210615*scaled_HUMIDITY_lag_1 +0.181233*scaled_DAY_lag_0 +2.11379*scaled_MONTH_lag_0 +0.0140374*scaled_WEEKDAY_lag_0 +0.229176*scaled_PM25_lag_0 +0.245178*scaled_PM10_lag_0 +0.337717*scaled_O3_lag_0 -0.102571*scaled_NO2_lag_0 -0.40904*scaled_SO2_lag_0 -0.0076523*scaled_PRECIPITATIONS_lag_0 -0.494657*scaled_TAVG_lag_0 -0.10198*scaled_TMAX_lag_0 -0.669617*scaled_TMIN_lag_0 +0.475586*scaled_PRESSURE_lag_0 -0.00418163*scaled_WINDSPEED_lag_0 +0.16812*scaled_HUMIDITY_lag_0;

  /*console.log(perceptron_layer_1_combinations_0);
  console.log(perceptron_layer_1_combinations_1);
  console.log(perceptron_layer_1_combinations_2);
  console.log(perceptron_layer_1_combinations_3);
  console.log(perceptron_layer_1_combinations_4);
  console.log(perceptron_layer_1_combinations_5);
  console.log(perceptron_layer_1_combinations_6);
  console.log(perceptron_layer_1_combinations_7);
  console.log(perceptron_layer_1_combinations_8);
  console.log(perceptron_layer_1_combinations_9);*/

  var perceptron_layer_1_output_0=Math.tanh(perceptron_layer_1_combinations_0);
  var perceptron_layer_1_output_1=Math.tanh(perceptron_layer_1_combinations_1);
  var perceptron_layer_1_output_2=Math.tanh(perceptron_layer_1_combinations_2);
  var perceptron_layer_1_output_3=Math.tanh(perceptron_layer_1_combinations_3);
  var perceptron_layer_1_output_4=Math.tanh(perceptron_layer_1_combinations_4);
  var perceptron_layer_1_output_5=Math.tanh(perceptron_layer_1_combinations_5);
  var perceptron_layer_1_output_6=Math.tanh(perceptron_layer_1_combinations_6);
  var perceptron_layer_1_output_7=Math.tanh(perceptron_layer_1_combinations_7);
  var perceptron_layer_1_output_8=Math.tanh(perceptron_layer_1_combinations_8);
  var perceptron_layer_1_output_9=Math.tanh(perceptron_layer_1_combinations_9);

  /*console.log(perceptron_layer_1_output_0);
  console.log(perceptron_layer_1_output_1);
  console.log(perceptron_layer_1_output_2);
  console.log(perceptron_layer_1_output_3);
  console.log(perceptron_layer_1_output_4);
  console.log(perceptron_layer_1_output_5);
  console.log(perceptron_layer_1_output_6);
  console.log(perceptron_layer_1_output_7);
  console.log(perceptron_layer_1_output_8);
  console.log(perceptron_layer_1_output_9)*/


  //console.log(perceptron_layer_1_output_0);

  var perceptron_layer_2_output_0 = ( 0.621401 + (perceptron_layer_1_output_0*0.192234) + (perceptron_layer_1_output_1*-0.556372) + (perceptron_layer_1_output_2*0.0639733) + (perceptron_layer_1_output_3*-1.21128) + (perceptron_layer_1_output_4*2.37786) + (perceptron_layer_1_output_5*-0.136409) + (perceptron_layer_1_output_6*-0.296417) + (perceptron_layer_1_output_7*-0.590384) + (perceptron_layer_1_output_8*-0.127255) + (perceptron_layer_1_output_9*0.00993221) );
  var perceptron_layer_2_output_1 = ( 0.574554 + (perceptron_layer_1_output_0*-0.31874) + (perceptron_layer_1_output_1*-0.318262) + (perceptron_layer_1_output_2*-0.624989) + (perceptron_layer_1_output_3*-0.883731) + (perceptron_layer_1_output_4*2.19861) + (perceptron_layer_1_output_5*-0.1707) + (perceptron_layer_1_output_6*0.267933) + (perceptron_layer_1_output_7*-0.886003) + (perceptron_layer_1_output_8*0.287651) + (perceptron_layer_1_output_9*0.228101) );
  var perceptron_layer_2_output_2 = ( -0.360303 + (perceptron_layer_1_output_0*-0.199449) + (perceptron_layer_1_output_1*1.23849) + (perceptron_layer_1_output_2*0.037612) + (perceptron_layer_1_output_3*-0.119401) + (perceptron_layer_1_output_4*0.150788) + (perceptron_layer_1_output_5*0.0911803) + (perceptron_layer_1_output_6*0.0465003) + (perceptron_layer_1_output_7*0.211039) + (perceptron_layer_1_output_8*0.77993) + (perceptron_layer_1_output_9*-0.202606) );
  var perceptron_layer_2_output_3 = ( 0.710379 + (perceptron_layer_1_output_0*-0.451323) + (perceptron_layer_1_output_1*-0.879527) + (perceptron_layer_1_output_2*-0.415494) + (perceptron_layer_1_output_3*-0.676561) + (perceptron_layer_1_output_4*1.69033) + (perceptron_layer_1_output_5*-0.130368) + (perceptron_layer_1_output_6*0.428789) + (perceptron_layer_1_output_7*0.115844) + (perceptron_layer_1_output_8*-0.123278) + (perceptron_layer_1_output_9*0.147464) );
  var perceptron_layer_2_output_4 = ( 0.983458 + (perceptron_layer_1_output_0*0.256724) + (perceptron_layer_1_output_1*-0.138763) + (perceptron_layer_1_output_2*-0.557245) + (perceptron_layer_1_output_3*-0.455019) + (perceptron_layer_1_output_4*1.17076) + (perceptron_layer_1_output_5*-0.119359) + (perceptron_layer_1_output_6*0.16872) + (perceptron_layer_1_output_7*-0.0886412) + (perceptron_layer_1_output_8*-1.216) + (perceptron_layer_1_output_9*0.0217616) );
  var perceptron_layer_2_output_5 = ( 0.596076 + (perceptron_layer_1_output_0*-0.214757) + (perceptron_layer_1_output_1*-0.419049) + (perceptron_layer_1_output_2*-0.451094) + (perceptron_layer_1_output_3*-0.749979) + (perceptron_layer_1_output_4*1.89671) + (perceptron_layer_1_output_5*-0.348603) + (perceptron_layer_1_output_6*0.259471) + (perceptron_layer_1_output_7*-0.707736) + (perceptron_layer_1_output_8*0.195706) + (perceptron_layer_1_output_9*0.161648) );
  var perceptron_layer_2_output_6 = ( 0.5086 + (perceptron_layer_1_output_0*-0.654099) + (perceptron_layer_1_output_1*0.0487039) + (perceptron_layer_1_output_2*-0.963192) + (perceptron_layer_1_output_3*-0.293345) + (perceptron_layer_1_output_4*1.47046) + (perceptron_layer_1_output_5*-0.38574) + (perceptron_layer_1_output_6*0.605389) + (perceptron_layer_1_output_7*-0.920651) + (perceptron_layer_1_output_8*0.439396) + (perceptron_layer_1_output_9*0.499093) );
  var perceptron_layer_2_output_7 = ( -0.317745 + (perceptron_layer_1_output_0*-0.182006) + (perceptron_layer_1_output_1*0.999882) + (perceptron_layer_1_output_2*-0.116722) + (perceptron_layer_1_output_3*-0.230452) + (perceptron_layer_1_output_4*0.291896) + (perceptron_layer_1_output_5*0.12168) + (perceptron_layer_1_output_6*0.117173) + (perceptron_layer_1_output_7*0.0513359) + (perceptron_layer_1_output_8*0.855907) + (perceptron_layer_1_output_9*-0.279133) );
  var perceptron_layer_2_output_8 = ( 0.643958 + (perceptron_layer_1_output_0*-0.584107) + (perceptron_layer_1_output_1*-0.59263) + (perceptron_layer_1_output_2*-0.747544) + (perceptron_layer_1_output_3*0.067545) + (perceptron_layer_1_output_4*0.807892) + (perceptron_layer_1_output_5*-0.321284) + (perceptron_layer_1_output_6*0.635223) + (perceptron_layer_1_output_7*-0.268033) + (perceptron_layer_1_output_8*-0.0120055) + (perceptron_layer_1_output_9*0.444454) );
  var perceptron_layer_2_output_9 = ( 0.937465 + (perceptron_layer_1_output_0*0.245419) + (perceptron_layer_1_output_1*-0.0719921) + (perceptron_layer_1_output_2*-0.593464) + (perceptron_layer_1_output_3*-0.20446) + (perceptron_layer_1_output_4*0.76503) + (perceptron_layer_1_output_5*-0.190208) + (perceptron_layer_1_output_6*0.230683) + (perceptron_layer_1_output_7*-0.208161) + (perceptron_layer_1_output_8*-1.10041) + (perceptron_layer_1_output_9*0.0827217) );
  var perceptron_layer_2_output_10 = ( 0.561255 + (perceptron_layer_1_output_0*-0.531964) + (perceptron_layer_1_output_1*-0.128872) + (perceptron_layer_1_output_2*-0.80465) + (perceptron_layer_1_output_3*-0.254486) + (perceptron_layer_1_output_4*1.24572) + (perceptron_layer_1_output_5*-0.492209) + (perceptron_layer_1_output_6*0.614593) + (perceptron_layer_1_output_7*-0.801821) + (perceptron_layer_1_output_8*0.323767) + (perceptron_layer_1_output_9*0.424522) );
  var perceptron_layer_2_output_11 = ( 0.337495 + (perceptron_layer_1_output_0*-0.754933) + (perceptron_layer_1_output_1*-0.0284598) + (perceptron_layer_1_output_2*-1.28882) + (perceptron_layer_1_output_3*0.367507) + (perceptron_layer_1_output_4*1.09017) + (perceptron_layer_1_output_5*-0.513718) + (perceptron_layer_1_output_6*0.905888) + (perceptron_layer_1_output_7*-1.22209) + (perceptron_layer_1_output_8*0.704578) + (perceptron_layer_1_output_9*0.60246) );
  var perceptron_layer_2_output_12 = ( -0.246985 + (perceptron_layer_1_output_0*-0.20562) + (perceptron_layer_1_output_1*0.967297) + (perceptron_layer_1_output_2*-0.144635) + (perceptron_layer_1_output_3*-0.432998) + (perceptron_layer_1_output_4*0.391225) + (perceptron_layer_1_output_5*0.157563) + (perceptron_layer_1_output_6*0.113299) + (perceptron_layer_1_output_7*0.0792008) + (perceptron_layer_1_output_8*0.823203) + (perceptron_layer_1_output_9*-0.312071) );
  var perceptron_layer_2_output_13 = ( 0.388416 + (perceptron_layer_1_output_0*-0.436414) + (perceptron_layer_1_output_1*-0.687686) + (perceptron_layer_1_output_2*-0.893869) + (perceptron_layer_1_output_3*0.78024) + (perceptron_layer_1_output_4*0.441459) + (perceptron_layer_1_output_5*-0.393272) + (perceptron_layer_1_output_6*0.619344) + (perceptron_layer_1_output_7*-0.551113) + (perceptron_layer_1_output_8*0.182257) + (perceptron_layer_1_output_9*0.520881) );
  var perceptron_layer_2_output_14 = ( 0.850979 + (perceptron_layer_1_output_0*0.269956) + (perceptron_layer_1_output_1*-0.140283) + (perceptron_layer_1_output_2*-0.666314) + (perceptron_layer_1_output_3*0.0532611) + (perceptron_layer_1_output_4*0.6082) + (perceptron_layer_1_output_5*-0.22579) + (perceptron_layer_1_output_6*0.292643) + (perceptron_layer_1_output_7*-0.33787) + (perceptron_layer_1_output_8*-0.958673) + (perceptron_layer_1_output_9*0.100306) );
  var perceptron_layer_2_output_15 = ( 0.426892 + (perceptron_layer_1_output_0*-0.624961) + (perceptron_layer_1_output_1*-0.131273) + (perceptron_layer_1_output_2*-1.07876) + (perceptron_layer_1_output_3*0.294481) + (perceptron_layer_1_output_4*0.838994) + (perceptron_layer_1_output_5*-0.590085) + (perceptron_layer_1_output_6*0.825932) + (perceptron_layer_1_output_7*-1.01234) + (perceptron_layer_1_output_8*0.533915) + (perceptron_layer_1_output_9*0.558071) );
  var perceptron_layer_2_output_16 = ( 0.228357 + (perceptron_layer_1_output_0*-0.811423) + (perceptron_layer_1_output_1*-0.136295) + (perceptron_layer_1_output_2*-1.47461) + (perceptron_layer_1_output_3*0.790793) + (perceptron_layer_1_output_4*0.883481) + (perceptron_layer_1_output_5*-0.588856) + (perceptron_layer_1_output_6*1.07062) + (perceptron_layer_1_output_7*-1.42603) + (perceptron_layer_1_output_8*0.850904) + (perceptron_layer_1_output_9*0.65934) );
  var perceptron_layer_2_output_17 = ( -0.23151 + (perceptron_layer_1_output_0*-0.15058) + (perceptron_layer_1_output_1*0.975191) + (perceptron_layer_1_output_2*-0.039091) + (perceptron_layer_1_output_3*-0.560525) + (perceptron_layer_1_output_4*0.399828) + (perceptron_layer_1_output_5*0.191717) + (perceptron_layer_1_output_6*0.0256637) + (perceptron_layer_1_output_7*0.145112) + (perceptron_layer_1_output_8*0.751457) + (perceptron_layer_1_output_9*-0.374579) );
  var perceptron_layer_2_output_18 = ( 0.161073 + (perceptron_layer_1_output_0*-0.354467) + (perceptron_layer_1_output_1*-0.786546) + (perceptron_layer_1_output_2*-0.923316) + (perceptron_layer_1_output_3*1.3551) + (perceptron_layer_1_output_4*0.248445) + (perceptron_layer_1_output_5*-0.439833) + (perceptron_layer_1_output_6*0.588365) + (perceptron_layer_1_output_7*-0.695834) + (perceptron_layer_1_output_8*0.256511) + (perceptron_layer_1_output_9*0.583001) );
  var perceptron_layer_2_output_19 = ( 0.774495 + (perceptron_layer_1_output_0*0.275345) + (perceptron_layer_1_output_1*-0.185833) + (perceptron_layer_1_output_2*-0.726143) + (perceptron_layer_1_output_3*0.269387) + (perceptron_layer_1_output_4*0.498452) + (perceptron_layer_1_output_5*-0.237878) + (perceptron_layer_1_output_6*0.333431) + (perceptron_layer_1_output_7*-0.45232) + (perceptron_layer_1_output_8*-0.893044) + (perceptron_layer_1_output_9*0.145963) );
  var perceptron_layer_2_output_20 = ( 0.337341 + (perceptron_layer_1_output_0*-0.704011) + (perceptron_layer_1_output_1*-0.245545) + (perceptron_layer_1_output_2*-1.28915) + (perceptron_layer_1_output_3*0.721962) + (perceptron_layer_1_output_4*0.665515) + (perceptron_layer_1_output_5*-0.661799) + (perceptron_layer_1_output_6*1.05447) + (perceptron_layer_1_output_7*-1.26092) + (perceptron_layer_1_output_8*0.672889) + (perceptron_layer_1_output_9*0.625224) );
  var perceptron_layer_2_output_21 = ( 0.297083 + (perceptron_layer_1_output_0*-0.919708) + (perceptron_layer_1_output_1*-0.145216) + (perceptron_layer_1_output_2*-1.56004) + (perceptron_layer_1_output_3*0.722447) + (perceptron_layer_1_output_4*0.732313) + (perceptron_layer_1_output_5*-0.619502) + (perceptron_layer_1_output_6*1.26076) + (perceptron_layer_1_output_7*-1.48086) + (perceptron_layer_1_output_8*0.953213) + (perceptron_layer_1_output_9*0.630386) );
  var perceptron_layer_2_output_22 = ( -0.293921 + (perceptron_layer_1_output_0*-0.163849) + (perceptron_layer_1_output_1*0.913626) + (perceptron_layer_1_output_2*-0.0992459) + (perceptron_layer_1_output_3*-0.405816) + (perceptron_layer_1_output_4*0.437979) + (perceptron_layer_1_output_5*0.215232) + (perceptron_layer_1_output_6*0.0559462) + (perceptron_layer_1_output_7*0.116367) + (perceptron_layer_1_output_8*0.727201) + (perceptron_layer_1_output_9*-0.340746) );
  var perceptron_layer_2_output_23 = ( 0.352617 + (perceptron_layer_1_output_0*-0.448585) + (perceptron_layer_1_output_1*-0.724612) + (perceptron_layer_1_output_2*-0.977666) + (perceptron_layer_1_output_3*1.00365) + (perceptron_layer_1_output_4*0.155626) + (perceptron_layer_1_output_5*-0.430691) + (perceptron_layer_1_output_6*0.729415) + (perceptron_layer_1_output_7*-0.721822) + (perceptron_layer_1_output_8*0.288136) + (perceptron_layer_1_output_9*0.559195) );
  var perceptron_layer_2_output_24 = ( 0.862917 + (perceptron_layer_1_output_0*0.247276) + (perceptron_layer_1_output_1*-0.112622) + (perceptron_layer_1_output_2*-0.713438) + (perceptron_layer_1_output_3*0.122981) + (perceptron_layer_1_output_4*0.367126) + (perceptron_layer_1_output_5*-0.251008) + (perceptron_layer_1_output_6*0.342287) + (perceptron_layer_1_output_7*-0.446207) + (perceptron_layer_1_output_8*-0.876249) + (perceptron_layer_1_output_9*0.160066) );
  var perceptron_layer_2_output_25 = ( 0.322364 + (perceptron_layer_1_output_0*-0.80268) + (perceptron_layer_1_output_1*-0.329738) + (perceptron_layer_1_output_2*-1.4211) + (perceptron_layer_1_output_3*0.821442) + (perceptron_layer_1_output_4*0.543896) + (perceptron_layer_1_output_5*-0.68148) + (perceptron_layer_1_output_6*1.25075) + (perceptron_layer_1_output_7*-1.37333) + (perceptron_layer_1_output_8*0.791143) + (perceptron_layer_1_output_9*0.617086) );
  var perceptron_layer_2_output_26 = ( 0.548947 + (perceptron_layer_1_output_0*-1.01458) + (perceptron_layer_1_output_1*-0.0481566) + (perceptron_layer_1_output_2*-1.55956) + (perceptron_layer_1_output_3*0.148794) + (perceptron_layer_1_output_4*0.617321) + (perceptron_layer_1_output_5*-0.56842) + (perceptron_layer_1_output_6*1.39396) + (perceptron_layer_1_output_7*-1.44146) + (perceptron_layer_1_output_8*0.948628) + (perceptron_layer_1_output_9*0.570128) );
  var perceptron_layer_2_output_27 = ( -0.375643 + (perceptron_layer_1_output_0*-0.0996491) + (perceptron_layer_1_output_1*0.888047) + (perceptron_layer_1_output_2*-0.0528825) + (perceptron_layer_1_output_3*-0.206753) + (perceptron_layer_1_output_4*0.411609) + (perceptron_layer_1_output_5*0.177252) + (perceptron_layer_1_output_6*-0.0382841) + (perceptron_layer_1_output_7*0.107866) + (perceptron_layer_1_output_8*0.718912) + (perceptron_layer_1_output_9*-0.341559) );
  var perceptron_layer_2_output_28 = ( 0.80778 + (perceptron_layer_1_output_0*-0.552607) + (perceptron_layer_1_output_1*-0.579393) + (perceptron_layer_1_output_2*-0.966037) + (perceptron_layer_1_output_3*-0.115016) + (perceptron_layer_1_output_4*0.170879) + (perceptron_layer_1_output_5*-0.341568) + (perceptron_layer_1_output_6*0.842093) + (perceptron_layer_1_output_7*-0.595914) + (perceptron_layer_1_output_8*0.269539) + (perceptron_layer_1_output_9*0.42853) );
  var perceptron_layer_2_output_29 = ( 1.00726 + (perceptron_layer_1_output_0*0.25276) + (perceptron_layer_1_output_1*-0.0165742) + (perceptron_layer_1_output_2*-0.582816) + (perceptron_layer_1_output_3*-0.284129) + (perceptron_layer_1_output_4*0.333693) + (perceptron_layer_1_output_5*-0.190081) + (perceptron_layer_1_output_6*0.274097) + (perceptron_layer_1_output_7*-0.297165) + (perceptron_layer_1_output_8*-0.954085) + (perceptron_layer_1_output_9*0.130467) );
  var perceptron_layer_2_output_30 = ( 0.503006 + (perceptron_layer_1_output_0*-0.918922) + (perceptron_layer_1_output_1*-0.349506) + (perceptron_layer_1_output_2*-1.53322) + (perceptron_layer_1_output_3*0.44735) + (perceptron_layer_1_output_4*0.50914) + (perceptron_layer_1_output_5*-0.644058) + (perceptron_layer_1_output_6*1.43648) + (perceptron_layer_1_output_7*-1.41581) + (perceptron_layer_1_output_8*0.842555) + (perceptron_layer_1_output_9*0.577331) );
  var perceptron_layer_2_output_31 = ( 0.600378 + (perceptron_layer_1_output_0*-1.02741) + (perceptron_layer_1_output_1*-0.050134) + (perceptron_layer_1_output_2*-1.59333) + (perceptron_layer_1_output_3*-0.0776184) + (perceptron_layer_1_output_4*0.595686) + (perceptron_layer_1_output_5*-0.482043) + (perceptron_layer_1_output_6*1.4004) + (perceptron_layer_1_output_7*-1.38056) + (perceptron_layer_1_output_8*0.949357) + (perceptron_layer_1_output_9*0.553891) );
  var perceptron_layer_2_output_32 = ( -0.387516 + (perceptron_layer_1_output_0*-0.070843) + (perceptron_layer_1_output_1*0.841296) + (perceptron_layer_1_output_2*0.0362966) + (perceptron_layer_1_output_3*-0.177361) + (perceptron_layer_1_output_4*0.447524) + (perceptron_layer_1_output_5*0.16901) + (perceptron_layer_1_output_6*-0.0537989) + (perceptron_layer_1_output_7*0.103507) + (perceptron_layer_1_output_8*0.664109) + (perceptron_layer_1_output_9*-0.39072) );
  var perceptron_layer_2_output_33 = ( 0.834291 + (perceptron_layer_1_output_0*-0.569296) + (perceptron_layer_1_output_1*-0.686698) + (perceptron_layer_1_output_2*-0.950588) + (perceptron_layer_1_output_3*-0.393605) + (perceptron_layer_1_output_4*0.426888) + (perceptron_layer_1_output_5*-0.212806) + (perceptron_layer_1_output_6*0.878678) + (perceptron_layer_1_output_7*-0.522014) + (perceptron_layer_1_output_8*0.25014) + (perceptron_layer_1_output_9*0.366697) );
  var perceptron_layer_2_output_34 = ( 0.984376 + (perceptron_layer_1_output_0*0.323755) + (perceptron_layer_1_output_1*-0.0435371) + (perceptron_layer_1_output_2*-0.50982) + (perceptron_layer_1_output_3*-0.326851) + (perceptron_layer_1_output_4*0.418442) + (perceptron_layer_1_output_5*-0.153067) + (perceptron_layer_1_output_6*0.20021) + (perceptron_layer_1_output_7*-0.223065) + (perceptron_layer_1_output_8*-0.966197) + (perceptron_layer_1_output_9*0.0972789) );

  /*console.log(perceptron_layer_2_output_0);
  console.log(perceptron_layer_2_output_1);
  console.log(perceptron_layer_2_output_2);
  console.log(perceptron_layer_2_output_3);
  console.log(perceptron_layer_2_output_4);
  console.log(perceptron_layer_2_output_5);
  console.log(perceptron_layer_2_output_6);
  console.log(perceptron_layer_2_output_7);
  console.log(perceptron_layer_2_output_8);
  console.log(perceptron_layer_2_output_9);
  console.log(perceptron_layer_2_output_10);
  console.log(perceptron_layer_2_output_11);
  console.log(perceptron_layer_2_output_12);
  console.log(perceptron_layer_2_output_13);
  console.log(perceptron_layer_2_output_14);
  console.log(perceptron_layer_2_output_15);
  console.log(perceptron_layer_2_output_16);
  console.log(perceptron_layer_2_output_17);
  console.log(perceptron_layer_2_output_18);
  console.log(perceptron_layer_2_output_19);
  console.log(perceptron_layer_2_output_20);
  console.log(perceptron_layer_2_output_21);
  console.log(perceptron_layer_2_output_22);
  console.log(perceptron_layer_2_output_23);
  console.log(perceptron_layer_2_output_24);
  console.log(perceptron_layer_2_output_25);
  console.log(perceptron_layer_2_output_26);
  console.log(perceptron_layer_2_output_27);
  console.log(perceptron_layer_2_output_28);
  console.log(perceptron_layer_2_output_29);
  console.log(perceptron_layer_2_output_30);
  console.log(perceptron_layer_2_output_31);
  console.log(perceptron_layer_2_output_32);
  console.log(perceptron_layer_2_output_33);
  console.log(perceptron_layer_2_output_34);*/




  //CAMBIAR NOMBRE UNSACLIGN A PM25_AHEAD1 ETC
  //console.log(perceptron_layer_2_output_0);
  /*var unscaling_layer_output_0 = 10+0.5*(perceptron_layer_2_output_0+1)*(166-10);
  var unscaling_layer_output_1 = 4+0.5*(perceptron_layer_2_output_1+1)*(160-4);
  var unscaling_layer_output_2 = 1+0.5*(perceptron_layer_2_output_2+1)*(249-1);
  var unscaling_layer_output_3 = 2+0.5*(perceptron_layer_2_output_3+1)*(74-2);
  var unscaling_layer_output_4 = 0+0.5*(perceptron_layer_2_output_4+1)*(17-0);
  var unscaling_layer_output_5 = 10+0.5*(perceptron_layer_2_output_5+1)*(166-10);
  var unscaling_layer_output_6 = 4+0.5*(perceptron_layer_2_output_6+1)*(160-4);
  var unscaling_layer_output_7 = 1+0.5*(perceptron_layer_2_output_7+1)*(249-1);
  var unscaling_layer_output_8 = 2+0.5*(perceptron_layer_2_output_8+1)*(74-2);
  var unscaling_layer_output_9 = 0+0.5*(perceptron_layer_2_output_9+1)*(17-0);
  var unscaling_layer_output_10 = 10+0.5*(perceptron_layer_2_output_10+1)*(166-10);
  var unscaling_layer_output_11 = 4+0.5*(perceptron_layer_2_output_11+1)*(160-4);
  var unscaling_layer_output_12 = 1+0.5*(perceptron_layer_2_output_12+1)*(249-1);
  var unscaling_layer_output_13 = 2+0.5*(perceptron_layer_2_output_13+1)*(74-2);
  var unscaling_layer_output_14 = 0+0.5*(perceptron_layer_2_output_14+1)*(17-0);
  var unscaling_layer_output_15 = 10+0.5*(perceptron_layer_2_output_15+1)*(166-10);
  var unscaling_layer_output_16 = 4+0.5*(perceptron_layer_2_output_16+1)*(160-4);
  var unscaling_layer_output_17 = 1+0.5*(perceptron_layer_2_output_17+1)*(249-1);
  var unscaling_layer_output_18 = 2+0.5*(perceptron_layer_2_output_18+1)*(74-2);
  var unscaling_layer_output_19 = 0+0.5*(perceptron_layer_2_output_19+1)*(17-0);
  var unscaling_layer_output_20 = 10+0.5*(perceptron_layer_2_output_20+1)*(166-10);
  var unscaling_layer_output_21 = 4+0.5*(perceptron_layer_2_output_21+1)*(160-4);
  var unscaling_layer_output_22 = 1+0.5*(perceptron_layer_2_output_22+1)*(249-1);
  var unscaling_layer_output_23 = 2+0.5*(perceptron_layer_2_output_23+1)*(74-2);
  var unscaling_layer_output_24 = 0+0.5*(perceptron_layer_2_output_24+1)*(17-0);
  var unscaling_layer_output_25 = 10+0.5*(perceptron_layer_2_output_25+1)*(166-10);
  var unscaling_layer_output_26 = 4+0.5*(perceptron_layer_2_output_26+1)*(160-4);
  var unscaling_layer_output_27 = 1+0.5*(perceptron_layer_2_output_27+1)*(249-1);
  var unscaling_layer_output_28 = 2+0.5*(perceptron_layer_2_output_28+1)*(74-2);
  var unscaling_layer_output_29 = 0+0.5*(perceptron_layer_2_output_29+1)*(17-0);
  var unscaling_layer_output_30 = 10+0.5*(perceptron_layer_2_output_30+1)*(166-10);
  var unscaling_layer_output_31 = 4+0.5*(perceptron_layer_2_output_31+1)*(160-4);
  var unscaling_layer_output_32 = 1+0.5*(perceptron_layer_2_output_32+1)*(249-1);
  var unscaling_layer_output_33 = 2+0.5*(perceptron_layer_2_output_33+1)*(74-2);
  var unscaling_layer_output_34 = 0+0.5*(perceptron_layer_2_output_34+1)*(17-0);*/

  var unscaling_layer_output_0 = perceptron_layer_2_output_0*19.51350021+54.49290085;
	var unscaling_layer_output_1 = perceptron_layer_2_output_1*11.87619972+24.55019951;
	var unscaling_layer_output_2 = perceptron_layer_2_output_2*14.54930019+32.80659866;
	var unscaling_layer_output_3 = perceptron_layer_2_output_3*10.28919983+24.17300034;
	var unscaling_layer_output_4 = perceptron_layer_2_output_4*2.052659988+3.113059998;
	var unscaling_layer_output_5 = perceptron_layer_2_output_5*19.51329994+54.49330139;
	var unscaling_layer_output_6 = perceptron_layer_2_output_6*11.87320042+24.5557003;
	var unscaling_layer_output_7 = perceptron_layer_2_output_7*14.54920006+32.80770111;
	var unscaling_layer_output_8 = perceptron_layer_2_output_8*10.28989983+24.17239952;
	var unscaling_layer_output_9 = perceptron_layer_2_output_9*2.052390099+3.113409996;
	var unscaling_layer_output_10 = perceptron_layer_2_output_10*19.50620079+54.50189972;
	var unscaling_layer_output_11 = perceptron_layer_2_output_11*11.87180042+24.55879974;
	var unscaling_layer_output_12 = perceptron_layer_2_output_12*14.55169964+32.81560135;
	var unscaling_layer_output_13 = perceptron_layer_2_output_13*10.29039955+24.17169952;
	var unscaling_layer_output_14 = perceptron_layer_2_output_14*2.05211997+3.113749981;
	var unscaling_layer_output_15 = perceptron_layer_2_output_15*19.50329971+54.5094986;
	var unscaling_layer_output_16 = perceptron_layer_2_output_16*11.87269974+24.56389999;
	var unscaling_layer_output_17 = perceptron_layer_2_output_17*14.55179977+32.82249832;
	var unscaling_layer_output_18 = perceptron_layer_2_output_18*10.29059982+24.17099953;
	var unscaling_layer_output_19 = perceptron_layer_2_output_19*2.05211997+3.113749981;
  var unscaling_layer_output_20 = perceptron_layer_2_output_20*19.50449944+54.51910019;
	var unscaling_layer_output_21 = perceptron_layer_2_output_21*11.87390041+24.56809998;
  var unscaling_layer_output_22 = perceptron_layer_2_output_22*14.54880047+32.83010101;
  var unscaling_layer_output_23 = perceptron_layer_2_output_23*10.29290009+24.16550064;
	var unscaling_layer_output_24 = perceptron_layer_2_output_24*2.052220106+3.113409996;
	var unscaling_layer_output_25 = perceptron_layer_2_output_25*19.50020027+54.51499939;
	var unscaling_layer_output_26 = perceptron_layer_2_output_26*11.87549973+24.57150078;
	var unscaling_layer_output_27 = perceptron_layer_2_output_27*14.54349995+32.83940125;
  var unscaling_layer_output_28 = perceptron_layer_2_output_28*10.29240036+24.1616993;
	var unscaling_layer_output_29 = perceptron_layer_2_output_29*2.05163002+3.112030029;
	var unscaling_layer_output_30 = perceptron_layer_2_output_30*19.49920082+54.51330185;
	var unscaling_layer_output_31 = perceptron_layer_2_output_31*11.8767004+24.57259941;
	var unscaling_layer_output_32 = perceptron_layer_2_output_32*14.53520012+32.84590149;
	var unscaling_layer_output_33 = perceptron_layer_2_output_33*10.28719997+24.14789963;
	var unscaling_layer_output_34 = perceptron_layer_2_output_34*2.048810005+3.109620094;

  console.log(unscaling_layer_output_0);
  console.log(unscaling_layer_output_1);
  console.log(unscaling_layer_output_2);
  console.log(unscaling_layer_output_3);
  console.log(unscaling_layer_output_4);
  console.log(unscaling_layer_output_5);
  console.log(unscaling_layer_output_6);
  console.log(unscaling_layer_output_7);
  console.log(unscaling_layer_output_8);
  console.log(unscaling_layer_output_9);
  console.log(unscaling_layer_output_10);
  console.log(unscaling_layer_output_11);
  console.log(unscaling_layer_output_12);
  console.log(unscaling_layer_output_13);
  console.log(unscaling_layer_output_14);
  console.log(unscaling_layer_output_15);
  console.log(unscaling_layer_output_16);
  console.log(unscaling_layer_output_17);
  console.log(unscaling_layer_output_18);
  console.log(unscaling_layer_output_19);
  console.log(unscaling_layer_output_20);
  console.log(unscaling_layer_output_21);
  console.log(unscaling_layer_output_22);
  console.log(unscaling_layer_output_23);
  console.log(unscaling_layer_output_24);
  console.log(unscaling_layer_output_25);
  console.log(unscaling_layer_output_26);
  console.log(unscaling_layer_output_27);
  console.log(unscaling_layer_output_28);
  console.log(unscaling_layer_output_29);
  console.log(unscaling_layer_output_30);
  console.log(unscaling_layer_output_31);
  console.log(unscaling_layer_output_32);
  console.log(unscaling_layer_output_33);
  console.log(unscaling_layer_output_34);

}

module.exports = router;