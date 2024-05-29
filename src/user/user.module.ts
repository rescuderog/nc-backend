import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [PrismaService],
    imports: [PrismaModule]
})
export class UserModule { }
