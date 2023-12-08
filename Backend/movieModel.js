const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  timings: [String], 
  locations: String,
  plushRockers: Boolean,
  reservedSeating: Boolean,
  closedCaption: Boolean,
  audioDescription: Boolean,
  excludedFromAList: Boolean,
  noPasses: Boolean,
  nonRefundable: Boolean,
  trailers: String ,
  imageUrl: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;