import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Controller('consultas')
export class ConsultasController {
    constructor(private readonly consultasService: ConsultasService) {}

    @Post()
    async create(@Body() createConsultaDto: CreateConsultaDto) {
        return this.consultasService.create(createConsultaDto);
    }

    @Get()
    async findAll() {
        return this.consultasService.findAll();
    }
}
