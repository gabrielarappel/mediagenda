import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateConsultaDto {
    @IsInt()
    medicoId: number;

    @IsNotEmpty()
    paciente: string;

    @IsDateString()
    dataHora: string;
}