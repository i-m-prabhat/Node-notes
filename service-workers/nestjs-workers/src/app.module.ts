import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeavyModule } from './heavy/heavy.module';
import { QueueModule } from './queue/queue.module';

@Module({
    imports: [HeavyModule, QueueModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
