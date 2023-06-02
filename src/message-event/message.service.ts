import { Inject, Injectable } from '@nestjs/common';

// MQTT
import { Payload, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {

    constructor(
        @Inject('MQTT_CLIENT') private mqttClient: ClientProxy
    ) {}

    public setLight(@Payload() payload: number[]) {
        const inputValue = payload['params']['data'];

        // 0.0 - 4.0 : yellow light, red wire (1) + green wire (3)      TFTF
        // 4.1 - 6.0 : green light, green wire (3)                      FFTF
        // 6.1 - 10.0 : red, red wire (1)                               TFFF
        // additional buzzer (purple wire, (4)) when higher than 9.0    TFFT

        let lightSignal = [];

        if (0.0 <= inputValue && inputValue <= 4.0) {
            lightSignal = [true, false, true, false];
        } else if (4.0 < inputValue && inputValue <= 6.0) {
            lightSignal = [false, false, true, false];
        } else if (6.0 <= inputValue && inputValue < 9.0) {
            lightSignal = [true, false, false, false];
        } else if (9.0 <= inputValue && inputValue <= 10.0) {
            lightSignal = [true, false, false, true];
        }

        if (lightSignal.length != 0) {
            this.publishLightSetting(lightSignal);
        }
    }

    public publishLightSetting(signal: number[]) {
        for (let i = 0 ; i < 4 ; i++) {
            let tatgetTopic = `SUNIX/26:00:01_EZG1300/9a:00:c5_EZR5002/SET/DO_INTERFACE/CH_0${i + 1}`;
            
            this.mqttClient.emit(
                tatgetTopic, 
                {
                    params: {
                        stream: "DO",
                        type: "bool",
                        data: signal[i]
                    }
                }
            );
        }
    }

}
