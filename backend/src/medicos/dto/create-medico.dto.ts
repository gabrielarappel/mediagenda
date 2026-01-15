import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicoDto {
    @IsString()
    @IsNotEmpty({message: 'CRM é obrigatório'})
    crm: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    especialidade: string;
}