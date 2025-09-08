import { Module } from '@nestjs/common';
import { HeavyController } from './heavy.controller';
import { HeavyService } from './heavy.service';

@Module({
    controllers: [HeavyController],
    providers: [HeavyService],
})
export class HeavyModule { }
