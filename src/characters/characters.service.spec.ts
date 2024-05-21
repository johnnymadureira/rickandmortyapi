import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from 'src/characters/characters.service';
import { Character } from 'src/Database/Model/CharacterModel';
import { CreateCharacterDto } from './dto/create-character.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('CharacterService', () => {
  let service: CharactersService;

  const mockCharactersRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService, { provide: getModelToken(Character.name), useValue: mockCharactersRepository }
      ],
    }).compile();
    
    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new Character and return its data', async () => {
    // arrange
    const createCharacterDto = {
        name: 'testeName',
        status: 'status',
        species: 'species',
        gender: 'teste',
        type: 'typeCharacter',
        birthDate: new Date(2024, 5, 1),
        points: 5,
    } as CreateCharacterDto;

    const character  = {
        name: 'testeName',
        status: 'status',
        species: 'species',
        gender: 'teste',
        type: 'typeCharacter',
        birthDate: new Date(2024, 5, 1),
        points: 5,
    } as Character;

    //jest.spyOn(mockCharactersRepository, 'save').mockReturnValue(character);
    jest.spyOn( mockCharactersRepository, 'create' ).mockImplementation(
        jest.fn().mockResolvedValueOnce( character )
      );
    // act
    const result = await service.create(createCharacterDto);

    // assert
    expect(mockCharactersRepository.create).toHaveBeenCalledTimes(1);
    expect(mockCharactersRepository.create).toHaveBeenCalledWith(createCharacterDto);

    expect(result).toEqual(character);
  });

  it('findAll => should return an array of characters', async () => {
    //arrange
    const character  = {
        name: 'testeName',
        status: 'status',
        species: 'species',
        gender: 'teste',
        type: 'typeCharacter',
        birthDate: new Date(2024, 5, 1),
        points: 5,
    } as Character;
    const characters = [character];
    jest.spyOn(mockCharactersRepository, 'find').mockReturnValue(characters);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(characters);
    //expect(mockCharactersRepository.findAll).toHaveBeenCalled();
  });
  it('findOne => should find a character by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const character  = {
        name: 'testeName',
        status: 'status',
        species: 'species',
        gender: 'teste',
        type: 'typeCharacter',
        birthDate: new Date(2024, 5, 1),
        points: 5,
    } as Character;

    jest.spyOn(mockCharactersRepository, 'findById').mockReturnValue(character);

    //act
    const result = await service.findOne(id);

    expect(result).toEqual(character);
    expect(mockCharactersRepository.findById).toHaveBeenCalled();
    expect(mockCharactersRepository.findById).toHaveBeenCalledWith( id, {} );
  });

  it('remove => should find a character by a given id, remove and then return Number of affected rows', async () => {
    const id = '1';
    const character  = {
        name: 'testeName',
        status: 'status',
        species: 'species',
        gender: 'teste',
        type: 'typeCharacter',
        birthDate: new Date(2024, 5, 1),
        points: 5,
    } as Character;

    jest.spyOn(mockCharactersRepository, 'findByIdAndDelete').mockReturnValue(character);

    //act
    const result = await service.remove(id);

    expect(result).toEqual(character);
    expect(mockCharactersRepository.findByIdAndDelete).toHaveBeenCalled();
    expect(mockCharactersRepository.findByIdAndDelete).toHaveBeenCalledWith( {_id: id});
  });
});