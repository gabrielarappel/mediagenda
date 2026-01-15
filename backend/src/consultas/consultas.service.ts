import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Injectable()
export class ConsultasService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateConsultaDto) {
        const dataHora = new Date(data.dataHora);

        if (dataHora < new Date()) {
            throw new BadRequestException('Não é permitido agendar consultas para horários passados')
        }

        return this.prisma.consulta.create({
            data: {
                medicoId: data.medicoId,
                paciente: data.paciente,
                dataHora: dataHora,
            },
        });
    }

    async findAll() {
        return this.prisma.consulta.findMany({
            include: { medico: true },
        })
    }
}
