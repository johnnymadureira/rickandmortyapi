import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { log } from 'console';

global.characters = [];

@Injectable()
export class CharactersService {
  create(createCharacterDto: CreateCharacterDto) {
    const character = new Character();
    character.id =  global.characters.length + 1;
    character.name =  createCharacterDto.name;
    character.species =  createCharacterDto.species;
    character.status =  createCharacterDto.status;
    character.gender =  createCharacterDto.gender;

    global.characters.push(character);
    return character;
  }

  findAll() {
    return global.characters;
  }

  findOne(id: number) {
    return global.characters.find((character) => character.id === id);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    var index = global.characters.findIndex(character => character.id === id);
    if(index === -1){
      throw new NotFoundException('Character not found.');
    }

    global.characters[index].name = updateCharacterDto.name;
    global.characters[index].status = updateCharacterDto.status;
    global.characters[index].species = updateCharacterDto.species;
    global.characters[index].type = updateCharacterDto.type;
    global.characters[index].gender = updateCharacterDto.gender;

    return global.characters.find(character => character.id === id);
  }

  remove(id: number) {
    var index = global.characters.findIndex(character => character.id === id);
    console.log(index);
    if(index === -1){
      throw new NotFoundException('Character not found.');
    }
    return global.characters.splice(index, 1);
  }
}
