import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { createPetInput } from 'src/pets/dto/pet.dto';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(
        private readonly petsService: PetsService
    ) {}

    @Query(returns => Pet)
    getPet(@Args('id') id: number): Promise<Pet> {
        return this.petsService.findOne(id);
    }

    @Query(returns => [Pet])
    async pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }
    
    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: createPetInput): Promise<Pet> {
        return this.petsService.createPet(createPetInput);
    }


    @ResolveField(returns => Owner)
    getOwner(@Parent() pet:Pet): Promise<Owner> {
        return this.petsService.getOwners(pet.id);
    }

}

