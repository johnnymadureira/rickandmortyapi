import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from 'src/Database/Model/CharacterModel';


@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly charactersModel: Model<Character>
  ) {}

  public async create(createCharacterDto: CreateCharacterDto) : Promise<Character> {
    const character = this.charactersModel.create(createCharacterDto);
    return character;  
  }

  public async findAll(): Promise<Character[]> {
    return await this.charactersModel.find({ });
  }

  public async findOne(id: number): Promise<Character> {
    return await this.charactersModel.findById(id, {});
  }

  public async update(id: string, updateCharacterDto: UpdateCharacterDto) : Promise<Character>{
    return await this.charactersModel.findByIdAndUpdate(id, updateCharacterDto);
  }

  public async remove(id: string) : Promise<Character>{
    console.log(id);
    return this.charactersModel.findByIdAndDelete({_id: id});
  }
}
