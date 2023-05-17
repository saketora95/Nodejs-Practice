import { Inject, Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GameCharacterService {
    // 設置 Redis client
    // createClient() 預設連向 localhost 的 6379 port
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) {}
    
    async setCharacter(char_name: string, char_level: number) {
        console.log(char_name, char_level);
        // await this.redis_client.connect();
        // await this.redis_client.set(char_name, char_level);
        // await this.redis_client.disconnect();
    }

    async getJobByName(char_name: string): Promise<string> {
        console.log('here');
        const cachedData = await this.cacheService.get(char_name);
        console.log(cachedData);

        return cachedData;
    }

}
