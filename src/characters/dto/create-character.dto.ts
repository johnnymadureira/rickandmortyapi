import { IsDate, IsNumber, IsString, isNotEmpty } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    readonly name: string;
    @IsString()
    status: string;
    @IsString()
    species: string;
    @IsString()
    type: string;
    @IsString()
    gender: string;
    @IsDate()
    birthDate: Date;
    @IsNumber()
    points: number;
}
