const tf = require('@tensorflow/tfjs-node');
const trainData = require('../gatherdata/psi_data/index2016-18.json');
const testData = require('./datas/valuetest.json');

const trainingData = tf.tensor2d(trainData.map(item => [
    item.psi_twenty_four_hourly
]
), [6280, 1])

const testingData = tf.tensor2d(testData.map(item => [
    item.psi_twenty_four_hourly
]
), [1, 1])

const outputData = tf.tensor2d(trainData.map(item => [
    item.pm10_sub_index
]), [6280, 1])

const model = tf.sequential();

model.add(tf.layers.dense({
    inputShape: [1],
    units: 1
}))

model.add(tf.layers.dense({
    units: 1,
}))

model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.adam()
})

async function train_data() {
    await model.fit(
        trainingData,
        outputData,
        {
            epochs: 100
        }
    );
    model.predict(testingData).print();
}

async function main() {
    await train_data();
}

main();