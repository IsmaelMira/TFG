// Artificial Intelligence Techniques SL	
// artelnics@artelnics.com	
// 
// Your model has been exported to this file.
// You can manage it with the 'neural network' method.	
// Example:
// 
// 	vector<float> sample(n);	
// 	sample[0] = 1;	
// 	sample[1] = 2;	
// 	sample[n] = 10;	
// 	vector<float> outputs = neural_network(sample);
// 
// Notice that only one sample is allowed as input. DataSetBatch of inputs are not yet implement,	
// however you can loop through neural network function to get multiple outputs.	

#include <vector>

using namespace std;

vector<float> scaling_layer(const vector<float>& inputs)
{
	vector<float> outputs(22);

	outputs[0] = (inputs[0]-1.074939966)/3.714220047;
	outputs[1] = (inputs[1]-15.34309959)/8.136810303;
	outputs[2] = (inputs[2]-21.96590042)/8.941390038;
	outputs[3] = (inputs[3]-8.650710106)/6.915160179;
	outputs[4] = (inputs[4]-1017.659973)/7.241010189;
	outputs[5] = (inputs[5]-10.52610016)/5.435560226;
	outputs[6] = (inputs[6]-58.64630127)/19.50839996;
	outputs[7] = (inputs[7]-15.70559978)/8.796839714;
	outputs[8] = (inputs[8]-6.37677002)/3.491719961;
	outputs[9] = (inputs[9]-3.991379976)/1.996790051;
	outputs[10] = (inputs[10]-54.49160004)/19.51469994;
	outputs[11] = (inputs[11]-24.5359993)/11.86429977;
	outputs[12] = (inputs[12]-32.80110168)/14.55000019;
	outputs[13] = (inputs[13]-24.17860031)/10.28530025;
	outputs[14] = (inputs[14]-3.112720013)/2.052930117;
	outputs[15] = (inputs[15]-1.073040009)/3.713360071;
	outputs[16] = (inputs[16]-15.34749985)/8.136360168;
	outputs[17] = (inputs[17]-21.9720993)/8.939259529;
	outputs[18] = (inputs[18]-8.652810097)/6.915589809;
	outputs[19] = (inputs[19]-1017.659973)/7.242730141;
	outputs[20] = (inputs[20]-10.52620029)/5.435550213;
	outputs[21] = (inputs[21]-58.62919998)/19.4993;

	return outputs;
}

