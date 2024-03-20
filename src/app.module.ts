import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { StringOperationsModule } from './string-operations/string-operations.module';

@Module({
  imports: [CharactersModule, StringOperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
