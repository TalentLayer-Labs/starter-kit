// https://mongoosejs.com/docs/schematypes.html#
import { Schema, model, models } from 'mongoose';
import { PreferredWorkTypes } from '../../../types';

const palette = new Schema({
  primary: {
    type: String,
  },
  primaryFocus: {
    type: String,
  },
  primaryContent: {
    type: String,
  },
  base100: {
    type: String,
  },
  base200: {
    type: String,
  },
  base300: {
    type: String,
  },
  baseContent: {
    type: String,
  },
  info: {
    type: String,
  },
  infoContent: {
    type: String,
  },
  success: {
    type: String,
  },
  successContent: {
    type: String,
  },
  warning: {
    type: String,
  },
  warningContent: {
    type: String,
  },
  error: {
    type: String,
  },
  errorContent: {
    type: String,
  },
});

const builderPlace = new Schema({
  name: {
    type: String,
    required: true,
  },
  baseline: {
    type: String,
  },
  subdomain: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  customDomain: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  logo: {
    type: String,
  },
  icon: {
    type: String,
  },
  cover: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  palette: palette,
  about: {
    type: String,
  },
  aboutTech: {
    type: String,
  },
  ownerTalentLayerId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  owners: {
    type: Array,
  },
  ownerAddress: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  preferredWorkTypes: {
    type: [String],
    enum: PreferredWorkTypes,
    required: true,
    unique: false,
  },
});

export const BuilderPlace = models.BuilderPlace || model('BuilderPlace', builderPlace);
