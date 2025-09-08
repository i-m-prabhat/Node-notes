import { Injectable } from '@nestjs/common';
import { runWorkerTask } from '../workers/worker-runner';

@Injectable()
export class HeavyService
{
    async runHeavyTask(): Promise<number>
    {
        return runWorkerTask(1e8); // Example workload
    }
}
