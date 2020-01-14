import { Schema } from 'mongoose';

export interface PointInterface {
  type: "Point";
  coordinates: number[];
}

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

export default PointSchema;
