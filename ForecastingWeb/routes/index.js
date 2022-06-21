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

  var perceptron_layer_1_output_0 = Math.tanh( 0.748729 + (scaled_PRECIPITATIONS_lag_1*-0.0266187) + (scaled_TAVG_lag_1*0.546072) + (scaled_TMAX_lag_1*-0.534654) + (scaled_TMIN_lag_1*-0.281487) + (scaled_PRESSURE_lag_1*0.0988471) + (scaled_WINDSPEED_lag_1*-0.0462336) + (scaled_HUMIDITY_lag_1*0.0831667) + (scaled_DAY_lag_0*0.0598321) + (scaled_MONTH_lag_0*0.123732) + (scaled_WEEKDAY_lag_0*0.053093) + (scaled_PM25_lag_0*-0.326849) + (scaled_PM10_lag_0*0.199533) + (scaled_O3_lag_0*-0.183352) + (scaled_NO2_lag_0*0.0293667) + (scaled_SO2_lag_0*0.366551) + (scaled_PRECIPITATIONS_lag_0*-0.0246935) + (scaled_TAVG_lag_0*0.446503) + (scaled_TMAX_lag_0*-0.648738) + (scaled_TMIN_lag_0*-0.184787) + (scaled_PRESSURE_lag_0*-0.0422924) + (scaled_WINDSPEED_lag_0*-0.193681) + (scaled_HUMIDITY_lag_0*-0.0298389) );
  var perceptron_layer_1_output_1 = Math.tanh( 0.422928 + (scaled_PRECIPITATIONS_lag_1*0.00781069) + (scaled_TAVG_lag_1*0.560394) + (scaled_TMAX_lag_1*-0.275308) + (scaled_TMIN_lag_1*-0.152949) + (scaled_PRESSURE_lag_1*0.0224417) + (scaled_WINDSPEED_lag_1*0.010371) + (scaled_HUMIDITY_lag_1*0.0509056) + (scaled_DAY_lag_0*-0.0750207) + (scaled_MONTH_lag_0*-0.0418926) + (scaled_WEEKDAY_lag_0*-0.00177951) + (scaled_PM25_lag_0*-0.10242) + (scaled_PM10_lag_0*-0.159697) + (scaled_O3_lag_0*0.318706) + (scaled_NO2_lag_0*0.115512) + (scaled_SO2_lag_0*0.0457017) + (scaled_PRECIPITATIONS_lag_0*0.00256751) + (scaled_TAVG_lag_0*0.207437) + (scaled_TMAX_lag_0*-0.107807) + (scaled_TMIN_lag_0*-0.140817) + (scaled_PRESSURE_lag_0*0.0263342) + (scaled_WINDSPEED_lag_0*-0.0216186) + (scaled_HUMIDITY_lag_0*-0.0210207) );
  var perceptron_layer_1_output_2 = Math.tanh( 0.210519 + (scaled_PRECIPITATIONS_lag_1*-0.0134152) + (scaled_TAVG_lag_1*-0.396918) + (scaled_TMAX_lag_1*0.248167) + (scaled_TMIN_lag_1*0.23199) + (scaled_PRESSURE_lag_1*0.0300114) + (scaled_WINDSPEED_lag_1*-0.031099) + (scaled_HUMIDITY_lag_1*-0.0588599) + (scaled_DAY_lag_0*-0.00309225) + (scaled_MONTH_lag_0*-0.209103) + (scaled_WEEKDAY_lag_0*0.114991) + (scaled_PM25_lag_0*-0.245431) + (scaled_PM10_lag_0*0.350996) + (scaled_O3_lag_0*-0.383681) + (scaled_NO2_lag_0*-0.395128) + (scaled_SO2_lag_0*0.249171) + (scaled_PRECIPITATIONS_lag_0*-0.0211148) + (scaled_TAVG_lag_0*-0.20601) + (scaled_TMAX_lag_0*-0.0757152) + (scaled_TMIN_lag_0*0.318761) + (scaled_PRESSURE_lag_0*0.0339537) + (scaled_WINDSPEED_lag_0*-0.0527031) + (scaled_HUMIDITY_lag_0*-0.0178776) );
  var perceptron_layer_1_output_3 = Math.tanh( -1.08828 + (scaled_PRECIPITATIONS_lag_1*-0.624464) + (scaled_TAVG_lag_1*-0.915644) + (scaled_TMAX_lag_1*0.322456) + (scaled_TMIN_lag_1*-0.708638) + (scaled_PRESSURE_lag_1*-0.663222) + (scaled_WINDSPEED_lag_1*-0.0128406) + (scaled_HUMIDITY_lag_1*-0.138655) + (scaled_DAY_lag_0*-0.366684) + (scaled_MONTH_lag_0*0.42304) + (scaled_WEEKDAY_lag_0*-0.174586) + (scaled_PM25_lag_0*1.29139) + (scaled_PM10_lag_0*-0.278742) + (scaled_O3_lag_0*0.755765) + (scaled_NO2_lag_0*0.113535) + (scaled_SO2_lag_0*0.44887) + (scaled_PRECIPITATIONS_lag_0*-2.6867) + (scaled_TAVG_lag_0*0.0952437) + (scaled_TMAX_lag_0*0.756211) + (scaled_TMIN_lag_0*-0.618249) + (scaled_PRESSURE_lag_0*0.0976544) + (scaled_WINDSPEED_lag_0*0.236902) + (scaled_HUMIDITY_lag_0*-0.112758) );
  var perceptron_layer_1_output_4 = Math.tanh( -0.225697 + (scaled_PRECIPITATIONS_lag_1*0.0183002) + (scaled_TAVG_lag_1*-0.199975) + (scaled_TMAX_lag_1*0.15097) + (scaled_TMIN_lag_1*0.0128636) + (scaled_PRESSURE_lag_1*-0.0949914) + (scaled_WINDSPEED_lag_1*0.0357681) + (scaled_HUMIDITY_lag_1*-0.0208924) + (scaled_DAY_lag_0*-0.0101172) + (scaled_MONTH_lag_0*-0.146686) + (scaled_WEEKDAY_lag_0*0.0217939) + (scaled_PM25_lag_0*0.0404426) + (scaled_PM10_lag_0*-0.0186956) + (scaled_O3_lag_0*0.354251) + (scaled_NO2_lag_0*-0.185823) + (scaled_SO2_lag_0*0.38382) + (scaled_PRECIPITATIONS_lag_0*0.0249576) + (scaled_TAVG_lag_0*0.529437) + (scaled_TMAX_lag_0*-0.0414755) + (scaled_TMIN_lag_0*-0.164664) + (scaled_PRESSURE_lag_0*0.0441035) + (scaled_WINDSPEED_lag_0*0.0323441) + (scaled_HUMIDITY_lag_0*-0.0223405) );
  var perceptron_layer_1_output_5 = Math.tanh( -0.341546 + (scaled_PRECIPITATIONS_lag_1*0.00773454) + (scaled_TAVG_lag_1*0.767167) + (scaled_TMAX_lag_1*-0.165092) + (scaled_TMIN_lag_1*-0.197953) + (scaled_PRESSURE_lag_1*-0.0126345) + (scaled_WINDSPEED_lag_1*0.00940837) + (scaled_HUMIDITY_lag_1*-0.0148063) + (scaled_DAY_lag_0*-0.0343222) + (scaled_MONTH_lag_0*-0.0984154) + (scaled_WEEKDAY_lag_0*-0.0999983) + (scaled_PM25_lag_0*-0.0906683) + (scaled_PM10_lag_0*-0.229746) + (scaled_O3_lag_0*0.0283444) + (scaled_NO2_lag_0*0.214492) + (scaled_SO2_lag_0*0.477662) + (scaled_PRECIPITATIONS_lag_0*1.42723e-05) + (scaled_TAVG_lag_0*-0.0234358) + (scaled_TMAX_lag_0*-0.0913749) + (scaled_TMIN_lag_0*0.0390777) + (scaled_PRESSURE_lag_0*0.0672403) + (scaled_WINDSPEED_lag_0*0.00232897) + (scaled_HUMIDITY_lag_0*0.0182657) );
  var perceptron_layer_1_output_6 = Math.tanh( -0.231893 + (scaled_PRECIPITATIONS_lag_1*-0.0295497) + (scaled_TAVG_lag_1*0.450918) + (scaled_TMAX_lag_1*-0.436988) + (scaled_TMIN_lag_1*-0.344781) + (scaled_PRESSURE_lag_1*0.198719) + (scaled_WINDSPEED_lag_1*0.0637861) + (scaled_HUMIDITY_lag_1*0.119392) + (scaled_DAY_lag_0*-0.0822505) + (scaled_MONTH_lag_0*0.269136) + (scaled_WEEKDAY_lag_0*-0.130456) + (scaled_PM25_lag_0*0.284251) + (scaled_PM10_lag_0*-0.288229) + (scaled_O3_lag_0*0.0552019) + (scaled_NO2_lag_0*-0.221381) + (scaled_SO2_lag_0*0.190319) + (scaled_PRECIPITATIONS_lag_0*-0.00234716) + (scaled_TAVG_lag_0*0.655606) + (scaled_TMAX_lag_0*-0.414451) + (scaled_TMIN_lag_0*-0.360362) + (scaled_PRESSURE_lag_0*-0.140593) + (scaled_WINDSPEED_lag_0*0.10087) + (scaled_HUMIDITY_lag_0*0.0944479) );
  var perceptron_layer_1_output_7 = Math.tanh( 0.000245101 + (scaled_PRECIPITATIONS_lag_1*-0.00258948) + (scaled_TAVG_lag_1*-0.483645) + (scaled_TMAX_lag_1*0.274426) + (scaled_TMIN_lag_1*0.0704776) + (scaled_PRESSURE_lag_1*-0.0264077) + (scaled_WINDSPEED_lag_1*0.00436645) + (scaled_HUMIDITY_lag_1*-0.0224051) + (scaled_DAY_lag_0*0.0257676) + (scaled_MONTH_lag_0*0.0140236) + (scaled_WEEKDAY_lag_0*0.0245347) + (scaled_PM25_lag_0*0.108726) + (scaled_PM10_lag_0*-0.270966) + (scaled_O3_lag_0*-0.208041) + (scaled_NO2_lag_0*-0.145577) + (scaled_SO2_lag_0*-0.0326737) + (scaled_PRECIPITATIONS_lag_0*0.00839847) + (scaled_TAVG_lag_0*-0.0324367) + (scaled_TMAX_lag_0*0.113047) + (scaled_TMIN_lag_0*0.0451814) + (scaled_PRESSURE_lag_0*-0.0352984) + (scaled_WINDSPEED_lag_0*0.0368902) + (scaled_HUMIDITY_lag_0*0.00646428) );
  var perceptron_layer_1_output_8 = Math.tanh( -2.16577 + (scaled_PRECIPITATIONS_lag_1*0.405555) + (scaled_TAVG_lag_1*0.230976) + (scaled_TMAX_lag_1*0.074005) + (scaled_TMIN_lag_1*-0.800558) + (scaled_PRESSURE_lag_1*-0.652733) + (scaled_WINDSPEED_lag_1*0.226836) + (scaled_HUMIDITY_lag_1*0.40582) + (scaled_DAY_lag_0*2.45069) + (scaled_MONTH_lag_0*3.62215) + (scaled_WEEKDAY_lag_0*0.0578529) + (scaled_PM25_lag_0*-0.56407) + (scaled_PM10_lag_0*-0.465572) + (scaled_O3_lag_0*0.635116) + (scaled_NO2_lag_0*-0.061197) + (scaled_SO2_lag_0*0.400092) + (scaled_PRECIPITATIONS_lag_0*0.809057) + (scaled_TAVG_lag_0*0.295951) + (scaled_TMAX_lag_0*0.782559) + (scaled_TMIN_lag_0*-0.255066) + (scaled_PRESSURE_lag_0*0.613042) + (scaled_WINDSPEED_lag_0*-0.48323) + (scaled_HUMIDITY_lag_0*-0.0842927) );
  var perceptron_layer_1_output_9 = Math.tanh( -0.887206 + (scaled_PRECIPITATIONS_lag_1*0.00966743) + (scaled_TAVG_lag_1*-0.76238) + (scaled_TMAX_lag_1*0.267776) + (scaled_TMIN_lag_1*0.261702) + (scaled_PRESSURE_lag_1*-0.0721652) + (scaled_WINDSPEED_lag_1*-0.0237281) + (scaled_HUMIDITY_lag_1*0.0095891) + (scaled_DAY_lag_0*-0.0131208) + (scaled_MONTH_lag_0*0.0118307) + (scaled_WEEKDAY_lag_0*0.283062) + (scaled_PM25_lag_0*0.0398136) + (scaled_PM10_lag_0*0.0255655) + (scaled_O3_lag_0*0.0438906) + (scaled_NO2_lag_0*0.0545683) + (scaled_SO2_lag_0*0.122534) + (scaled_PRECIPITATIONS_lag_0*0.0137832) + (scaled_TAVG_lag_0*-0.0142049) + (scaled_TMAX_lag_0*0.0144254) + (scaled_TMIN_lag_0*0.0456167) + (scaled_PRESSURE_lag_0*0.0912792) + (scaled_WINDSPEED_lag_0*0.0299137) + (scaled_HUMIDITY_lag_0*0.0520957) );

  var perceptron_layer_2_output_0 = (1.20904 + (perceptron_layer_1_output_0*-0.225489) + (perceptron_layer_1_output_1*-2.21971) + (perceptron_layer_1_output_2*-0.154851) + (perceptron_layer_1_output_3*0.0895264) + (perceptron_layer_1_output_4*0.175167) + (perceptron_layer_1_output_5*-0.0517079) + (perceptron_layer_1_output_6*0.00906852) + (perceptron_layer_1_output_7*-2.03271) + (perceptron_layer_1_output_8*-0.0481481) + (perceptron_layer_1_output_9*0.470154) );
  var perceptron_layer_2_output_1 = ( 0.527462 + (perceptron_layer_1_output_0*-0.5061) + (perceptron_layer_1_output_1*-0.656055) + (perceptron_layer_1_output_2*0.484904) + (perceptron_layer_1_output_3*0.187682) + (perceptron_layer_1_output_4*-0.26673) + (perceptron_layer_1_output_5*-0.078558) + (perceptron_layer_1_output_6*0.020122) + (perceptron_layer_1_output_7*-1.99762) + (perceptron_layer_1_output_8*0.125699) + (perceptron_layer_1_output_9*0.247496) );
  var perceptron_layer_2_output_2 = ( -0.29056 + (perceptron_layer_1_output_0*-0.105911) + (perceptron_layer_1_output_1*0.537118) + (perceptron_layer_1_output_2*-0.296187) + (perceptron_layer_1_output_3*-0.0543132) + (perceptron_layer_1_output_4*1.10981) + (perceptron_layer_1_output_5*-0.588533) + (perceptron_layer_1_output_6*-0.217937) + (perceptron_layer_1_output_7*-0.177391) + (perceptron_layer_1_output_8*0.0226138) + (perceptron_layer_1_output_9*-0.303088) );
  var perceptron_layer_2_output_3 = ( 0.986364 + (perceptron_layer_1_output_0*0.0445343) + (perceptron_layer_1_output_1*-0.153033) + (perceptron_layer_1_output_2*-0.50235) + (perceptron_layer_1_output_3*0.131235) + (perceptron_layer_1_output_4*-0.918941) + (perceptron_layer_1_output_5*0.848731) + (perceptron_layer_1_output_6*-0.270819) + (perceptron_layer_1_output_7*-0.721303) + (perceptron_layer_1_output_8*0.0426203) + (perceptron_layer_1_output_9*1.02332) );
  var perceptron_layer_2_output_4 = ( 1.07277 + (perceptron_layer_1_output_0*0.201064) + (perceptron_layer_1_output_1*-0.504723) + (perceptron_layer_1_output_2*0.530354) + (perceptron_layer_1_output_3*0.181967) + (perceptron_layer_1_output_4*0.30799) + (perceptron_layer_1_output_5*1.1707) + (perceptron_layer_1_output_6*0.496986) + (perceptron_layer_1_output_7*-0.272612) + (perceptron_layer_1_output_8*0.106918) + (perceptron_layer_1_output_9*0.710775) );
  var perceptron_layer_2_output_5 = ( 0.931984 + (perceptron_layer_1_output_0*-0.551719) + (perceptron_layer_1_output_1*-0.887816) + (perceptron_layer_1_output_2*0.249697) + (perceptron_layer_1_output_3*0.189865) + (perceptron_layer_1_output_4*-0.345316) + (perceptron_layer_1_output_5*0.132898) + (perceptron_layer_1_output_6*0.169396) + (perceptron_layer_1_output_7*-1.65484) + (perceptron_layer_1_output_8*0.121908) + (perceptron_layer_1_output_9*0.606971) );
  var perceptron_layer_2_output_6 = ( 0.454365 + (perceptron_layer_1_output_0*-0.810913) + (perceptron_layer_1_output_1*0.385916) + (perceptron_layer_1_output_2*0.782171) + (perceptron_layer_1_output_3*0.346206) + (perceptron_layer_1_output_4*-0.570385) + (perceptron_layer_1_output_5*-0.0496296) + (perceptron_layer_1_output_6*0.142895) + (perceptron_layer_1_output_7*-1.32452) + (perceptron_layer_1_output_8*0.305904) + (perceptron_layer_1_output_9*0.508526) );
  var perceptron_layer_2_output_7 = ( -0.29354 + (perceptron_layer_1_output_0*-0.178961) + (perceptron_layer_1_output_1*0.111036) + (perceptron_layer_1_output_2*-0.232789) + (perceptron_layer_1_output_3*-0.0839365) + (perceptron_layer_1_output_4*0.966834) + (perceptron_layer_1_output_5*-0.284475) + (perceptron_layer_1_output_6*-0.392454) + (perceptron_layer_1_output_7*0.0480152) + (perceptron_layer_1_output_8*-0.0179826) + (perceptron_layer_1_output_9*-0.61439) );
  var perceptron_layer_2_output_8 = ( 0.743353 + (perceptron_layer_1_output_0*-0.266773) + (perceptron_layer_1_output_1*0.728554) + (perceptron_layer_1_output_2*0.179044) + (perceptron_layer_1_output_3*0.252053) + (perceptron_layer_1_output_4*-1.11308) + (perceptron_layer_1_output_5*0.517394) + (perceptron_layer_1_output_6*0.00422097) + (perceptron_layer_1_output_7*-0.344436) + (perceptron_layer_1_output_8*0.228802) + (perceptron_layer_1_output_9*1.02778) );
  var perceptron_layer_2_output_9 = ( 0.984106 + (perceptron_layer_1_output_0*0.0856179) + (perceptron_layer_1_output_1*-0.202007) + (perceptron_layer_1_output_2*0.713563) + (perceptron_layer_1_output_3*0.215808) + (perceptron_layer_1_output_4*0.200835) + (perceptron_layer_1_output_5*1.04236) + (perceptron_layer_1_output_6*0.583808) + (perceptron_layer_1_output_7*-0.128436) + (perceptron_layer_1_output_8*0.171291) + (perceptron_layer_1_output_9*0.689916) );
  var perceptron_layer_2_output_10 = ( 0.741359 + (perceptron_layer_1_output_0*-0.748388) + (perceptron_layer_1_output_1*0.0642144) + (perceptron_layer_1_output_2*0.575286) + (perceptron_layer_1_output_3*0.303309) + (perceptron_layer_1_output_4*-0.582294) + (perceptron_layer_1_output_5*0.0717521) + (perceptron_layer_1_output_6*0.348076) + (perceptron_layer_1_output_7*-1.22425) + (perceptron_layer_1_output_8*0.280941) + (perceptron_layer_1_output_9*0.719492) );
  var perceptron_layer_2_output_11 = ( 0.339074 + (perceptron_layer_1_output_0*-0.961719) + (perceptron_layer_1_output_1*0.973117) + (perceptron_layer_1_output_2*1.10776) + (perceptron_layer_1_output_3*0.414834) + (perceptron_layer_1_output_4*-0.695206) + (perceptron_layer_1_output_5*-0.174719) + (perceptron_layer_1_output_6*0.256187) + (perceptron_layer_1_output_7*-1.07598) + (perceptron_layer_1_output_8*0.429716) + (perceptron_layer_1_output_9*0.588958) );
  var perceptron_layer_2_output_12 = ( -0.350526 + (perceptron_layer_1_output_0*-0.167192) + (perceptron_layer_1_output_1*-0.0212731) + (perceptron_layer_1_output_2*-0.207169) + (perceptron_layer_1_output_3*-0.0836268) + (perceptron_layer_1_output_4*0.90846) + (perceptron_layer_1_output_5*-0.168603) + (perceptron_layer_1_output_6*-0.465147) + (perceptron_layer_1_output_7*0.130591) + (perceptron_layer_1_output_8*-0.0555758) + (perceptron_layer_1_output_9*-0.75547) );
  var perceptron_layer_2_output_13 = ( 0.703852 + (perceptron_layer_1_output_0*-0.333128) + (perceptron_layer_1_output_1*1.09122) + (perceptron_layer_1_output_2*0.471486) + (perceptron_layer_1_output_3*0.268535) + (perceptron_layer_1_output_4*-1.06764) + (perceptron_layer_1_output_5*0.235585) + (perceptron_layer_1_output_6*0.115051) + (perceptron_layer_1_output_7*-0.213419) + (perceptron_layer_1_output_8*0.308523) + (perceptron_layer_1_output_9*1.18362) );
  var perceptron_layer_2_output_14 = ( 0.959506 + (perceptron_layer_1_output_0*0.0559008) + (perceptron_layer_1_output_1*-0.0325544) + (perceptron_layer_1_output_2*0.724992) + (perceptron_layer_1_output_3*0.196102) + (perceptron_layer_1_output_4*0.227651) + (perceptron_layer_1_output_5*0.903629) + (perceptron_layer_1_output_6*0.716787) + (perceptron_layer_1_output_7*-0.176594) + (perceptron_layer_1_output_8*0.199246) + (perceptron_layer_1_output_9*0.717213) );
  var perceptron_layer_2_output_15 = ( 0.601805 + (perceptron_layer_1_output_0*-0.86441) + (perceptron_layer_1_output_1*0.673935) + (perceptron_layer_1_output_2*0.842746) + (perceptron_layer_1_output_3*0.375036) + (perceptron_layer_1_output_4*-0.714122) + (perceptron_layer_1_output_5*-0.0546763) + (perceptron_layer_1_output_6*0.440146) + (perceptron_layer_1_output_7*-0.980832) + (perceptron_layer_1_output_8*0.383363) + (perceptron_layer_1_output_9*0.798747) );
  var perceptron_layer_2_output_16 = ( 0.393191 + (perceptron_layer_1_output_0*-1.01245) + (perceptron_layer_1_output_1*1.10277) + (perceptron_layer_1_output_2*1.20006) + (perceptron_layer_1_output_3*0.397519) + (perceptron_layer_1_output_4*-0.702036) + (perceptron_layer_1_output_5*-0.240176) + (perceptron_layer_1_output_6*0.292406) + (perceptron_layer_1_output_7*-0.918738) + (perceptron_layer_1_output_8*0.472183) + (perceptron_layer_1_output_9*0.70115) );
  var perceptron_layer_2_output_17 = ( -0.40088 + (perceptron_layer_1_output_0*-0.184873) + (perceptron_layer_1_output_1*-0.0589556) + (perceptron_layer_1_output_2*-0.128274) + (perceptron_layer_1_output_3*-0.0499326) + (perceptron_layer_1_output_4*0.862934) + (perceptron_layer_1_output_5*-0.113504) + (perceptron_layer_1_output_6*-0.49985) + (perceptron_layer_1_output_7*0.19335) + (perceptron_layer_1_output_8*-0.0638465) + (perceptron_layer_1_output_9*-0.850848) );
  var perceptron_layer_2_output_18 = ( 0.894025 + (perceptron_layer_1_output_0*-0.410333) + (perceptron_layer_1_output_1*1.10528) + (perceptron_layer_1_output_2*0.519018) + (perceptron_layer_1_output_3*0.234712) + (perceptron_layer_1_output_4*-0.958279) + (perceptron_layer_1_output_5*0.0848248) + (perceptron_layer_1_output_6*0.121717) + (perceptron_layer_1_output_7*-0.0548258) + (perceptron_layer_1_output_8*0.319861) + (perceptron_layer_1_output_9*1.45654) );
  var perceptron_layer_2_output_19 = ( 0.959496 + (perceptron_layer_1_output_0*0.0641598) + (perceptron_layer_1_output_1*0.0203407) + (perceptron_layer_1_output_2*0.731901) + (perceptron_layer_1_output_3*0.133378) + (perceptron_layer_1_output_4*0.267845) + (perceptron_layer_1_output_5*0.782886) + (perceptron_layer_1_output_6*0.798266) + (perceptron_layer_1_output_7*-0.316153) + (perceptron_layer_1_output_8*0.19887) + (perceptron_layer_1_output_9*0.78159) );
  var perceptron_layer_2_output_20 = ( 0.664057 + (perceptron_layer_1_output_0*-0.940823) + (perceptron_layer_1_output_1*0.770189) + (perceptron_layer_1_output_2*0.957698) + (perceptron_layer_1_output_3*0.364929) + (perceptron_layer_1_output_4*-0.682601) + (perceptron_layer_1_output_5*-0.151247) + (perceptron_layer_1_output_6*0.528638) + (perceptron_layer_1_output_7*-0.848533) + (perceptron_layer_1_output_8*0.439824) + (perceptron_layer_1_output_9*0.869074) );
  var perceptron_layer_2_output_21 = ( 0.217732 + (perceptron_layer_1_output_0*-1.0692) + (perceptron_layer_1_output_1*1.05518) + (perceptron_layer_1_output_2*1.20813) + (perceptron_layer_1_output_3*0.403919) + (perceptron_layer_1_output_4*-0.790817) + (perceptron_layer_1_output_5*-0.126051) + (perceptron_layer_1_output_6*0.359787) + (perceptron_layer_1_output_7*-0.822547) + (perceptron_layer_1_output_8*0.464459) + (perceptron_layer_1_output_9*0.317713) );
  var perceptron_layer_2_output_22 = ( -0.27105 + (perceptron_layer_1_output_0*-0.187431) + (perceptron_layer_1_output_1*-0.0274676) + (perceptron_layer_1_output_2*-0.190616) + (perceptron_layer_1_output_3*-0.0665867) + (perceptron_layer_1_output_4*0.901204) + (perceptron_layer_1_output_5*-0.139913) + (perceptron_layer_1_output_6*-0.497526) + (perceptron_layer_1_output_7*0.217578) + (perceptron_layer_1_output_8*-0.0799647) + (perceptron_layer_1_output_9*-0.630093) );
  var perceptron_layer_2_output_23 = ( 0.538133 + (perceptron_layer_1_output_0*-0.406055) + (perceptron_layer_1_output_1*0.871669) + (perceptron_layer_1_output_2*0.510021) + (perceptron_layer_1_output_3*0.323964) + (perceptron_layer_1_output_4*-1.03331) + (perceptron_layer_1_output_5*0.236737) + (perceptron_layer_1_output_6*0.273509) + (perceptron_layer_1_output_7*-0.0322391) + (perceptron_layer_1_output_8*0.299231) + (perceptron_layer_1_output_9*0.668034) );
  var perceptron_layer_2_output_24 = ( 0.722627 + (perceptron_layer_1_output_0*0.0892188) + (perceptron_layer_1_output_1*-0.0667346) + (perceptron_layer_1_output_2*0.779241) + (perceptron_layer_1_output_3*0.180211) + (perceptron_layer_1_output_4*0.251834) + (perceptron_layer_1_output_5*0.737743) + (perceptron_layer_1_output_6*0.881413) + (perceptron_layer_1_output_7*-0.282773) + (perceptron_layer_1_output_8*0.207111) + (perceptron_layer_1_output_9*0.341046) );
  var perceptron_layer_2_output_25 = ( 0.469449 + (perceptron_layer_1_output_0*-0.925645) + (perceptron_layer_1_output_1*0.789918) + (perceptron_layer_1_output_2*0.980081) + (perceptron_layer_1_output_3*0.365801) + (perceptron_layer_1_output_4*-0.725996) + (perceptron_layer_1_output_5*-0.113515) + (perceptron_layer_1_output_6*0.563691) + (perceptron_layer_1_output_7*-0.789161) + (perceptron_layer_1_output_8*0.444398) + (perceptron_layer_1_output_9*0.56821) );
  var perceptron_layer_2_output_26 = ( -0.0846548 + (perceptron_layer_1_output_0*-1.10382) + (perceptron_layer_1_output_1*0.806797) + (perceptron_layer_1_output_2*1.16507) + (perceptron_layer_1_output_3*0.36022) + (perceptron_layer_1_output_4*-0.859977) + (perceptron_layer_1_output_5*0.020233) + (perceptron_layer_1_output_6*0.584365) + (perceptron_layer_1_output_7*-1.0404) + (perceptron_layer_1_output_8*0.421138) + (perceptron_layer_1_output_9*-0.398702) );
  var perceptron_layer_2_output_27 = ( -0.130804 + (perceptron_layer_1_output_0*-0.115565) + (perceptron_layer_1_output_1*-0.0287837) + (perceptron_layer_1_output_2*-0.258531) + (perceptron_layer_1_output_3*-0.0785599) + (perceptron_layer_1_output_4*1.02095) + (perceptron_layer_1_output_5*-0.239601) + (perceptron_layer_1_output_6*-0.567737) + (perceptron_layer_1_output_7*0.274787) + (perceptron_layer_1_output_8*-0.0883571) + (perceptron_layer_1_output_9*-0.346897) );
  var perceptron_layer_2_output_28 = ( 0.123658 + (perceptron_layer_1_output_0*-0.374253) + (perceptron_layer_1_output_1*0.305539) + (perceptron_layer_1_output_2*0.336031) + (perceptron_layer_1_output_3*0.238427) + (perceptron_layer_1_output_4*-1.08332) + (perceptron_layer_1_output_5*0.51738) + (perceptron_layer_1_output_6*0.57924) + (perceptron_layer_1_output_7*-0.498144) + (perceptron_layer_1_output_8*0.213077) + (perceptron_layer_1_output_9*-0.42194) );
  var perceptron_layer_2_output_29 = ( 0.628058 + (perceptron_layer_1_output_0*0.113095) + (perceptron_layer_1_output_1*-0.32261) + (perceptron_layer_1_output_2*0.665032) + (perceptron_layer_1_output_3*0.1172) + (perceptron_layer_1_output_4*0.269619) + (perceptron_layer_1_output_5*0.801165) + (perceptron_layer_1_output_6*0.97195) + (perceptron_layer_1_output_7*-0.436309) + (perceptron_layer_1_output_8*0.179375) + (perceptron_layer_1_output_9*0.0105322) );
  var perceptron_layer_2_output_30 = ( 0.23477 + (perceptron_layer_1_output_0*-0.968608) + (perceptron_layer_1_output_1*0.661012) + (perceptron_layer_1_output_2*0.945976) + (perceptron_layer_1_output_3*0.329668) + (perceptron_layer_1_output_4*-0.852045) + (perceptron_layer_1_output_5*0.0591038) + (perceptron_layer_1_output_6*0.681709) + (perceptron_layer_1_output_7*-0.884372) + (perceptron_layer_1_output_8*0.411049) + (perceptron_layer_1_output_9*0.0483093) );
  var perceptron_layer_2_output_31 = ( -0.132803 + (perceptron_layer_1_output_0*-1.01824) + (perceptron_layer_1_output_1*0.762005) + (perceptron_layer_1_output_2*1.0205) + (perceptron_layer_1_output_3*0.252673) + (perceptron_layer_1_output_4*-0.80524) + (perceptron_layer_1_output_5*0.0754738) + (perceptron_layer_1_output_6*0.590994) + (perceptron_layer_1_output_7*-1.11987) + (perceptron_layer_1_output_8*0.398468) + (perceptron_layer_1_output_9*-0.448173) );
  var perceptron_layer_2_output_32 = ( -0.0667899 + (perceptron_layer_1_output_0*-0.101593) + (perceptron_layer_1_output_1*-0.110513) + (perceptron_layer_1_output_2*-0.262099) + (perceptron_layer_1_output_3*-0.0753533) + (perceptron_layer_1_output_4*1.04285) + (perceptron_layer_1_output_5*-0.254792) + (perceptron_layer_1_output_6*-0.587153) + (perceptron_layer_1_output_7*0.261923) + (perceptron_layer_1_output_8*-0.103682) + (perceptron_layer_1_output_9*-0.275647) );
  var perceptron_layer_2_output_33 = ( 0.179391 + (perceptron_layer_1_output_0*-0.234948) + (perceptron_layer_1_output_1*0.185482) + (perceptron_layer_1_output_2*0.160751) + (perceptron_layer_1_output_3*0.0516584) + (perceptron_layer_1_output_4*-0.977792) + (perceptron_layer_1_output_5*0.510507) + (perceptron_layer_1_output_6*0.528105) + (perceptron_layer_1_output_7*-0.844097) + (perceptron_layer_1_output_8*0.169331) + (perceptron_layer_1_output_9*-0.28082) );
  var perceptron_layer_2_output_34 = ( 0.739585 + (perceptron_layer_1_output_0*0.161213) + (perceptron_layer_1_output_1*-0.377873) + (perceptron_layer_1_output_2*0.568343) + (perceptron_layer_1_output_3*0.060758) + (perceptron_layer_1_output_4*0.321852) + (perceptron_layer_1_output_5*0.815343) + (perceptron_layer_1_output_6*0.908091) + (perceptron_layer_1_output_7*-0.488397) + (perceptron_layer_1_output_8*0.165319) + (perceptron_layer_1_output_9*0.177487) );

  //CAMBIAR NOMBRE UNSACLIGN A PM25_AHEAD1 ETC
  //console.log(perceptron_layer_2_output_0);
  var unscaling_layer_output_0 = 10+0.5*(perceptron_layer_2_output_0+1)*(166-10);
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
  var unscaling_layer_output_34 = 0+0.5*(perceptron_layer_2_output_34+1)*(17-0);

  console.log(unscaling_layer_output_0);
  /*console.log(unscaling_layer_output_1);
  console.log(unscaling_layer_output_2);
  console.log(unscaling_layer_output_3);
  console.log(unscaling_layer_output_4);
  console.log(unscaling_layer_output_5);
  console.log(unscaling_layer_output_6);*/
  /*console.log(unscaling_layer_output_7);
  console.log(unscaling_layer_output_9);
  console.log(unscaling_layer_output_10);
  console.log(unscaling_layer_output_12);
  console.log(unscaling_layer_output_13);
  console.log(unscaling_layer_output_24);
  console.log(unscaling_layer_output_25);
  console.log(unscaling_layer_output_27);
  console.log(unscaling_layer_output_31);
  console.log(unscaling_layer_output_32);
  console.log(unscaling_layer_output_34);*/

}

module.exports = router;