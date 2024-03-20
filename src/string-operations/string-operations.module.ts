import { Module } from '@nestjs/common';
import { StringOperationsService } from './string-operations.service';
import { StringOperationsController } from './string-operations.controller';

@Module({
  controllers: [StringOperationsController],
  providers: [StringOperationsService],
})
export class StringOperationsModule {}
