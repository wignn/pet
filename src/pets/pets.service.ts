import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPetInput } from 'src/dto/pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async createPet(createPetInput:createPetInput): Promise<Pet> {
    const pet = this.petRepository.create(createPetInput); // CREATE pet
    return this.petRepository.save(pet); // INSERT INTO pets (name, type) VALUES ('name', 'type')
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find(); // SELECT * FROM pets
  }
}