vector<float> perceptron_layer_1(const vector<float>& inputs)
{
	vector<float> combinations(10);

	combinations[0] = -0.346637 -0.0441849*inputs[0] +1.05292*inputs[1] -0.831433*inputs[2] -0.626594*inputs[3] +0.107856*inputs[4] +0.0125538*inputs[5] -0.103813*inputs[6] +0.154938*inputs[7] +1.24721*inputs[8] -0.143869*inputs[9] -0.177797*inputs[10] -0.0521652*inputs[11] +0.145478*inputs[12] -0.48542*inputs[13] +1.18975*inputs[14] -0.0156739*inputs[15] +1.21353*inputs[16] -1.05205*inputs[17] -0.273978*inputs[18] -0.241094*inputs[19] -0.169633*inputs[20] +0.0527748*inputs[21];
	combinations[1] = 0.0425986 +0.00343028*inputs[0] -0.196673*inputs[1] +0.129786*inputs[2] -0.00632853*inputs[3] -0.0749024*inputs[4] +0.00806534*inputs[5] -0.00650671*inputs[6] +0.0632948*inputs[7] +0.0111115*inputs[8] +0.0336547*inputs[9] +0.05322*inputs[10] +0.0628366*inputs[11] +0.361727*inputs[12] -0.33123*inputs[13] +0.29585*inputs[14] +0.00427932*inputs[15] +0.373282*inputs[16] -0.0189687*inputs[17] -0.118783*inputs[18] +0.0466251*inputs[19] +0.0718744*inputs[20] -0.0225012*inputs[21];
	combinations[2] = 0.246285 -0.0365745*inputs[0] +0.284916*inputs[1] -0.342186*inputs[2] -0.24604*inputs[3] -0.142189*inputs[4] -0.0356778*inputs[5] -0.00110732*inputs[6] +0.295999*inputs[7] +0.286897*inputs[8] +0.0654988*inputs[9] +0.0797368*inputs[10] +0.564487*inputs[11] +0.12958*inputs[12] -0.11137*inputs[13] -0.474527*inputs[14] -0.00976152*inputs[15] +0.332489*inputs[16] -0.111639*inputs[17] -0.356498*inputs[18] -0.0182123*inputs[19] +0.0908593*inputs[20] +0.111337*inputs[21];
	combinations[3] = 0.634233 +0.0232833*inputs[0] -0.817331*inputs[1] +0.253038*inputs[2] +0.282561*inputs[3] -0.130065*inputs[4] -0.0255798*inputs[5] -0.0280793*inputs[6] +0.0399491*inputs[7] -0.131321*inputs[8] +0.373385*inputs[9] +0.0389286*inputs[10] -0.133932*inputs[11] +0.127419*inputs[12] +0.00765754*inputs[13] +0.0496958*inputs[14] +0.0198496*inputs[15] -0.104173*inputs[16] +0.360696*inputs[17] +0.0647542*inputs[18] +0.0537974*inputs[19] +0.0104921*inputs[20] -0.0650983*inputs[21];
	combinations[4] = 0.0103413 +0.0186729*inputs[0] -0.237878*inputs[1] +0.102495*inputs[2] +0.0696742*inputs[3] -0.103967*inputs[4] -0.0278385*inputs[5] -0.0201828*inputs[6] +0.0490018*inputs[7] +0.0173524*inputs[8] +0.143964*inputs[9] +0.0394173*inputs[10] +0.10306*inputs[11] +0.158129*inputs[12] +0.118696*inputs[13] +0.112769*inputs[14] +0.00734638*inputs[15] -0.17127*inputs[16] +0.22555*inputs[17] +0.0660015*inputs[18] +0.0764167*inputs[19] +0.00563322*inputs[20] -0.0220356*inputs[21];
	combinations[5] = 4.70904 +0.0553398*inputs[0] +0.3469*inputs[1] -0.493825*inputs[2] +0.939083*inputs[3] -0.177738*inputs[4] -0.182096*inputs[5] -0.674914*inputs[6] +0.0950511*inputs[7] -0.731387*inputs[8] -0.221718*inputs[9] +0.202811*inputs[10] +0.207156*inputs[11] -0.0479088*inputs[12] -0.551825*inputs[13] -0.690397*inputs[14] +0.315262*inputs[15] +1.77664*inputs[16] +0.297884*inputs[17] -0.0896825*inputs[18] -0.565442*inputs[19] -0.0895788*inputs[20] -0.723777*inputs[21];
	combinations[6] = -0.373749 +0.00642064*inputs[0] +1.89088*inputs[1] -1.01489*inputs[2] -1.03759*inputs[3] -0.104676*inputs[4] +0.0461583*inputs[5] +0.0546048*inputs[6] +0.420407*inputs[7] +0.849822*inputs[8] -0.183607*inputs[9] -0.0959196*inputs[10] -0.177751*inputs[11] +0.257162*inputs[12] -0.190973*inputs[13] +0.586336*inputs[14] +0.0132492*inputs[15] +1.14248*inputs[16] -0.855701*inputs[17] -0.486636*inputs[18] -0.10482*inputs[19] -0.0225176*inputs[20] +0.0601152*inputs[21];
	combinations[7] = 0.00291251 +0.0846519*inputs[0] +0.0080739*inputs[1] +0.34674*inputs[2] -0.0838019*inputs[3] -0.038851*inputs[4] -0.0261845*inputs[5] +0.00991936*inputs[6] -0.0392795*inputs[7] +0.180076*inputs[8] +0.0282114*inputs[9] -0.0582974*inputs[10] -0.893278*inputs[11] -0.0243617*inputs[12] +0.542637*inputs[13] +0.205699*inputs[14] +0.0309974*inputs[15] -0.625391*inputs[16] +0.341046*inputs[17] +0.214731*inputs[18] +0.110719*inputs[19] -0.114876*inputs[20] -0.0760541*inputs[21];
	combinations[8] = 0.440711 +0.0203499*inputs[0] +0.128834*inputs[1] -0.0951416*inputs[2] +0.0528857*inputs[3] +0.00403846*inputs[4] -0.0259612*inputs[5] -0.0507026*inputs[6] -0.0209599*inputs[7] +0.17338*inputs[8] -0.0277537*inputs[9] -0.0490982*inputs[10] -0.00209834*inputs[11] +0.0199502*inputs[12] +0.160181*inputs[13] -0.396723*inputs[14] +0.00162496*inputs[15] -0.298693*inputs[16] +0.205586*inputs[17] +0.0987165*inputs[18] -0.0328049*inputs[19] -0.0877363*inputs[20] -0.080501*inputs[21];
	combinations[9] = -0.0985322 +0.0284023*inputs[0] +0.335518*inputs[1] +0.192009*inputs[2] -0.535832*inputs[3] -0.168389*inputs[4] -0.393743*inputs[5] +0.0210615*inputs[6] +0.181233*inputs[7] +2.11379*inputs[8] +0.0140374*inputs[9] +0.229176*inputs[10] +0.245178*inputs[11] +0.337717*inputs[12] -0.102571*inputs[13] -0.40904*inputs[14] -0.0076523*inputs[15] -0.494657*inputs[16] -0.10198*inputs[17] -0.669617*inputs[18] +0.475586*inputs[19] -0.00418163*inputs[20] +0.16812*inputs[21];

	vector<float> activations(10);

	activations[0] = tanh(combinations[0]);
	activations[1] = tanh(combinations[1]);
	activations[2] = tanh(combinations[2]);
	activations[3] = tanh(combinations[3]);
	activations[4] = tanh(combinations[4]);
	activations[5] = tanh(combinations[5]);
	activations[6] = tanh(combinations[6]);
	activations[7] = tanh(combinations[7]);
	activations[8] = tanh(combinations[8]);
	activations[9] = tanh(combinations[9]);

	return activations;
}

