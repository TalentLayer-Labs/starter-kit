// https://mongoosejs.com/docs/schematypes.html#
import mongoose, { Schema, model, models } from 'mongoose';

const pallete = new Schema({
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
  pallete,
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
});

export const BuilderPlace = models.BuilderPlace || model('BuilderPlace', builderPlace);
