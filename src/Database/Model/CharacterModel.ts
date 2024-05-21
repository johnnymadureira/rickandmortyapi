import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Character extends Document {
    @Prop()
    name: string;
    @Prop()
    status: string;
    @Prop()
    species: string;
    @Prop()
    type: string;
    @Prop()
    gender: string;
    @Prop()
    birthDate: Date;
    @Prop()
    points: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
