import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { createPetInput } from 'src/dto/pet.dto';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(
        private readonly petsService: PetsService
    ) {}

    @Query(returns => [Pet])
    async pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }
    
    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: createPetInput): Promise<Pet> {
        return this.petsService.createPet(createPetInput);
    }
}

