import { Controller, Get } from '@nestjs/common';
import { HeavyService } from './heavy.service';

@Controller('heavy')
export class HeavyController
{
    constructor(private readonly heavyService: HeavyService) { }

    @Get()
    async getHeavy(): Promise<string>
    {
        const result = await this.heavyService.runHeavyTask();
        return `Heavy result from worker ${process.pid}: ${result}`;
    }
}
