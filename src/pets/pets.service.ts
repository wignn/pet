import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPetInput } from 'src/pets/dto/pet.dto';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    private ownerRepository: OwnersService
  ) {}

  async createPet(createPetInput:createPetInput): Promise<Pet> {
    const pet = this.petRepository.create(createPetInput); // CREATE pet
    return this.petRepository.save(pet); // INSERT INTO pets (name, type) VALUES ('name', 'type')
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find(); // SELECT * FROM pets
  }


  async findOne(id: number): Promise<Pet> {
    return this.petRepository.findOneByOrFail({ id }); // SELECT * FROM pets WHERE id = id
  }

  
  async getOwners(ownerId: number): Promise<Owner> {
    return this.ownerRepository.findOne(ownerId);
  }
}
