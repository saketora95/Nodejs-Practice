import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Socket.io Chat Room
import { RedisIoAdapter } from './adapters/redis.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// MQTT
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.connectMicroservice({
      transport: Transport.MQTT,
      options: {
        url: `mqtt://${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      },
    })
    
    // Adapter
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    // 簡易 Client
    app.useStaticAssets(join(__dirname, '..', 'resource'));

    // 設置 swagger
    setupSwagger(app);

    await app.startAllMicroservices();
    await app.listen(process.env.PORT);
}

// 設置 swagger
function setupSwagger(app) {
    const builder = new DocumentBuilder();
    const config = builder
      .setTitle('TodoList')
      .setDescription('This is a basic Swagger document.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    // 將 'api' 更改為 'doc'，使其可以透過 [ip:port]/doc 連入
    SwaggerModule.setup('doc', app, document);
}

bootstrap();