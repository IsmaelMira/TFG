#include <vector>
#include <math.h>

using namespace std;

vector<float> scalingLayer(const vector<float>& inputs)
{
	vector<float> outputs(15);

	outputs[0] = (inputs[0]-15.72999954)/8.804389954;
	outputs[1] = (inputs[1]-6.373929977)/3.488679886;
	outputs[2] = (inputs[2]-3.992089987)/1.996799946;
	outputs[3] = (inputs[3]-54.49259949)/19.50250053;
	outputs[4] = (inputs[4]-24.55690002)/11.86979961;
	outputs[5] = (inputs[5]-32.81600189)/14.54039955;
	outputs[6] = (inputs[6]-24.15929985)/10.28509998;
	outputs[7] = (inputs[7]-3.110419989)/2.051429987;
	outputs[8] = (inputs[8]-1.070829988)/3.709840059;
	outputs[9] = (inputs[9]-15.35890007)/8.133640289;
	outputs[10] = (inputs[10]-21.98600006)/8.937150002;
	outputs[11] = (inputs[11]-8.659509659)/6.911389828;
	outputs[12] = (inputs[12]-1017.650024)/7.242609978;
	outputs[13] = (inputs[13]-10.53100014)/5.43558979;
	outputs[14] = (inputs[14]-58.58539963)/19.50449944;

	return outputs;
}

vector<float> perceptronLayer1(const vector<float>& inputs)
{
	vector<float> combinations(3);

	combinations[0] = -0.324659 -0.00446057*inputs[0] +0.0845916*inputs[1] +0.00891796*inputs[2] +0.0158548*inputs[3] +0.176286*inputs[4] -0.262576*inputs[5] +0.148242*inputs[6] -0.0179865*inputs[7] -0.0109927*inputs[8] -0.0756325*inputs[9] -0.0828431*inputs[10] +0.00213187*inputs[11] +0.0343536*inputs[12] -0.00620566*inputs[13] +0.061157*inputs[14];
	combinations[1] = 0.267116 -0.00468511*inputs[0] -0.0281986*inputs[1] -0.0101452*inputs[2] -0.0106831*inputs[3] -0.278221*inputs[4] -0.262518*inputs[5] -0.051974*inputs[6] -0.273236*inputs[7] +0.00513209*inputs[8] +0.113503*inputs[9] -0.0685941*inputs[10] -0.110235*inputs[11] -0.0443352*inputs[12] -0.015758*inputs[13] +0.0475318*inputs[14];
	combinations[2] = 0.346649 +0.0157051*inputs[0] -0.000223656*inputs[1] +0.0206178*inputs[2] -0.0276031*inputs[3] +0.42278*inputs[4] +0.079571*inputs[5] +0.00523483*inputs[6] -0.458158*inputs[7] +0.00557093*inputs[8] -0.137998*inputs[9] +0.117945*inputs[10] +0.0383937*inputs[11] -0.020812*inputs[12] -0.0208939*inputs[13] -0.0243808*inputs[14];

	vector<float> activations(3);

	activations[0] = tanh(combinations[0]);
	activations[1] = tanh(combinations[1]);
	activations[2] = tanh(combinations[2]);

	return activations;
}

vector<float> perceptronLayer2(const vector<float>& inputs)
{
	vector<float> combinations(5);

	combinations[0] = 0.327883 +1.26852*inputs[0] -1.13848*inputs[1] +0.616267*inputs[2];
	combinations[1] = 0.280561 +0.730098*inputs[0] -1.13835*inputs[1] +0.684367*inputs[2];
	combinations[2] = -0.377372 -1.54127*inputs[0] -0.675251*inputs[1] +0.442081*inputs[2];
	combinations[3] = 0.572669 +1.11316*inputs[0] -0.608466*inputs[1] -0.161047*inputs[2];
	combinations[4] = 0.903883 +0.466491*inputs[0] -1.04449*inputs[1] -1.57589*inputs[2];

	vector<float> activations(5);

	activations[0] = combinations[0];
	activations[1] = combinations[1];
	activations[2] = combinations[2];
	activations[3] = combinations[3];
	activations[4] = combinations[4];

	return activations;
}

vector<float> unscalingLayer(const vector<float>& inputs)
{
	vector<float> outputs(5);

	outputs[0] = inputs[0]*19.50009918+54.50189972;
	outputs[1] = inputs[1]*11.87160015+24.5659008;
	outputs[2] = inputs[2]*14.5401001+32.81629944;
	outputs[3] = inputs[3]*10.28950024+24.15340042;
	outputs[4] = inputs[4]*2.051160097+3.110769987;

	return outputs;
}


vector<float> neuralNetwork(const vector<float>& inputs)
{
	vector<float> outputs;

	outputs = scalingLayer(inputs);
	outputs = perceptronLayer1(outputs);
	outputs = perceptronLayer2(outputs);
	outputs = unscalingLayer(outputs);

	return outputs;
}

int main(){return 0;}
