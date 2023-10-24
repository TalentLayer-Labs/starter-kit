// https://mongoosejs.com/docs/schematypes.html#
import mongoose, { Schema, model, models } from 'mongoose';
import { PreferredWorkType } from '../../../types';

var builderPlace = new Schema({
  name: {
    type: String,
  },
  subdomain: {
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
  ownerTalentLayerId: {
    type: String,
  },
  owners: {
    type: Array,
  },
  status: {
    type: String,
    default: 'pending',
  },
  preferredWorkType: {
    type: [String],
    enum: PreferredWorkType,
    required: true,
    unique: false,
  },
});

export const BuilderPlace = models.BuilderPlace || model('BuilderPlace', builderPlace);
