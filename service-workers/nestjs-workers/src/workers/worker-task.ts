import { parentPort, workerData } from 'worker_threads';
import { heavyComputation } from '../utils/compute';

const result = heavyComputation(workerData);
parentPort?.postMessage(result);
