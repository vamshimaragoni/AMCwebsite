import React, { useEffect, useState} from 'react';
import axios from 'axios';
import FilterDropdown from './FilterDropdown';
import TimingButton from './TimingButton';  
import './App.css';
import Video from './Video'; 


function App() {
  const [movies, setMovies] = useState([]);
  const MovieDates = [
    "Fri, Dec 1", "Sat, Dec 2", "Sun, Dec 3", "Mon, Dec 4", "Tue, Dec 5", "Wed, Dec 6", "Thur, Dec 7", "Fri, Dec 8",
    "Sat, Dec 9", "Sun, Dec 10", "Mon, Dec 11"
  ];
  const MovieDropdown = [
    "RRR", "RRR", "RRR", "RRR", "RRR", "RRR", "RRR", "RRR", "RRR", "RRR", "RRR",
  ];
  const MovieFilterDropdown = [
    "Premium Offerings", "AMC Signature Recliners", "Reserved Seating", "IMAX at AMC", "Dolby Cinema at AMC", "Open Caption (On-Screen Subtitles)",
    "RealD 3D", "English Spoken with Spanish Subtitles", "Hindi Spoken with English Subtitles", "AMC Artisan Films",
    "Thrills & Chills", "Closed Caption"
  ];
  const MovieLocations = [
    'AMC Grapevine Mills 24', 'AMC Highland Village 12', 'AMC Irving Mall 14', 'AMC Village On The Parkway 9', 'AMC DINE-IN Stonebriar 24',
    'AMC Eastchase 9', 'AMC NorthPark 15', 'AMC The Parks At Arlington 18', 'AMC Palace 9', 'AMC Firewheel 18'
  ];

  const renderTimingsButtons = (timings) => {
    return (
      <div>
        {timings.map((timing, index) => (
          <TimingButton key={index} timing={timing} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    axios.get('https://2cbsvlggg9.execute-api.us-east-1.amazonaws.com/default/api/movies')
      .then(response => {
        const fetchedMovies = response.data;
        console.log('Fetched Movies:', fetchedMovies); 
        setMovies(prevMovies => {
          if (JSON.stringify(prevMovies) !== JSON.stringify(fetchedMovies)) {
            return fetchedMovies;
          }
          return prevMovies;
        });
        console.log('Movies after setting state:', fetchedMovies); 
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);
  
  return (
    <div className="app-container">
      <div className='ShowTimes'>
        <strong>Showtimes</strong>
      </div>
      <div className="side-by-side-components">
        <FilterDropdown label="Dates" options={MovieDates} name="Dates" />
        <FilterDropdown label="All Movies" options={MovieDropdown} name="All Movies" />
        <FilterDropdown label="Premium Offerings" options={MovieFilterDropdown} name="Premium Offerings" />
        <FilterDropdown label="Location" options={MovieLocations} name="location" />
      </div>
      <div className="movies-container">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>
            <div className="movie-info">
              <h2>{movie.name}</h2>
              <p>{movie.locations}</p>
              <img
                src={movie.imageUrl}
                alt={movie.name}
                className="movie-image"
              />
              <p className='options'>
                Plush Rockers {movie.plushRockers} |
                Reserved Seating {movie.reservedSeating} |
                Closed Caption {movie.closedCaption} |
                Audio Description {movie.audioDescription} |
                Excluded from A-List {movie.excludedFromAList} |
                No Passes {movie.noPasses} |
                Non-refundable {movie.nonRefundable}
              </p>
              {renderTimingsButtons(movie.timings)}
            </div>
            <Video className='videoTrailer' url={movie.trailers} />
       
          </div>
        ))}
      </div>
    </div>
  );
}




export default App;