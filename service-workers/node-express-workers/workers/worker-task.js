const { parentPort, workerData } = require('worker_threads');
const heavyComputation = require('../utils/compute');

const result = heavyComputation(workerData);
parentPort.postMessage(result);
