import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class RedisApiService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    // SET
    async setData(key: string, value: string) {
        console.log('SET key [ ' + key + ' ]\'s value to [ ' + value + ' ].')
        await this.cacheService.set(key, value);
    }

    // GET
    async getData(key: string): Promise<any> {
        const cachedData = await this.cacheService.get(key);
        console.log('GET key [ ' + key + ' ]\'s value, and result is [ ' + cachedData + ' ].')

        return cachedData;
    }

    // DEL
    async deleteData(key: string) {
        console.log('DEL key [ ' + key + ' ].')
        await this.cacheService.del(key);
    }

}
