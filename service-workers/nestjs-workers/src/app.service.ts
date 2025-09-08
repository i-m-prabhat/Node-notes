import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService
{
    // Simple helper (you can use it in a /health endpoint if you like)
    health()
    {
        return {
            status: 'ok',
            pid: process.pid,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }
}
