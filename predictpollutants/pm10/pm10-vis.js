let trainData;
let testData;
let trainingDataJSON;
let testingDataJSON;
let trainingData;
let testingData;
let outputData;

const model = tf.sequential();

async function generateModel() {
    model.add(tf.layers.dense({
        inputShape: [1],
        units: 1
    }))

    model.add(tf.layers.dense({
        units: 1,
    }))

    model.compile({
        loss: tf.losses.huberLoss,
        optimizer: tf.train.adam()
    })
}

async function getData() {
    trainData = await fetch('https://vertex-team.gitlab.io/mlaq/gatherdata/psi_data/index2016-18.json');
    testData = await fetch('https://vertex-team.gitlab.io/mlaq/predictpollutants/datas/valuetest.json');
    trainingDataJSON = await trainData.json();
    testingDataJSON = await testData.json();
    trainingData = tf.tensor2d(trainingDataJSON.map(item => [
        item.psi_twenty_four_hourly
    ]
    ), [6280, 1])
    testingData = tf.tensor2d(testingDataJSON.map(item => [
        item.psi_twenty_four_hourly
    ]
    ), [1, 1])
    outputData = tf.tensor2d(trainingDataJSON.map(item => [
        item.pm10_sub_index
    ]), [6280, 1])
}

let predVis;
async function main() {
    await getData();
    if (trainData !== null) {
        const toDisplay = trainingDataJSON.map(item => ({
            x: item.pm10_sub_index, y: item.psi_twenty_four_hourly
        }));
        const surface1 = { name: 'PM10', tab: 'Value Distribution' };
        const surface3 = { name: 'PM10', tab: 'Value Prediction' };
        tfvis.render.scatterplot(surface1, { values: [toDisplay] });
        await train_data();
        const preds = model.predict(trainingData);
        await preds.data().then(function(pred){ predVis = Array.from(pred); });
        const toDisplay1 = trainingDataJSON.map((item, i) => ({
            x: predVis[i], y: item.psi_twenty_four_hourly
        }));
        let series1 = ['Actual Value','Predicted Value']
        tfvis.render.scatterplot(surface3, { values: [toDisplay, toDisplay1], series: series1 });
    }
}

async function train_data() {
    const surface = { name: 'show.fitCallbacks', tab: 'Model Training' };
    await model.fit(
        trainingData,
        outputData,
        {
            epochs: 20,
            callbacks: tfvis.show.fitCallbacks(surface, ['loss', 'mse']) 
        }
    );
}

window.onload = function () {
    generateModel();
    main();
}