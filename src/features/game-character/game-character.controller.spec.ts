import { Test, TestingModule } from '@nestjs/testing';
import { GameCharacterController } from './game-character.controller';

describe('GameCharacterController', () => {
  let controller: GameCharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameCharacterController],
    }).compile();

    controller = module.get<GameCharacterController>(GameCharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
