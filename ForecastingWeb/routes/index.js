var express = require('express');
var router = express.Router();
const axios = require("axios");
var exec = require('child_process').execFile;
const fs = require('fs');

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

  //Retrieve chosen data from APIs
  /*var inputs=[yesterdayWeather.days[0].precip, yesterdayWeather.days[0].temp, yesterdayWeather.days[0].tempmax, yesterdayWeather.days[0].tempmin, 
  yesterdayWeather.days[0].pressure, yesterdayWeather.days[0].windspeed, yesterdayWeather.days[0].humidity, today_day, today_month, today_weekday, 
  pollutionData.iaqi.pm25.v, pollutionData.iaqi.pm10.v, pollutionData.iaqi.o3.v, pollutionData.iaqi.no2.v, pollutionData.iaqi.so2.v,
  todayWeather.days[0].precip, todayWeather.days[0].temp, todayWeather.days[0].tempmax, todayWeather.days[0].tempmin, 
  todayWeather.days[0].pressure, todayWeather.days[0].windspeed, todayWeather.days[0].humidity];*/

  //Continuous deployment
  //var contaminationPrediction=await calculateOutputs(inputs);

  //Append today data into historical CSV.
  /*var todayData=[today_day, today_month, today_weekday, pollutionData.iaqi.pm25.v, pollutionData.iaqi.pm10.v, pollutionData.iaqi.o3.v, pollutionData.iaqi.no2.v, pollutionData.iaqi.so2.v,
  todayWeather.days[0].precip, todayWeather.days[0].temp, todayWeather.days[0].tempmax, todayWeather.days[0].tempmin, 
  todayWeather.days[0].pressure, todayWeather.days[0].windspeed, todayWeather.days[0].humidity];
  await appendTodayData(todayData);*/

  res.render('index', { title: "Air contamination forecast", 
  //currentTemperature: todayWeather.currentConditions.temp, condition: todayWeather.currentConditions.conditions,
  date0: getDaysArray[0], date1: getDaysArray[1], date2: getDaysArray[2], date3: getDaysArray[3], date4: getDaysArray[4], date5: getDaysArray[5], date6: getDaysArray[6], date7: getDaysArray[7],
  /*totalAQI: pollutionData.aqi, actualPM25: pollutionData.iaqi.pm25.v, actualPM10: pollutionData.iaqi.pm10.v, actualO3: pollutionData.iaqi.o3.v, actualNO2: pollutionData.iaqi.no2.v, actualSO2: pollutionData.iaqi.so2.v,
  PM25_ahead_1: contaminationPrediction[0], PM10_ahead_1: contaminationPrediction[1], O3_ahead_1: contaminationPrediction[2], NO2_ahead_1: contaminationPrediction[3], SO2_ahead_1: contaminationPrediction[4],
  PM25_ahead_2: contaminationPrediction[5], PM10_ahead_2: contaminationPrediction[6], O3_ahead_2: contaminationPrediction[7], NO2_ahead_2: contaminationPrediction[8], SO2_ahead_2: contaminationPrediction[9],
  PM25_ahead_3: contaminationPrediction[10], PM10_ahead_3: contaminationPrediction[11], O3_ahead_3: contaminationPrediction[12], NO2_ahead_3: contaminationPrediction[13], SO2_ahead_3: contaminationPrediction[14],
  PM25_ahead_4: contaminationPrediction[15], PM10_ahead_4: contaminationPrediction[16], O3_ahead_4: contaminationPrediction[17], NO2_ahead_4: contaminationPrediction[18], SO2_ahead_4: contaminationPrediction[19],
  PM25_ahead_5: contaminationPrediction[20], PM10_ahead_5: contaminationPrediction[21], O3_ahead_5: contaminationPrediction[22], NO2_ahead_5: contaminationPrediction[23], SO2_ahead_5: contaminationPrediction[24],
  PM25_ahead_6: contaminationPrediction[25], PM10_ahead_6: contaminationPrediction[26], O3_ahead_6: contaminationPrediction[27], NO2_ahead_6: contaminationPrediction[28], SO2_ahead_6: contaminationPrediction[29],
  PM25_ahead_7: contaminationPrediction[30], PM10_ahead_7: contaminationPrediction[31], O3_ahead_7: contaminationPrediction[32], NO2_ahead_7: contaminationPrediction[33], SO2_ahead_7: contaminationPrediction[34]*/
  });
});

async function executeModel(inputs){
	return new Promise((resolve, reject) => {
		exec('deployment.exe', [inputs[0], inputs[1], inputs[2], inputs[3], inputs[4],inputs[5], inputs[6], inputs[7], inputs[8], inputs[9], inputs[10], 
		inputs[11], inputs[12], inputs[13], inputs[14], inputs[15], inputs[16], inputs[17], inputs[18], inputs[19], inputs[20], inputs[21]],  function(err, data) {  
		console.log(err)                     
	}); 
	resolve(); 
	})
}

async function calculateOutputs(inputs){
	await executeModel(inputs);
	var outputs = fs.readFileSync("outputs.csv", "utf8")
	outputs = outputs.replace(/(\r\n|\n|\r)/gm, "");
	outputs = outputs.split(";");
	return outputs;
}

async function trainNeuralNetwork(inputs){
	return new Promise((resolve, reject) => {
		exec('training.exe',  function(err, data) {  
		console.log(err);
	});  
	resolve(); 
	})
}

async function appendTodayData(appendData){
	var data = fs.readFileSync("HistoricalData.csv", "utf8")
	data = data.split("\n");
	var lastLine=data[data.length-2];
	lastLine = lastLine.split(";");
	var today  = new Date();
	date=today.toLocaleDateString("en-UK");

	if(!(lastLine[0].localeCompare(date)==0)){
		fs.appendFile('HistoricalData.csv', date + ";" + appendData[0]  + ";" + appendData[1]  + ";" + appendData[2]  + ";" + appendData[3]  + ";" + appendData[4] 
						+ ";" + appendData[5]  + ";" + appendData[6]  + ";" + appendData[7]  + ";" + appendData[8]  + ";" + appendData[9] 
						+ ";" + appendData[10]  + ";" + appendData[11]  + ";" + appendData[12]  + ";" + appendData[13]  + ";" + appendData[14] + '\r\n', (err) => {
			if (err) throw err;
			   console.log('The "data to append" was appended to file!');
			});
		//Continuous training
		await trainNeuralNetwork();
	}
	return lastLine;
}



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
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

async function getPollutionData() {
  try {
    const response = await axios.get('https://api.waqi.info/feed/madrid', 
      {params: {
          token: 'fdfe8e5fc89f795e0e19ac42fc1277e97f4804da'
    }});
    return response.data.data
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = router;