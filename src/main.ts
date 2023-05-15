import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 自 3000 變更為 4000
  await app.listen(4000);
}
bootstrap();
