import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}
