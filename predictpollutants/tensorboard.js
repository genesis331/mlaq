const tf = require('@tensorflow/tfjs-node');

const summaryWriter = tf.node.summaryFileWriter('/tmp/tfjs_tb_logdir');
for (let step = 0; step < 100; ++step) {
 summaryWriter.scalar('dummyValue', Math.sin(2 * Math.PI * step / 8), step);
}
const model = tf.sequential();
model.add(
    tf.layers.dense({units: 100, activation: 'relu', inputShape: [200]}));
model.add(tf.layers.dense({units: 1}));
model.compile({
  loss: 'meanSquaredError',
  optimizer: 'sgd',
  metrics: ['MAE']
});

// Generate some random fake data for demo purpose.
const xs = tf.randomUniform([10000, 200]);
const ys = tf.randomUniform([10000, 1]);
const valXs = tf.randomUniform([1000, 200]);
const valYs = tf.randomUniform([1000, 1]);

// Start model training process.
model.fit(xs, ys, {
  epochs: 10,
  validationData: [valXs, valYs],
   // Add the tensorBoard callback here.
  callbacks: tf.node.tensorBoard('/tmp/fit_logs_1')
});