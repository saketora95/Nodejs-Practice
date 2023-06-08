import { Injectable } from '@nestjs/common';

// MariaDB & TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FruitPrice } from './maria-api.entity';

// Redis Cache
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class MariaApiService {
    private readonly redis: Redis;

    constructor(
        @InjectRepository(FruitPrice) private fruitPriceRepository: Repository<FruitPrice>,
        private readonly redisService: RedisService
    ) {
        this.redis = this.redisService.getClient();
    }
    
    // Redis Cache

    async getCache(key: string): Promise<string> {
        console.log(`MariaDB API : User try to get [ ${key} ]'s data with getCache.`);

        // 取得暫存資料
        let cacheData = await this.redis.get(key);

        // 不存在暫存資料，向 SQL 進行查詢
        if (cacheData === null) {

            // 查詢資料
            let queryResult = await this.fruitPriceRepository.findOneBy({name: key});

            // 於 Redis 中存放
            await this.redis.set(key, JSON.stringify(queryResult), 'EX', 3);

            return JSON.stringify({
                'CacheStatus': 'Cache Missing',
                'Result': queryResult
            })
        }

        // 存在暫存資料，進行回傳
        return JSON.stringify({
            'CacheStatus': 'Cache Hit',
            'Result': JSON.parse(cacheData)
        })
    }
    
    // Basic Process

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
