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
        //Load dataset
        DataSet data_set;
        data_set.set_separator(';');
        data_set.set_has_columns_names(true);
        data_set.set_time_column("DATE");
        data_set.set_data_file_name("historical_data.csv");

        data_set.read_csv();

        data_set.set_lags_number(2);
        data_set.set_steps_ahead_number(7);
        data_set.transform_time_series();


        data_set.set_columns_unused();
        for(int i=8;i<30;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Input);
        }

        for(int i=33;i<38;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=48;i<53;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=63;i<68;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=78;i<83;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=93;i<98;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=108;i<113;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        for(int i=123;i<128;i++){
            data_set.set_column_use(i, DataSet::VariableUse::Target);
        }

        //Load previous neural network and train with updated dataset
        NeuralNetwork neural_network;
        neural_network.load("untrained_neural_network.xml");

        TrainingStrategy training_strategy(&neural_network, &data_set);

        training_strategy.set_loss_method(TrainingStrategy::LossMethod::MEAN_SQUARED_ERROR);
        training_strategy.set_optimization_method(TrainingStrategy::OptimizationMethod::QUASI_NEWTON_METHOD);
        training_strategy.perform_training();

        neural_network.save("trained_neural_network.xml");
        return 0;
    }
    catch(const exception& e)
    {
        cerr << e.what() << endl;

        return 1;
    }
}
