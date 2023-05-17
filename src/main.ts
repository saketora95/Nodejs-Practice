import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入 swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 設置 swagger
    setupSwagger(app);

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
