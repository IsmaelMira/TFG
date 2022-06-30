var express = require('express');
var router = express.Router();
const axios = require("axios");
var exec = require('child_process').execFile;

var today_day;
var today_month;
var today_weekday;

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  //Get weather and pollution data
  const yesterdayWeather= await getYesterdayWeatherData();
  const todayWeather= await getTodayWeatherData();
  const pollutionData= await getPollutionData();

  //Get dates
  var startDate = new Date();
  var finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + 7);
  const getDaysArray = getDates(startDate, finishDate);

  var inputs=[];
  var inputs=[yesterdayWeather.days[0].precip, yesterdayWeather.days[0].temp, yesterdayWeather.days[0].tempmax, yesterdayWeather.days[0].tempmin, 
  yesterdayWeather.days[0].pressure, yesterdayWeather.days[0].windspeed, yesterdayWeather.days[0].humidity, today_day, today_month, today_weekday, 
  pollutionData.iaqi.pm25.v, pollutionData.iaqi.pm10.v, pollutionData.iaqi.o3.v, pollutionData.iaqi.no2.v, pollutionData.iaqi.so2.v,
  todayWeather.days[0].precip, todayWeather.days[0].temp, todayWeather.days[0].tempmax, todayWeather.days[0].tempmin, 
  todayWeather.days[0].pressure, todayWeather.days[0].windspeed, todayWeather.days[0].humidity];

  //var contaminationPrediction=await calculateOutputs(inputs);
  //console.log(outputs);
  //trainNeuralNetwork();


  //Calculate outputs using the model
  const contaminationPrediction=neuralNetworkModel(yesterdayWeather.days[0].precip, yesterdayWeather.days[0].temp, yesterdayWeather.days[0].tempmax, yesterdayWeather.days[0].tempmin, 
    yesterdayWeather.days[0].pressure, yesterdayWeather.days[0].windspeed, yesterdayWeather.days[0].humidity, today_day, today_month, today_weekday, 
    pollutionData.iaqi.pm25.v, pollutionData.iaqi.pm10.v, pollutionData.iaqi.o3.v, pollutionData.iaqi.no2.v, pollutionData.iaqi.so2.v,
    todayWeather.days[0].precip, todayWeather.days[0].temp, todayWeather.days[0].tempmax, todayWeather.days[0].tempmin, 
    todayWeather.days[0].pressure, todayWeather.days[0].windspeed, todayWeather.days[0].humidity);
	
  res.render('index', { title: "Air contamination forecast", 
  currentTemperature: todayWeather.currentConditions.temp, condition: todayWeather.currentConditions.conditions,
  date0: getDaysArray[0], date1: getDaysArray[1], date2: getDaysArray[2], date3: getDaysArray[3], date4: getDaysArray[4], date5: getDaysArray[5], date6: getDaysArray[6], date7: getDaysArray[7],
  totalAQI: pollutionData.aqi, actualPM25: pollutionData.iaqi.pm25.v, actualPM10: pollutionData.iaqi.pm10.v, actualO3: pollutionData.iaqi.o3.v, actualNO2: pollutionData.iaqi.no2.v, actualSO2: pollutionData.iaqi.so2.v,
  PM25_ahead_1: contaminationPrediction[0], PM10_ahead_1: contaminationPrediction[1], O3_ahead_1: contaminationPrediction[2], NO2_ahead_1: contaminationPrediction[3], SO2_ahead_1: contaminationPrediction[4],
  PM25_ahead_2: contaminationPrediction[5], PM10_ahead_2: contaminationPrediction[6], O3_ahead_2: contaminationPrediction[7], NO2_ahead_2: contaminationPrediction[8], SO2_ahead_2: contaminationPrediction[9],
  PM25_ahead_3: contaminationPrediction[10], PM10_ahead_3: contaminationPrediction[11], O3_ahead_3: contaminationPrediction[12], NO2_ahead_3: contaminationPrediction[13], SO2_ahead_3: contaminationPrediction[14],
  PM25_ahead_4: contaminationPrediction[15], PM10_ahead_4: contaminationPrediction[16], O3_ahead_4: contaminationPrediction[17], NO2_ahead_4: contaminationPrediction[18], SO2_ahead_4: contaminationPrediction[19],
  PM25_ahead_5: contaminationPrediction[20], PM10_ahead_5: contaminationPrediction[21], O3_ahead_5: contaminationPrediction[22], NO2_ahead_5: contaminationPrediction[23], SO2_ahead_5: contaminationPrediction[24],
  PM25_ahead_6: contaminationPrediction[25], PM10_ahead_6: contaminationPrediction[26], O3_ahead_6: contaminationPrediction[27], NO2_ahead_6: contaminationPrediction[28], SO2_ahead_6: contaminationPrediction[29],
  PM25_ahead_7: contaminationPrediction[30], PM10_ahead_7: contaminationPrediction[31], O3_ahead_7: contaminationPrediction[32], NO2_ahead_7: contaminationPrediction[33], SO2_ahead_7: contaminationPrediction[34]
  });
});

