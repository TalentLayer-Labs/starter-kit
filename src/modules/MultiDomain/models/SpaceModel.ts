// https://mongoosejs.com/docs/schematypes.html#
import mongoose, { Schema, model, models } from 'mongoose';

var space = new Schema({
  name: {
    type: String,
  },
  subDomain: {
    type: String,
  },
  customDomain: {
    type: String,
  },
  logo: {
    type: String,
  },
  cover: {
    type: String,
  },
  primaryColor: {
    type: String,
  },
  secondaryColor: {
    type: String,
  },
  presentation: {
    type: String,
  },
  owners: {
    type: Array,
  },
  status: {
    type: String,
    default: 'pending'
  }
});

export const SpaceModel = models.SpaceModel || model('SpaceModel', space);