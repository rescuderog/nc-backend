import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
    controllers: [RestaurantController],
    providers: [PrismaService, RestaurantService],
    imports: [PrismaModule],
    exports: [PrismaModule]
})
export class RestaurantModule { }