vector<float> perceptron_layer_2(const vector<float>& inputs)
{
	vector<float> combinations(35);

	combinations[0] = 0.621401 +0.192234*inputs[0] -0.556372*inputs[1] +0.0639733*inputs[2] -1.21128*inputs[3] +2.37786*inputs[4] -0.136409*inputs[5] -0.296417*inputs[6] -0.590384*inputs[7] -0.127255*inputs[8] +0.00993221*inputs[9];
	combinations[1] = 0.574554 -0.31874*inputs[0] -0.318262*inputs[1] -0.624989*inputs[2] -0.883731*inputs[3] +2.19861*inputs[4] -0.1707*inputs[5] +0.267933*inputs[6] -0.886003*inputs[7] +0.287651*inputs[8] +0.228101*inputs[9];
	combinations[2] = -0.360303 -0.199449*inputs[0] +1.23849*inputs[1] +0.037612*inputs[2] -0.119401*inputs[3] +0.150788*inputs[4] +0.0911803*inputs[5] +0.0465003*inputs[6] +0.211039*inputs[7] +0.77993*inputs[8] -0.202606*inputs[9];
	combinations[3] = 0.710379 -0.451323*inputs[0] -0.879527*inputs[1] -0.415494*inputs[2] -0.676561*inputs[3] +1.69033*inputs[4] -0.130368*inputs[5] +0.428789*inputs[6] +0.115844*inputs[7] -0.123278*inputs[8] +0.147464*inputs[9];
	combinations[4] = 0.983458 +0.256724*inputs[0] -0.138763*inputs[1] -0.557245*inputs[2] -0.455019*inputs[3] +1.17076*inputs[4] -0.119359*inputs[5] +0.16872*inputs[6] -0.0886412*inputs[7] -1.216*inputs[8] +0.0217616*inputs[9];
	combinations[5] = 0.596076 -0.214757*inputs[0] -0.419049*inputs[1] -0.451094*inputs[2] -0.749979*inputs[3] +1.89671*inputs[4] -0.348603*inputs[5] +0.259471*inputs[6] -0.707736*inputs[7] +0.195706*inputs[8] +0.161648*inputs[9];
	combinations[6] = 0.5086 -0.654099*inputs[0] +0.0487039*inputs[1] -0.963192*inputs[2] -0.293345*inputs[3] +1.47046*inputs[4] -0.38574*inputs[5] +0.605389*inputs[6] -0.920651*inputs[7] +0.439396*inputs[8] +0.499093*inputs[9];
	combinations[7] = -0.317745 -0.182006*inputs[0] +0.999882*inputs[1] -0.116722*inputs[2] -0.230452*inputs[3] +0.291896*inputs[4] +0.12168*inputs[5] +0.117173*inputs[6] +0.0513359*inputs[7] +0.855907*inputs[8] -0.279133*inputs[9];
	combinations[8] = 0.643958 -0.584107*inputs[0] -0.59263*inputs[1] -0.747544*inputs[2] +0.067545*inputs[3] +0.807892*inputs[4] -0.321284*inputs[5] +0.635223*inputs[6] -0.268033*inputs[7] -0.0120055*inputs[8] +0.444454*inputs[9];
	combinations[9] = 0.937465 +0.245419*inputs[0] -0.0719921*inputs[1] -0.593464*inputs[2] -0.20446*inputs[3] +0.76503*inputs[4] -0.190208*inputs[5] +0.230683*inputs[6] -0.208161*inputs[7] -1.10041*inputs[8] +0.0827217*inputs[9];
	combinations[10] = 0.561255 -0.531964*inputs[0] -0.128872*inputs[1] -0.80465*inputs[2] -0.254486*inputs[3] +1.24572*inputs[4] -0.492209*inputs[5] +0.614593*inputs[6] -0.801821*inputs[7] +0.323767*inputs[8] +0.424522*inputs[9];
	combinations[11] = 0.337495 -0.754933*inputs[0] -0.0284598*inputs[1] -1.28882*inputs[2] +0.367507*inputs[3] +1.09017*inputs[4] -0.513718*inputs[5] +0.905888*inputs[6] -1.22209*inputs[7] +0.704578*inputs[8] +0.60246*inputs[9];
	combinations[12] = -0.246985 -0.20562*inputs[0] +0.967297*inputs[1] -0.144635*inputs[2] -0.432998*inputs[3] +0.391225*inputs[4] +0.157563*inputs[5] +0.113299*inputs[6] +0.0792008*inputs[7] +0.823203*inputs[8] -0.312071*inputs[9];
	combinations[13] = 0.388416 -0.436414*inputs[0] -0.687686*inputs[1] -0.893869*inputs[2] +0.78024*inputs[3] +0.441459*inputs[4] -0.393272*inputs[5] +0.619344*inputs[6] -0.551113*inputs[7] +0.182257*inputs[8] +0.520881*inputs[9];
	combinations[14] = 0.850979 +0.269956*inputs[0] -0.140283*inputs[1] -0.666314*inputs[2] +0.0532611*inputs[3] +0.6082*inputs[4] -0.22579*inputs[5] +0.292643*inputs[6] -0.33787*inputs[7] -0.958673*inputs[8] +0.100306*inputs[9];
	combinations[15] = 0.426892 -0.624961*inputs[0] -0.131273*inputs[1] -1.07876*inputs[2] +0.294481*inputs[3] +0.838994*inputs[4] -0.590085*inputs[5] +0.825932*inputs[6] -1.01234*inputs[7] +0.533915*inputs[8] +0.558071*inputs[9];
	combinations[16] = 0.228357 -0.811423*inputs[0] -0.136295*inputs[1] -1.47461*inputs[2] +0.790793*inputs[3] +0.883481*inputs[4] -0.588856*inputs[5] +1.07062*inputs[6] -1.42603*inputs[7] +0.850904*inputs[8] +0.65934*inputs[9];
	combinations[17] = -0.23151 -0.15058*inputs[0] +0.975191*inputs[1] -0.039091*inputs[2] -0.560525*inputs[3] +0.399828*inputs[4] +0.191717*inputs[5] +0.0256637*inputs[6] +0.145112*inputs[7] +0.751457*inputs[8] -0.374579*inputs[9];
	combinations[18] = 0.161073 -0.354467*inputs[0] -0.786546*inputs[1] -0.923316*inputs[2] +1.3551*inputs[3] +0.248445*inputs[4] -0.439833*inputs[5] +0.588365*inputs[6] -0.695834*inputs[7] +0.256511*inputs[8] +0.583001*inputs[9];
	combinations[19] = 0.774495 +0.275345*inputs[0] -0.185833*inputs[1] -0.726143*inputs[2] +0.269387*inputs[3] +0.498452*inputs[4] -0.237878*inputs[5] +0.333431*inputs[6] -0.45232*inputs[7] -0.893044*inputs[8] +0.145963*inputs[9];
	combinations[20] = 0.337341 -0.704011*inputs[0] -0.245545*inputs[1] -1.28915*inputs[2] +0.721962*inputs[3] +0.665515*inputs[4] -0.661799*inputs[5] +1.05447*inputs[6] -1.26092*inputs[7] +0.672889*inputs[8] +0.625224*inputs[9];
	combinations[21] = 0.297083 -0.919708*inputs[0] -0.145216*inputs[1] -1.56004*inputs[2] +0.722447*inputs[3] +0.732313*inputs[4] -0.619502*inputs[5] +1.26076*inputs[6] -1.48086*inputs[7] +0.953213*inputs[8] +0.630386*inputs[9];
	combinations[22] = -0.293921 -0.163849*inputs[0] +0.913626*inputs[1] -0.0992459*inputs[2] -0.405816*inputs[3] +0.437979*inputs[4] +0.215232*inputs[5] +0.0559462*inputs[6] +0.116367*inputs[7] +0.727201*inputs[8] -0.340746*inputs[9];
	combinations[23] = 0.352617 -0.448585*inputs[0] -0.724612*inputs[1] -0.977666*inputs[2] +1.00365*inputs[3] +0.155626*inputs[4] -0.430691*inputs[5] +0.729415*inputs[6] -0.721822*inputs[7] +0.288136*inputs[8] +0.559195*inputs[9];
	combinations[24] = 0.862917 +0.247276*inputs[0] -0.112622*inputs[1] -0.713438*inputs[2] +0.122981*inputs[3] +0.367126*inputs[4] -0.251008*inputs[5] +0.342287*inputs[6] -0.446207*inputs[7] -0.876249*inputs[8] +0.160066*inputs[9];
	combinations[25] = 0.322364 -0.80268*inputs[0] -0.329738*inputs[1] -1.4211*inputs[2] +0.821442*inputs[3] +0.543896*inputs[4] -0.68148*inputs[5] +1.25075*inputs[6] -1.37333*inputs[7] +0.791143*inputs[8] +0.617086*inputs[9];
	combinations[26] = 0.548947 -1.01458*inputs[0] -0.0481566*inputs[1] -1.55956*inputs[2] +0.148794*inputs[3] +0.617321*inputs[4] -0.56842*inputs[5] +1.39396*inputs[6] -1.44146*inputs[7] +0.948628*inputs[8] +0.570128*inputs[9];
	combinations[27] = -0.375643 -0.0996491*inputs[0] +0.888047*inputs[1] -0.0528825*inputs[2] -0.206753*inputs[3] +0.411609*inputs[4] +0.177252*inputs[5] -0.0382841*inputs[6] +0.107866*inputs[7] +0.718912*inputs[8] -0.341559*inputs[9];
	combinations[28] = 0.80778 -0.552607*inputs[0] -0.579393*inputs[1] -0.966037*inputs[2] -0.115016*inputs[3] +0.170879*inputs[4] -0.341568*inputs[5] +0.842093*inputs[6] -0.595914*inputs[7] +0.269539*inputs[8] +0.42853*inputs[9];
	combinations[29] = 1.00726 +0.25276*inputs[0] -0.0165742*inputs[1] -0.582816*inputs[2] -0.284129*inputs[3] +0.333693*inputs[4] -0.190081*inputs[5] +0.274097*inputs[6] -0.297165*inputs[7] -0.954085*inputs[8] +0.130467*inputs[9];
	combinations[30] = 0.503006 -0.918922*inputs[0] -0.349506*inputs[1] -1.53322*inputs[2] +0.44735*inputs[3] +0.50914*inputs[4] -0.644058*inputs[5] +1.43648*inputs[6] -1.41581*inputs[7] +0.842555*inputs[8] +0.577331*inputs[9];
	combinations[31] = 0.600378 -1.02741*inputs[0] -0.050134*inputs[1] -1.59333*inputs[2] -0.0776184*inputs[3] +0.595686*inputs[4] -0.482043*inputs[5] +1.4004*inputs[6] -1.38056*inputs[7] +0.949357*inputs[8] +0.553891*inputs[9];
	combinations[32] = -0.387516 -0.070843*inputs[0] +0.841296*inputs[1] +0.0362966*inputs[2] -0.177361*inputs[3] +0.447524*inputs[4] +0.16901*inputs[5] -0.0537989*inputs[6] +0.103507*inputs[7] +0.664109*inputs[8] -0.39072*inputs[9];
	combinations[33] = 0.834291 -0.569296*inputs[0] -0.686698*inputs[1] -0.950588*inputs[2] -0.393605*inputs[3] +0.426888*inputs[4] -0.212806*inputs[5] +0.878678*inputs[6] -0.522014*inputs[7] +0.25014*inputs[8] +0.366697*inputs[9];
	combinations[34] = 0.984376 +0.323755*inputs[0] -0.0435371*inputs[1] -0.50982*inputs[2] -0.326851*inputs[3] +0.418442*inputs[4] -0.153067*inputs[5] +0.20021*inputs[6] -0.223065*inputs[7] -0.966197*inputs[8] +0.0972789*inputs[9];

	vector<float> activations(35);

	activations[0] = combinations[0];
	activations[1] = combinations[1];
	activations[2] = combinations[2];
	activations[3] = combinations[3];
	activations[4] = combinations[4];
	activations[5] = combinations[5];
	activations[6] = combinations[6];
	activations[7] = combinations[7];
	activations[8] = combinations[8];
	activations[9] = combinations[9];
	activations[10] = combinations[10];
	activations[11] = combinations[11];
	activations[12] = combinations[12];
	activations[13] = combinations[13];
	activations[14] = combinations[14];
	activations[15] = combinations[15];
	activations[16] = combinations[16];
	activations[17] = combinations[17];
	activations[18] = combinations[18];
	activations[19] = combinations[19];
	activations[20] = combinations[20];
	activations[21] = combinations[21];
	activations[22] = combinations[22];
	activations[23] = combinations[23];
	activations[24] = combinations[24];
	activations[25] = combinations[25];
	activations[26] = combinations[26];
	activations[27] = combinations[27];
	activations[28] = combinations[28];
	activations[29] = combinations[29];
	activations[30] = combinations[30];
	activations[31] = combinations[31];
	activations[32] = combinations[32];
	activations[33] = combinations[33];
	activations[34] = combinations[34];

	return activations;
}

