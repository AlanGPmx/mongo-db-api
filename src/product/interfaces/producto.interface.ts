import { Document, ObjectId } from 'mongoose';

export interface Product extends Document {
  readonly _id?: ObjectId;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly createdAt?: Date;
}
