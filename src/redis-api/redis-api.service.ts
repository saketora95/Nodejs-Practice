import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisApiService {
    private readonly redis: Redis;
    
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private readonly redisService: RedisService
    ) {
        this.redis = this.redisService.getClient();
    }

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

    // GET TREASURE
    async getTreasure() {
        console.log('GET Treasure API Actice -----');

        // 成功上鎖 = 執行當下沒有鎖定，調整 treasure 數值後回傳
        if ((await this.redis.set('tLock', '1', 'EX', 10, 'NX')) === 'OK') {

            // 取得 treasure 數值
            let treasureValue = parseInt(await this.redis.get('treasure'));

            // 若 treasue 尚未初始化，設置初始數值
            if (isNaN(treasureValue)) {
                await this.redis.set('treasure', 100);
                return `[treasure 數值 : null → 100 ] 執行時未上鎖，且 treasure 尚未初始化，此次 API 呼叫給予初始數值。`;
            }

            // 先前已完成初始化，設置新數值
            await this.redis.set('treasure', treasureValue + 1);
            return `[treasure 數值 : ${treasureValue} → ${treasureValue + 1} ] 執行時未上鎖，此次 API 呼叫提高了 treasure 的數值。`;
        }

        // 上鎖失敗 = 仍在鎖定中，回傳 treasure 數值
        return `[treasure 數值 : ${await this.redis.get('treasure')} ] 執行時上鎖中，此次 API 呼叫沒有改變數值。`;
    }

}
