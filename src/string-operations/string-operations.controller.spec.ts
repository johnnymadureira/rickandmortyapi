import { Test, TestingModule } from '@nestjs/testing';
import { StringOperationsController } from './string-operations.controller';
import { StringOperationsService } from './string-operations.service';

describe('StringOperationsController', () => {
  let controller: StringOperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringOperationsController],
      providers: [StringOperationsService],
    }).compile();

    controller = module.get<StringOperationsController>(StringOperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