async function executeModel(inputs){
	return new Promise((resolve, reject) => {
		exec('exeModel.exe', [0, 20.2, 26.6, 16.3, 1011.9, 36, 43.3, 21, 6, 2, 5, 
	3, 37, 9.2, 3.1, 0, 20.2, 27.9, 12, 1011.9, 36, 37.2],  function(err, data) {  
		console.log(err)                     
	});  
	/*exec('blank.exe', [inputs[0], inputs[1], inputs[2], inputs[3], inputs[4],inputs[5], inputs[6], inputs[7], inputs[8], inputs[9], inputs[10], 
	inputs[11], inputs[12], inputs[13], inputs[14], inputs[15], inputs[16], inputs[17], inputs[18], inputs[19], inputs[20], inputs[21]],  function(err, data) {  
		console.log(err)                     
	});*/
	resolve(); 
	})
}

async function calculateOutputs(inputs){
	await executeModel(inputs);
	var outputs = require("fs").readFileSync("outputs.csv", "utf8")
	outputs = outputs.replace(/(\r\n|\n|\r)/gm, "");
	outputs = outputs.split(";");
	return outputs;
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

function neuralNetworkModel(PRECIPITATIONS_lag_1, TAVG_lag_1, TMAX_lag_1, TMIN_lag_1, PRESSURE_lag_1, WINDSPEED_lag_1, 
  HUMIDITY_lag_1, DAY_lag_0, MONTH_lag_0, WEEKDAY_lag_0, PM25_lag_0, PM10_lag_0, O3_lag_0, NO2_lag_0, SO2_lag_0, 
  PRECIPITATIONS_lag_0, TAVG_lag_0, TMAX_lag_0, TMIN_lag_0, PRESSURE_lag_0, WINDSPEED_lag_0, HUMIDITY_lag_0){

  var inputs=[];
  var outputs=[];

  inputs.push(PRECIPITATIONS_lag_1, TAVG_lag_1, TMAX_lag_1, TMIN_lag_1, PRESSURE_lag_1, WINDSPEED_lag_1, 
    HUMIDITY_lag_1, DAY_lag_0, MONTH_lag_0, WEEKDAY_lag_0, PM25_lag_0, PM10_lag_0, O3_lag_0, NO2_lag_0, SO2_lag_0, 
    PRECIPITATIONS_lag_0, TAVG_lag_0, TMAX_lag_0, TMIN_lag_0, PRESSURE_lag_0, WINDSPEED_lag_0, HUMIDITY_lag_0);  
  
  outputs = scalingLayer(inputs);
	outputs = perceptronLayer1(outputs);
	outputs = perceptronLayer2(outputs);
	outputs = unscalingLayer(outputs);

  return outputs;
}

function scalingLayer(inputs){
  var outputs=[];

  outputs[0] = (inputs[0]-1.077389956)/3.715929985;
	outputs[1] = (inputs[1]-15.34119987)/8.136030197;
	outputs[2] = (inputs[2]-21.96080017)/8.944169998;
	outputs[3] = (inputs[3]-8.99958992)/20.02560043;
	outputs[4] = (inputs[4]-1017.309998)/20.05410004;
	outputs[5] = (inputs[5]-10.55480003)/5.649680138;
	outputs[6] = (inputs[6]-58.62670135)/19.5333004;
	outputs[7] = (inputs[7]-15.70059967)/8.799559593;
	outputs[8] = (inputs[8]-6.37594986)/3.491400003;
	outputs[9] = (inputs[9]-4.002409935)/2.082989931;
	outputs[10] = (inputs[10]-54.4776001)/19.5258007;
	outputs[11] = (inputs[11]-24.53549957)/11.86229992;
	outputs[12] = (inputs[12]-32.79840088)/14.54819965;
	outputs[13] = (inputs[13]-24.17060089)/10.29259968;
	outputs[14] = (inputs[14]-3.113509893)/2.05302;
	outputs[15] = (inputs[15]-1.076429963)/3.717200041;
	outputs[16] = (inputs[16]-15.34659958)/8.135100365;
	outputs[17] = (inputs[17]-21.96769905)/8.94081974;
	outputs[18] = (inputs[18]-9.000029564)/19.94210052;
	outputs[19] = (inputs[19]-1017.309998)/19.97850037;
	outputs[20] = (inputs[20]-10.5539999)/5.63767004;
	outputs[21] = (inputs[21]-58.61009979)/19.52330017;

	return outputs;
}

function perceptronLayer1(inputs){
  var combinations=[];
  var activations=[];

  combinations[0] = -2.02123 +0.0338929*inputs[0] -0.411994*inputs[1] +0.391274*inputs[2] +0.728711*inputs[3] +0.392377*inputs[4] -0.463761*inputs[5] -0.440257*inputs[6] -0.310097*inputs[7] +0.335254*inputs[8] +0.062457*inputs[9] +0.299843*inputs[10] +0.273871*inputs[11] -0.520249*inputs[12] +0.11948*inputs[13] -0.752178*inputs[14] -0.101714*inputs[15] -0.4688*inputs[16] -0.0788592*inputs[17] -0.617514*inputs[18] -1.1142*inputs[19] -0.0650599*inputs[20] +0.157926*inputs[21];
	combinations[1] = 0.492875 -9.10331e-05*inputs[0] -0.0324468*inputs[1] -0.101602*inputs[2] -0.412209*inputs[3] +0.179728*inputs[4] +0.0422834*inputs[5] -0.0176361*inputs[6] -0.0120101*inputs[7] +0.270194*inputs[8] +0.207023*inputs[9] +0.0513616*inputs[10] -0.112572*inputs[11] +0.0851651*inputs[12] -0.4249*inputs[13] +0.128098*inputs[14] -0.00352874*inputs[15] +0.707942*inputs[16] -0.185338*inputs[17] -0.472779*inputs[18] -0.154508*inputs[19] -0.0342609*inputs[20] -0.0974361*inputs[21];
	combinations[2] = 0.430842 -0.754014*inputs[0] +0.648864*inputs[1] +0.674728*inputs[2] -0.449052*inputs[3] +0.734738*inputs[4] -0.0988615*inputs[5] -0.134291*inputs[6] +0.105161*inputs[7] +0.818673*inputs[8] -0.825957*inputs[9] +0.490684*inputs[10] +0.790902*inputs[11] -0.385802*inputs[12] +0.730734*inputs[13] +1.36741*inputs[14] +0.583046*inputs[15] +0.772462*inputs[16] -0.241621*inputs[17] -0.23732*inputs[18] -1.04073*inputs[19] +0.0247589*inputs[20] +0.0469635*inputs[21];
	combinations[3] = -0.848953 +0.179186*inputs[0] -0.176006*inputs[1] +0.162784*inputs[2] -0.234277*inputs[3] +0.512174*inputs[4] -0.742885*inputs[5] -0.132084*inputs[6] -0.193059*inputs[7] +2.2561*inputs[8] +0.094073*inputs[9] +0.177604*inputs[10] +0.0359634*inputs[11] -0.58049*inputs[12] +0.239862*inputs[13] -0.4695*inputs[14] +0.0622808*inputs[15] -1.15508*inputs[16] +0.276045*inputs[17] -0.559359*inputs[18] +0.599823*inputs[19] -0.21457*inputs[20] +0.0127678*inputs[21];
	combinations[4] = 0.415118 +0.00956743*inputs[0] -0.137719*inputs[1] -0.0792056*inputs[2] +0.273453*inputs[3] -0.0460255*inputs[4] -0.0314126*inputs[5] -0.00260653*inputs[6] -0.0122176*inputs[7] +0.0547448*inputs[8] +0.0420766*inputs[9] +0.00591373*inputs[10] +0.085763*inputs[11] -0.124683*inputs[12] +0.118485*inputs[13] -0.682055*inputs[14] -0.0138053*inputs[15] -0.363715*inputs[16] +0.198334*inputs[17] +0.184153*inputs[18] +0.0794382*inputs[19] -0.0206218*inputs[20] -0.0380483*inputs[21];
	combinations[5] = -0.30851 +0.060174*inputs[0] -0.736821*inputs[1] +0.0381199*inputs[2] +0.775626*inputs[3] +0.0406248*inputs[4] +0.0151941*inputs[5] -0.0726788*inputs[6] +0.10613*inputs[7] +0.0435059*inputs[8] +0.918917*inputs[9] -0.000680052*inputs[10] +0.262926*inputs[11] +0.960905*inputs[12] +0.895816*inputs[13] +0.119478*inputs[14] -0.656272*inputs[15] +0.228284*inputs[16] +0.155673*inputs[17] +0.369841*inputs[18] +0.252548*inputs[19] -0.272702*inputs[20] -0.17676*inputs[21];
	combinations[6] = 1.33097 +0.0971543*inputs[0] -0.259203*inputs[1] -0.0335226*inputs[2] -0.250438*inputs[3] -0.254782*inputs[4] -0.106326*inputs[5] +0.193652*inputs[6] -0.00684006*inputs[7] +0.0741473*inputs[8] +0.0590215*inputs[9] -0.353014*inputs[10] +0.214223*inputs[11] -0.802816*inputs[12] +0.0256968*inputs[13] +0.0971361*inputs[14] -0.111882*inputs[15] +0.847823*inputs[16] -0.902162*inputs[17] -0.95025*inputs[18] +0.174837*inputs[19] -0.156633*inputs[20] -0.0966519*inputs[21];
	combinations[7] = -1.53168 -0.319955*inputs[0] +0.0280642*inputs[1] -1.11567*inputs[2] -0.705694*inputs[3] +0.0472933*inputs[4] -0.0795358*inputs[5] +0.187385*inputs[6] +0.117595*inputs[7] +0.368673*inputs[8] +0.341458*inputs[9] +0.860947*inputs[10] -0.263197*inputs[11] -0.845723*inputs[12] -0.502984*inputs[13] -0.197295*inputs[14] +0.0679869*inputs[15] -0.655264*inputs[16] -0.943308*inputs[17] +0.734939*inputs[18] -0.191049*inputs[19] +0.0646869*inputs[20] +0.402303*inputs[21];
	combinations[8] = -0.562577 +0.0140289*inputs[0] +0.407051*inputs[1] -0.339589*inputs[2] -0.518093*inputs[3] -0.21391*inputs[4] +0.0178015*inputs[5] +0.0804048*inputs[6] +0.0560022*inputs[7] +0.0172874*inputs[8] +0.00355931*inputs[9] +0.0707851*inputs[10] +0.744401*inputs[11] -0.00185703*inputs[12] -0.270686*inputs[13] +0.0796156*inputs[14] -0.337567*inputs[15] +0.380639*inputs[16] -0.375547*inputs[17] -0.265739*inputs[18] +0.241685*inputs[19] +0.0274216*inputs[20] -0.00690999*inputs[21];
	combinations[9] = 2.26874 -0.000788276*inputs[0] +0.444053*inputs[1] +0.404976*inputs[2] -0.0418703*inputs[3] -0.539812*inputs[4] -0.0878698*inputs[5] -0.0999681*inputs[6] +0.44595*inputs[7] -0.0244304*inputs[8] -0.469572*inputs[9] -0.0194883*inputs[10] -0.119941*inputs[11] -0.0625266*inputs[12] -0.452739*inputs[13] -0.418219*inputs[14] -0.00636572*inputs[15] +0.306131*inputs[16] +0.250097*inputs[17] +0.202051*inputs[18] -0.900295*inputs[19] -0.156608*inputs[20] -0.332999*inputs[21];

  activations[0] = Math.tanh(combinations[0]);
	activations[1] = Math.tanh(combinations[1]);
	activations[2] = Math.tanh(combinations[2]);
	activations[3] = Math.tanh(combinations[3]);
	activations[4] = Math.tanh(combinations[4]);
	activations[5] = Math.tanh(combinations[5]);
	activations[6] = Math.tanh(combinations[6]);
	activations[7] = Math.tanh(combinations[7]);
	activations[8] = Math.tanh(combinations[8]);
	activations[9] = Math.tanh(combinations[9]);

  return activations;
}

function perceptronLayer2(inputs){
  var outputs=[];

  outputs[0] = 0.96769 +0.279869*inputs[0] -0.412671*inputs[1] +0.232407*inputs[2] +0.0977992*inputs[3] +0.116731*inputs[4] +0.213226*inputs[5] -0.151479*inputs[6] -0.0232102*inputs[7] +1.12721*inputs[8] -0.163324*inputs[9];
	outputs[1] = 0.596161 -0.154287*inputs[0] -0.293931*inputs[1] +0.134578*inputs[2] +0.186548*inputs[3] +0.162356*inputs[4] +0.208505*inputs[5] -0.308397*inputs[6] -0.213127*inputs[7] +0.956293*inputs[8] -0.187132*inputs[9];
	outputs[2] = -0.103605 -0.00466895*inputs[0] +0.242357*inputs[1] -0.0261949*inputs[2] -0.254908*inputs[3] +0.0445601*inputs[4] +0.132919*inputs[5] -0.553429*inputs[6] -0.214923*inputs[7] -0.122888*inputs[8] +0.263453*inputs[9];
	outputs[3] = 0.633331 -0.332578*inputs[0] -1.03081*inputs[1] +0.00279285*inputs[2] +0.510729*inputs[3] -0.186513*inputs[4] +0.320639*inputs[5] -0.107675*inputs[6] -0.134981*inputs[7] -0.200663*inputs[8] -0.28927*inputs[9];
	outputs[4] = 0.6417 -0.213903*inputs[0] -0.0908153*inputs[1] -0.0232336*inputs[2] +0.20852*inputs[3] -1.50341*inputs[4] +0.039286*inputs[5] +0.282915*inputs[6] +0.0275298*inputs[7] +0.229981*inputs[8] -0.357046*inputs[9];
	outputs[5] = 0.751347 -0.0927236*inputs[0] -0.362946*inputs[1] +0.096533*inputs[2] +0.28526*inputs[3] +0.00863145*inputs[4] +0.16444*inputs[5] -0.350254*inputs[6] -0.0795655*inputs[7] +0.772175*inputs[8] -0.282741*inputs[9];
	outputs[6] = 0.484372 -0.319657*inputs[0] -0.0920606*inputs[1] +0.00517271*inputs[2] +0.325871*inputs[3] +0.0514382*inputs[4] +0.149318*inputs[5] -0.499416*inputs[6] -0.189042*inputs[7] +0.596785*inputs[8] -0.290697*inputs[9];
	outputs[7] = -0.0441518 +0.129371*inputs[0] +0.2543*inputs[1] +0.0485011*inputs[2] -0.328509*inputs[3] +0.0992037*inputs[4] +0.0596742*inputs[5] -0.467206*inputs[6] -0.250818*inputs[7] -0.0614275*inputs[8] +0.210164*inputs[9];
	outputs[8] = 0.56031 -0.438342*inputs[0] -0.523209*inputs[1] -0.152455*inputs[2] +0.594758*inputs[3] -0.181362*inputs[4] +0.172872*inputs[5] -0.164124*inputs[6] -0.121192*inputs[7] -0.109463*inputs[8] -0.379682*inputs[9];
	outputs[9] = 0.648804 -0.236839*inputs[0] +0.0751441*inputs[1] -0.0759383*inputs[2] +0.244813*inputs[3] -1.43516*inputs[4] -0.0470345*inputs[5] +0.212339*inputs[6] +0.0424632*inputs[7] +0.244532*inputs[8] -0.384429*inputs[9];
	outputs[10] = 0.612824 -0.275081*inputs[0] -0.14517*inputs[1] -0.0338063*inputs[2] +0.393134*inputs[3] -0.0590654*inputs[4] +0.101806*inputs[5] -0.467208*inputs[6] -0.0761629*inputs[7] +0.552657*inputs[8] -0.354647*inputs[9];
	outputs[11] = 0.300705 -0.386761*inputs[0] +0.219657*inputs[1] -0.0233652*inputs[2] +0.306692*inputs[3] +0.109972*inputs[4] +0.139236*inputs[5] -0.466633*inputs[6] -0.140169*inputs[7] +0.53567*inputs[8] -0.341696*inputs[9];
	outputs[12] = -0.101229 +0.0883752*inputs[0] +0.197703*inputs[1] +0.0505425*inputs[2] -0.344527*inputs[3] +0.0823077*inputs[4] +0.0146735*inputs[5] -0.405012*inputs[6] -0.308941*inputs[7] -0.0117186*inputs[8] +0.211708*inputs[9];
	outputs[13] = 0.424986 -0.373849*inputs[0] -0.0912349*inputs[1] -0.129308*inputs[2] +0.487961*inputs[3] -0.0961299*inputs[4] +0.168859*inputs[5] -0.0787357*inputs[6] -0.00984418*inputs[7] -0.102349*inputs[8] -0.419328*inputs[9];
	outputs[14] = 0.533097 -0.276577*inputs[0] +0.184958*inputs[1] -0.0516257*inputs[2] +0.220255*inputs[3] -1.34479*inputs[4] -0.0642673*inputs[5] +0.229364*inputs[6] +0.0873744*inputs[7] +0.209736*inputs[8] -0.384628*inputs[9];
	outputs[15] = 0.462502 -0.354744*inputs[0] +0.0916269*inputs[1] -0.0694819*inputs[2] +0.431599*inputs[3] -0.00667381*inputs[4] +0.0729328*inputs[5] -0.466928*inputs[6] -0.0767889*inputs[7] +0.445009*inputs[8] -0.430915*inputs[9];
	outputs[16] = 0.196827 -0.487532*inputs[0] +0.406181*inputs[1] -0.0549783*inputs[2] +0.322606*inputs[3] +0.166495*inputs[4] +0.118793*inputs[5] -0.454535*inputs[6] -0.141309*inputs[7] +0.533495*inputs[8] -0.419158*inputs[9];
	outputs[17] = -0.0682455 +0.101216*inputs[0] +0.113329*inputs[1] +0.0516636*inputs[2] -0.350166*inputs[3] +0.0602067*inputs[4] -0.00650541*inputs[5] -0.41271*inputs[6] -0.317063*inputs[7] +0.0157194*inputs[8] +0.247127*inputs[9];
	outputs[18] = 0.332371 -0.386734*inputs[0] +0.144965*inputs[1] -0.14192*inputs[2] +0.444395*inputs[3] +0.00710021*inputs[4] +0.220422*inputs[5] -0.0895097*inputs[6] +0.101072*inputs[7] -0.127611*inputs[8] -0.440902*inputs[9];
	outputs[19] = 0.476077 -0.315775*inputs[0] +0.279661*inputs[1] -0.0539868*inputs[2] +0.220261*inputs[3] -1.27381*inputs[4] -0.0561788*inputs[5] +0.246008*inputs[6] +0.11859*inputs[7] +0.246665*inputs[8] -0.387505*inputs[9];
	outputs[20] = 0.311197 -0.530131*inputs[0] +0.308562*inputs[1] -0.11921*inputs[2] +0.452457*inputs[3] +0.0433208*inputs[4] +0.0631601*inputs[5] -0.465893*inputs[6] -0.0720334*inputs[7] +0.466857*inputs[8] -0.487175*inputs[9];
	outputs[21] = 0.125144 -0.709962*inputs[0] +0.275951*inputs[1] -0.0666649*inputs[2] +0.370794*inputs[3] +0.179683*inputs[4] -0.0223315*inputs[5] -0.565036*inputs[6] -0.183021*inputs[7] +0.558563*inputs[8] -0.40082*inputs[9];
	outputs[22] = -0.135176 +0.0867198*inputs[0] +0.141278*inputs[1] +0.055838*inputs[2] -0.377102*inputs[3] +0.0477032*inputs[4] +0.0736793*inputs[5] -0.368953*inputs[6] -0.258769*inputs[7] -0.00855712*inputs[8] +0.283299*inputs[9];
	outputs[23] = 0.436387 -0.390277*inputs[0] -0.0266522*inputs[1] -0.100109*inputs[2] +0.501816*inputs[3] -0.0431542*inputs[4] +0.0458818*inputs[5] -0.187641*inputs[6] +0.0334009*inputs[7] -0.122079*inputs[8] -0.42973*inputs[9];
	outputs[24] = 0.529133 -0.332683*inputs[0] +0.218461*inputs[1] -0.0555196*inputs[2] +0.259335*inputs[3] -1.24656*inputs[4] -0.141074*inputs[5] +0.175652*inputs[6] +0.0896225*inputs[7] +0.257166*inputs[8] -0.390713*inputs[9];
	outputs[25] = 0.262566 -0.633901*inputs[0] +0.272133*inputs[1] -0.150627*inputs[2] +0.468425*inputs[3] +0.0587128*inputs[4] -0.0475191*inputs[5] -0.481957*inputs[6] -0.128334*inputs[7] +0.512056*inputs[8] -0.493107*inputs[9];
	outputs[26] = 0.186205 -0.774641*inputs[0] +0.0370339*inputs[1] -0.0393552*inputs[2] +0.440435*inputs[3] +0.111924*inputs[4] -0.199175*inputs[5] -0.663026*inputs[6] -0.238327*inputs[7] +0.581996*inputs[8] -0.333206*inputs[9];
	outputs[27] = -0.221902 +0.0977886*inputs[0] +0.290483*inputs[1] +0.0801369*inputs[2] -0.435497*inputs[3] +0.128794*inputs[4] +0.112856*inputs[5] -0.292404*inputs[6] -0.230602*inputs[7] -0.00394454*inputs[8] +0.2408*inputs[9];
	outputs[28] = 0.570096 -0.409022*inputs[0] -0.469899*inputs[1] -0.00377324*inputs[2] +0.569282*inputs[3] -0.10191*inputs[4] -0.206366*inputs[5] -0.292181*inputs[6] -0.0747497*inputs[7] -0.0625529*inputs[8] -0.298836*inputs[9];
	outputs[29] = 0.589352 -0.252871*inputs[0] +0.105941*inputs[1] +0.00314619*inputs[2] +0.246429*inputs[3] -1.23842*inputs[4] -0.196854*inputs[5] +0.174178*inputs[6] +0.0821726*inputs[7] +0.216*inputs[8] -0.359011*inputs[9];
	outputs[30] = 0.303663 -0.652729*inputs[0] +0.0780449*inputs[1] -0.122216*inputs[2] +0.535273*inputs[3] -0.00240566*inputs[4] -0.16876*inputs[5] -0.567207*inputs[6] -0.170926*inputs[7] +0.469881*inputs[8] -0.428561*inputs[9];
	outputs[31] = 0.155161 -0.730179*inputs[0] -0.0397704*inputs[1] -0.000705431*inputs[2] +0.433752*inputs[3] +0.11534*inputs[4] -0.243814*inputs[5] -0.648561*inputs[6] -0.274306*inputs[7] +0.468207*inputs[8] -0.299346*inputs[9];
	outputs[32] = -0.253668 +0.0553226*inputs[0] +0.27021*inputs[1] +0.10781*inputs[2] -0.472666*inputs[3] +0.160711*inputs[4] +0.136042*inputs[5] -0.268529*inputs[6] -0.209316*inputs[7] +0.0312257*inputs[8] +0.227294*inputs[9];
	outputs[33] = 0.491955 -0.406924*inputs[0] -0.532375*inputs[1] +0.0343631*inputs[2] +0.528349*inputs[3] -0.0774815*inputs[4] -0.160527*inputs[5] -0.19966*inputs[6] -0.0968171*inputs[7] -0.0367916*inputs[8] -0.26042*inputs[9];
	outputs[34] = 0.629882 -0.123032*inputs[0] +0.125966*inputs[1] -0.00825328*inputs[2] +0.222614*inputs[3] -1.25002*inputs[4] -0.148869*inputs[5] +0.254173*inputs[6] +0.0746073*inputs[7] +0.2139*inputs[8] -0.313356*inputs[9];

  return outputs;
}

function unscalingLayer(inputs){
  var outputs=[];

  outputs[0] = inputs[0]*19.52759933+54.4776001;
	outputs[1] = inputs[1]*11.87460041+24.55200005;
	outputs[2] = inputs[2]*14.55049992+32.80049896;
	outputs[3] = inputs[3]*10.29640007+24.1651001;
	outputs[4] = inputs[4]*2.054069996+3.114650011;
	outputs[5] = inputs[5]*19.52370071+54.47969818;
	outputs[6] = inputs[6]*11.87110043+24.55620003;
	outputs[7] = inputs[7]*14.54959965+32.80220032;
	outputs[8] = inputs[8]*10.29710007+24.1644001;
	outputs[9] = inputs[9]*2.052639961+3.114340067;
	outputs[10] = inputs[10]*19.51399994+54.48970032;
	outputs[11] = inputs[11]*11.86979961+24.55820084;
	outputs[12] = inputs[12]*14.55060005+32.81190109;
	outputs[13] = inputs[13]*10.2968998+24.16399956;
	outputs[14] = inputs[14]*2.052340031+3.112849951;
	outputs[15] = inputs[15]*19.50919914+54.49829865;
	outputs[16] = inputs[16]*11.87170029+24.56100082;
	outputs[17] = inputs[17]*14.54959965+32.82080078;
	outputs[18] = inputs[18]*10.29640007+24.1637001;
	outputs[19] = inputs[19]*2.052580118+3.112679958;
	outputs[20] = inputs[20]*19.50880051+54.50899887;
	outputs[21] = inputs[21]*11.87450027+24.56340027;
	outputs[22] = inputs[22]*14.54629993+32.82939911;
	outputs[23] = inputs[23]*10.29660034+24.15920067;
	outputs[24] = inputs[24]*2.052680016+3.112339973;
	outputs[25] = inputs[25]*19.49950027+54.50899887;
	outputs[26] = inputs[26]*11.87899971+24.56480026;
	outputs[27] = inputs[27]*14.54370022+32.84460068;
	outputs[28] = inputs[28]*10.29440022+24.15640068;
	outputs[29] = inputs[29]*2.05208993+3.110960007;
	outputs[30] = inputs[30]*19.50029945+54.50550079;
	outputs[31] = inputs[31]*11.87959957+24.56620026;
	outputs[32] = inputs[32]*14.5333004+32.84840012;
	outputs[33] = inputs[33]*10.28880024+24.14299965;
	outputs[34] = inputs[34]*2.049269915+3.108550072;

	return outputs;
}

module.exports = router;