import { Worker } from 'worker_threads';
import { join } from 'path';

export function runWorkerTask(workerData: number): Promise<number>
{
    const isTs = __filename.endsWith('.ts');
    const workerPath = join(__dirname, isTs ? 'worker-task.ts' : 'worker-task.js');

    return new Promise((resolve, reject) =>
    {
        const worker = new Worker(workerPath, {
            workerData,
            execArgv: isTs ? ['-r', 'ts-node/register'] : []
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) =>
        {
            if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));
        });
    });
}
