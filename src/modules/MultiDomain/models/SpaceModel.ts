import mongoose, { Schema, model, models } from 'mongoose';

var space = new Schema({
  _id: {
    type: String,
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  subDomain: {
    type: String,
    required: true
  },
  customDomain: {
    type: String,
    required: true,
    default: null
  },
  logo: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  primaryColor: {
    type: String,
    required: true
  },
  secondaryColor: {
    type: String,
    required: true
  },
  presentation: {
    type: String,
    required: true
  },
  owners: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  }
});

export const SpaceModel = models.SpaceModel || model('SpaceModel', space);