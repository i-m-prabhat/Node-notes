// ❌ Problematic
// import * as cluster from 'cluster';

// ✅ Correct
import cluster from 'cluster';
import { cpus } from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap()
{
    const isPrimary = (cluster as any).isPrimary ?? (cluster as any).isMaster;

    if (isPrimary)
    {
        const numCPUs = cpus().length;
        console.log(`Primary ${process.pid} is running. Forking ${numCPUs} workers...`);

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
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
        console.log(`Worker ${process.pid} started`);
    }
}

bootstrap();
