const { Worker } = require('bullmq');
const heavyComputation = require('../utils/compute');

const worker = new Worker(
    'tasks',
    async (job) =>
    {
        console.log(`Processing job ${job.id} with data:`, job.data);
        const result = heavyComputation(job.data.num);
        return result;
    },
    { connection: { host: '127.0.0.1', port: 6379 } }
);

worker.on('completed', (job, result) =>
{
    console.log(`Job ${job.id} completed with result: ${result}`);
});

worker.on('failed', (job, err) =>
{
    console.error(`Job ${job.id} failed: ${err.message}`);
});
