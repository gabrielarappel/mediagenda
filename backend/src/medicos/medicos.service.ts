import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMedicoDto } from "./dto/create-medico.dto";

@Injectable()
export class MedicosService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateMedicoDto) {
        return this.prisma.medico.create({
            data,
        })
    }

    async findAll() {
        return this.prisma.medico.findMany();
    }
}