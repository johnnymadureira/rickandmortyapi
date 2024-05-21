import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { StringOperationsModule } from './string-operations/string-operations.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    CharactersModule,
    StringOperationsModule,
    MongooseModule.forRoot(process.env.DATABASE)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
