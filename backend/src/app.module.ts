import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';

@Module({
  imports: [PrismaModule, MedicosModule, ConsultasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
