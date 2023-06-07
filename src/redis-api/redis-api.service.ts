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

    // GET TREASURE
    async getTreasure() {
        console.log('GET Treasure API Actice -----');

        // 檢查 treasureMutex
        // 尚未鎖定
        if (await this.cacheService.get('treasureMutex') == null) {
            
            // 鎖定 treasure
            await this.cacheService.set('treasureMutex', true, { ttl: 10 } as any);
            
            // 取得 treasure 數值
            let tempTreasure = parseInt(await this.cacheService.get('treasure'));

            // treasure 尚未設置
            if (isNaN(tempTreasure)) {
                // 初次設置 treasure 數值 100 並因為呼叫 API 再 +1
                tempTreasure = 100 + 1;
                await this.cacheService.set('treasure', tempTreasure);

                return `初次設置 treasure 數值為 ${tempTreasure} 並鎖定。`;
            }

            // treasure 已經曾被設置
            else {
                // 因為呼叫 API treasure +1
                tempTreasure += 1;
                await this.cacheService.set('treasure', tempTreasure);

                return `目前 treasure 數值是 ${tempTreasure} 並已經鎖定。`;
            }
        }

        // 鎖定狀態
        else {
            // 取得 treasure 數值
            let tempTreasure = parseInt(await this.cacheService.get('treasure'));

            // 回傳
            console.log(`- return ${tempTreasure}`);
            return `目前 treasure 數值是 ${tempTreasure} 並因為處於鎖定狀態，本次 API 執行並沒有增加數值。`;
        }
    }

}
