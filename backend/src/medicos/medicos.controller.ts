import { Body, Controller, Get, Post } from "@nestjs/common";
import { MedicosService } from "./medicos.service";
import { CreateMedicoDto } from "./dto/create-medico.dto";

@Controller('medicos')
export class MedicosController {
    constructor(private readonly medicosService: MedicosService) {}

    @Post()
    async create(@Body() body: CreateMedicoDto) {
        return this.medicosService.create(body);
    }

    @Get()
    async findAll() {
        return this.medicosService.findAll();
    }
}