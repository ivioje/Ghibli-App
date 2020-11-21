// Add an image in the div with a class of root and append it to the div with a class of container
const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

//create a request variable and assign a new XMLHttpRequest object to it.

var request = new XMLHttpRequest();

//open a connection, using the GET request on the URL endpoint.
//The URL endpoint is https://ghibliapi.herokuapp.com/films

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {
  //begin acessing JSOn data here
  //parse the data from JSON to JavaScript object

  var data = JSON.parse(this.response);

  //loop through the titles of the movies if there is no error

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      //create a div with a class called card
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      //create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      //create a paragraph and set the text content to the film's description
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300); //limit to 300 chars
      p.textContent = `${movie.description}...`;

      //Append the cards to the container element
      container.appendChild(card);

      //each card will contain an h1 and a p
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    //Create an error message
    const errorMsg = document.createElement('marquee');
    errorMsg.textContent = 'not working';
    applicationCache.appendChild(errorMsg);
  }
};

//send request
request.send();
