import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StringOperationsService } from './string-operations.service';

@Controller('string-operations')
export class StringOperationsController {
  constructor(private readonly stringOperationsService: StringOperationsService) {}

  @Get('countVogels/:word')
  countVogels(@Param('word') word: string) {
    return this.stringOperationsService.countVowels(word);
  }
}
