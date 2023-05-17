import { Test, TestingModule } from '@nestjs/testing';
import { GameCharacterService } from './game-character.service';

describe('GameCharacterService', () => {
  let service: GameCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCharacterService],
    }).compile();

    service = module.get<GameCharacterService>(GameCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
