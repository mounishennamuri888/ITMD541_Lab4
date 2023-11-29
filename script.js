// for Current location
function getlocation(){
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitudes / longitudes.
      // Log the position data to the console
      console.log(position)
      // Creating URL for the sunrise and the sunset API using user's current location
      const url1 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
      // Fetch the data from API
      fetch(url1)
        .then(response => response.json())
        .then(data => {
          document.querySelector('#timezone2').innerHTML = data.results.timezone}) // Display the timezone information on the webpage
          .catch(error => alert('location not enabled or not supported by your browser'))
    });
    }
    function showtime() {
      const userlocation = document.getElementById('locationInput').value;  // Get location input from user
      
        // Fetch the geolocation data using provided location by user
      const loc1 = `https://geocode.maps.co/search?q=${userlocation}`
      fetch(loc1)
        .then(response => response.json())
        .then(data => {  // Extract latitude, longitude values, and display name from geocode data
          latitude = data[0].lat
          longitude  = data[0].lon
          place=data[0].display_name
        })
        .catch(error => alert('Not a valid location')) // Displaying closest location information on webpage
      document.getElementById('place').textContent="More closest location you searched for =  "+ place;
      
      
      // Creating URL for the sunrise and sunset API using provided location by user
      const url1 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
      const tomorrow = new Date();  // Get the date for tomorrow
      tomorrow.setDate(tomorrow.getDate() + 1); 
      // Creating URL for the sunrise and sunset API for the next day using the user's provided location
      const tomorrowUrl2 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrow.toISOString().split('T')[0]}`;
      
      // Fetching the data from API for today
      fetch(url1)
        .then(response => response.json())
        .then(data => {   // Display sunrise, sunset, dawn, dusk, day length, solar noon, and timezone values for today
          document.querySelector('#sunrise').innerHTML = data.results.sunrise
          document.querySelector('#sunset').innerHTML = data.results.sunset
          document.querySelector('#dawn').innerHTML = data.results.dawn
          document.querySelector('#dusk').innerHTML = data.results.dusk
          document.querySelector('#day_length').innerHTML = data.results.day_length
          document.querySelector('#solar_noon').innerHTML = data.results.solar_noon
          document.querySelector('#timezone').innerHTML = data.results.timezone
      
        document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
        })
        .catch(error => console.error('Error:', error))
      
      
        // Fetching the  data from API for tommorrow/the next day
        fetch(tomorrowUrl2)
        .then(response => response.json())
        .then(data => {  // Displaying sunrise, sunset, dawn, dusk, day length, solar noon, and timezone values for the next day /tommorrow
          document.querySelector('#sunrise1').innerHTML = data.results.sunrise
          document.querySelector('#sunset1').innerHTML = data.results.sunset
          document.querySelector('#dawn1').innerHTML = data.results.dawn
          document.querySelector('#dusk1').innerHTML = data.results.dusk
          document.querySelector('#day_length1').innerHTML = data.results.day_length
          document.querySelector('#solar_noon1').innerHTML = data.results.solar_noon
          document.querySelector('#timezone1').innerHTML = data.results.timezone
      
        document.querySelector('#raw-output1').innerHTML = JSON.stringify(data)  // Displaying the raw JSON data for tomorrow on the webpage
        })
        .catch(error => console.error('Error:', error))
      
      
      
      
    }

