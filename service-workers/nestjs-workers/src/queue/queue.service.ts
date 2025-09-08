import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService
{
    private queue: Queue;

    constructor()
    {
        this.queue = new Queue('tasks', {
            connection: { host: '127.0.0.1', port: 6379 },
        });
    }

    async addJob(num: number)
    {
        return this.queue.add('heavyTask', { num });
    }
}
