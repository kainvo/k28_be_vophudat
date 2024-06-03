import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
}, { timeStamps: true })

const Movie = mongoose.model('movies', MovieSchema)
export default Movie