vector<float> unscaling_layer(const vector<float>& inputs)
{
	vector<float> outputs(35);

	outputs[0] = inputs[0]*19.51350021+54.49290085;
	outputs[1] = inputs[1]*11.87619972+24.55019951;
	outputs[2] = inputs[2]*14.54930019+32.80659866;
	outputs[3] = inputs[3]*10.28919983+24.17300034;
	outputs[4] = inputs[4]*2.052659988+3.113059998;
	outputs[5] = inputs[5]*19.51329994+54.49330139;
	outputs[6] = inputs[6]*11.87320042+24.5557003;
	outputs[7] = inputs[7]*14.54920006+32.80770111;
	outputs[8] = inputs[8]*10.28989983+24.17239952;
	outputs[9] = inputs[9]*2.052390099+3.113409996;
	outputs[10] = inputs[10]*19.50620079+54.50189972;
	outputs[11] = inputs[11]*11.87180042+24.55879974;
	outputs[12] = inputs[12]*14.55169964+32.81560135;
	outputs[13] = inputs[13]*10.29039955+24.17169952;
	outputs[14] = inputs[14]*2.05211997+3.113749981;
	outputs[15] = inputs[15]*19.50329971+54.5094986;
	outputs[16] = inputs[16]*11.87269974+24.56389999;
	outputs[17] = inputs[17]*14.55179977+32.82249832;
	outputs[18] = inputs[18]*10.29059982+24.17099953;
	outputs[19] = inputs[19]*2.05211997+3.113749981;
	outputs[20] = inputs[20]*19.50449944+54.51910019;
	outputs[21] = inputs[21]*11.87390041+24.56809998;
	outputs[22] = inputs[22]*14.54880047+32.83010101;
	outputs[23] = inputs[23]*10.29290009+24.16550064;
	outputs[24] = inputs[24]*2.052220106+3.113409996;
	outputs[25] = inputs[25]*19.50020027+54.51499939;
	outputs[26] = inputs[26]*11.87549973+24.57150078;
	outputs[27] = inputs[27]*14.54349995+32.83940125;
	outputs[28] = inputs[28]*10.29240036+24.1616993;
	outputs[29] = inputs[29]*2.05163002+3.112030029;
	outputs[30] = inputs[30]*19.49920082+54.51330185;
	outputs[31] = inputs[31]*11.8767004+24.57259941;
	outputs[32] = inputs[32]*14.53520012+32.84590149;
	outputs[33] = inputs[33]*10.28719997+24.14789963;
	outputs[34] = inputs[34]*2.048810005+3.109620094;

	return outputs;
}

