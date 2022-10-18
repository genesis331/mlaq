const tf = require('@tensorflow/tfjs-node');
const trainData = require('./datas/households_electricity_consumption.json');
const testData = require('./datas/optimum_pollutant_value.json');

const trainingData = tf.tensor2d(trainData.map(item => [
    item.co, item.no2, item.o3, item.pm10, item.pm25, item.so2
]
), [23, 6])

const testingData = tf.tensor2d(testData.map(item => [
    item.co, item.no2, item.o3, item.pm10, item.pm25, item.so2
]
), [1, 6])

const outputData = tf.tensor2d(trainData.map(item => [
    item.value
]), [23, 1])

const model = tf.sequential();

model.add(tf.layers.dense({
    inputShape: [6],
    units: 1
}))

model.add(tf.layers.dense({
    units: 1,
}))

model.compile({
    loss: tf.losses.huberLoss,
    optimizer: tf.train.adam()
})

async function train_data() {
    await model.fit(
        trainingData,
        outputData,
        {
            epochs: 67500,
            callbacks: tf.node.tensorBoard('tmp/household_electricity_consumption')
        }
    );
    model.predict(testingData).print();
}

async function main() {
    await train_data();
}

main();