const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors'); 
const awsServerlessExpress = require('aws-serverless-express');
const Movie = require('./movieModel');

const app = express();
app.use(express.json());

app.use(cors());
const dbURI = "mongodb+srv://user:vamshi1998@cluster0.s6kt2w4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI);
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error(`MongoDB connection error: ${err}`));

// api to send data into MongoDb
app.post('/api/movies', async (req, res) => {
  try {
    console.log('Received POST request:', req.body);
    const {
      name,
      timings,
      locations,
      plushRockers,
      reservedSeating,
      closedCaption,
      audioDescription,
      excludedFromAList,
      noPasses,
      nonRefundable,
      trailers,
      imageUrl
    } = req.body;
    const newMovie = new Movie({
      name,
      timings,
      locations,
      plushRockers,
      reservedSeating,
      closedCaption,
      audioDescription,
      excludedFromAList,
      noPasses,
      nonRefundable,
      trailers,
      imageUrl
    });

    const savedMovie = await newMovie.save();
    console.log('Saved Movie:', savedMovie);
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: error.message });
  }
});

// api to retrieve data from MongoDb 
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find(); 
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).json({ error: error.message });
  }
  
});


// api to delete the records from MongoDb
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ success: true, message: 'Movie deleted successfully', deletedMovie });
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    res.status(500).json({ error: error.message });
  }
});
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
//module.exports.handler=serverless(app);
