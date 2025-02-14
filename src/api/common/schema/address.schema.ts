import mongoose from 'mongoose'
import { Object_id } from "../types.common";
import { ObjectId } from '../values.common';


export interface LocationPoint {
  type: "Point",
  coordinates: number[] // lat, lng
}
export interface DefaultAddress {
  country: {
    id: Object_id; // ref to country
    name: string;
  };
  city: {
    id: Object_id; // ref to city
    name: string;
  };
  neighborhood: string;
  street_name?: string;
  building_no?: string;
  postal_code?: string;
  details?: string;
  location?: LocationPoint
}


export const defaultAddressSchemaObject = {
  country: {
    id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  city: {
    id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  neighborhood: { type: String, required: true },
  street_name: String,
  building_no: String,
  postal_code: String,
  details: String,
  location: {
    type: {
      type: String,
      enum: "Point"
    },
    coordinates: [Number]
  }
};


export const defaultAddressSchema = new mongoose.Schema<DefaultAddress>(defaultAddressSchemaObject);