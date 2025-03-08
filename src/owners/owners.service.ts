import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,

  ) {}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOneOrFail({ where: { id } });
  }

}
