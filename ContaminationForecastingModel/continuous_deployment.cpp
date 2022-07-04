#include <cstring>
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <time.h>
#include <stdlib.h>

#include "../opennn/opennn.h"
#include "../opennn/text_analytics.h"

using namespace opennn;
using namespace std;
using namespace Eigen;

int main(int argc, char *argv[])
{
    try
    {
        //Load latest trained network
        NeuralNetwork neural_network;
        neural_network.load("trained_neural_network.xml");

        //Calculate outputs from arguments
        Tensor<type, 2> inputs(1, 22);
        inputs.setValues({{((float)(atof(argv[1]))),((float)(atof(argv[2]))),((float)(atof(argv[3]))),((float)(atof(argv[4]))),((float)(atof(argv[5]))),
                         ((float)(atof(argv[6]))),((float)(atof(argv[7]))),((float)(atof(argv[8]))),((float)(atof(argv[9]))),((float)(atof(argv[10]))),
                         ((float)(atof(argv[11]))),((float)(atof(argv[12]))),((float)(atof(argv[13]))),((float)(atof(argv[14]))),((float)(atof(argv[15]))),
                         ((float)(atof(argv[16]))),((float)(atof(argv[17]))),((float)(atof(argv[18]))),((float)(atof(argv[19]))),((float)(atof(argv[20]))),
                         ((float)(atof(argv[21]))), ((float)(atof(argv[22])))}});
        Tensor<type, 2> outputs = neural_network.calculate_outputs(inputs);

        //Save outputs to a CSV file
        save_csv(outputs, "outputs.csv");
        return 0;
    }
    catch(const exception& e)
    {
        cerr << e.what() << endl;

        return 1;
    }
}
