const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster)
{
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} running. Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++)
    {
        cluster.fork();
    }

    cluster.on('exit', (worker) =>
    {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else
{
    require('./app'); // Each worker runs Express
}
