import { Controller, Get } from '@nestjs/common';
import { QueueService } from './queue/queue.service';

@Controller()
export class AppController
{
    constructor(private readonly queueService: QueueService) { }

    @Get('light')
    getLight(): string
    {
        return `Light response 🚀 from worker ${process.pid}`;
    }

    @Get('queue')
    async addQueueJob(): Promise<string>
    {
        const job = await this.queueService.addJob(1e7);
        return `Job queued with ID ${job.id} ✅`;
    }
}
