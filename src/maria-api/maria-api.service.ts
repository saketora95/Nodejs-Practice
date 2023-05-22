import { Injectable } from '@nestjs/common';

// MariaDB & TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FruitPrice } from './maria-api.entity';

@Injectable()
export class MariaApiService {
    constructor(
        @InjectRepository(FruitPrice) private fruitPriceRepository: Repository<FruitPrice>,
    ) {}

    findAll(): Promise<FruitPrice[]> {
        console.log('MariaDB API : User try to get all fruit data.');
        return this.fruitPriceRepository.find();
    }

    findOne(id: number): Promise<FruitPrice> {
        console.log('MariaDB API : User try to get fruit data that ID is [ ' + id + ' ].');
        return this.fruitPriceRepository.findOneBy({ id });
    }

    createFruit(fruit: FruitPrice): Promise<FruitPrice> {
        console.log('MariaDB API : User try to create fruit [ ' + fruit.name + ' ] and price is [ ' + fruit.price + ' ].');
        return this.fruitPriceRepository.save(fruit);
    }

    updateFruit(fruit: FruitPrice): Promise<UpdateResult> {
        console.log('MariaDB API : User try to update fruit ID [ ' + fruit.id + ' ] with name [ ' + fruit.name + ' ] and price [ ' + fruit.price + ' ].');
        return this.fruitPriceRepository.update(fruit.id, fruit);
    }

    deleteFruit(id: number): Promise<DeleteResult> {
        console.log('MariaDB API : User try to delete fruit ID [ ' + id + ' ].');
        return this.fruitPriceRepository.delete(id);
    }

}