vector<float> bounding_layer(const vector<float>& inputs)
{
	vector<float> outputs(35);

	outputs[0] = inputs[0];
	outputs[1] = inputs[1];
	outputs[2] = inputs[2];
	outputs[3] = inputs[3];
	outputs[4] = inputs[4];
	outputs[5] = inputs[5];
	outputs[6] = inputs[6];
	outputs[7] = inputs[7];
	outputs[8] = inputs[8];
	outputs[9] = inputs[9];
	outputs[10] = inputs[10];
	outputs[11] = inputs[11];
	outputs[12] = inputs[12];
	outputs[13] = inputs[13];
	outputs[14] = inputs[14];
	outputs[15] = inputs[15];
	outputs[16] = inputs[16];
	outputs[17] = inputs[17];
	outputs[18] = inputs[18];
	outputs[19] = inputs[19];
	outputs[20] = inputs[20];
	outputs[21] = inputs[21];
	outputs[22] = inputs[22];
	outputs[23] = inputs[23];
	outputs[24] = inputs[24];
	outputs[25] = inputs[25];
	outputs[26] = inputs[26];
	outputs[27] = inputs[27];
	outputs[28] = inputs[28];
	outputs[29] = inputs[29];
	outputs[30] = inputs[30];
	outputs[31] = inputs[31];
	outputs[32] = inputs[32];
	outputs[33] = inputs[33];
	outputs[34] = inputs[34];

	return outputs;
}

vector<float> neural_network(const vector<float>& inputs)
{
	vector<float> outputs;

	outputs = scaling_layer(inputs);
	outputs = perceptron_layer_1(outputs);
	outputs = perceptron_layer_2(outputs);
	outputs = unscaling_layer(outputs);
	outputs = bounding_layer(outputs);

	return outputs;
}
int main(){
	vector<float> sample(21);	
	sample[0] = 0;	
	sample[1] = 20.2;	
	sample[2] = 26.6;
	sample[3] = 16.3;
	sample[4] = 1011.9;
	sample[5] = 36;
	sample[6] = 43.3;
	sample[7] = 21;
	sample[8] = 6;
	sample[9] = 2;
	sample[10] = 5;
	sample[11] = 3;
	sample[12] = 37;
	sample[13] = 9.2;
	sample[14] = 3.1;
	sample[15] = 0;
	sample[16] = 20.2;
	sample[17] = 27.9;
	sample[18] = 12;
	sample[19] = 1011.9;
	sample[20] = 36;
	sample[21] = 37.2;

	vector<float> outputs = neural_network(sample);
	
	

	return 0;}
