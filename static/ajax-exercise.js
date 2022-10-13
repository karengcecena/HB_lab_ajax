'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  
  fetch('/fortune')
    .then((response) => response.text())
    .then((serverData) => {
      document.querySelector('#fortune-text').innerHTML = serverData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);


// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json'
  const zipcode = document.querySelector('#zipcode-field').value;

  // setting url version 1 (complex)
  // const queryString = new URLSearchParams({ "zipcode": `${zipcode}` }).toString();
  // const url = `/weather.json?${queryString}`;

  // setting url version 2 (simpler)
  // const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((weather_info) => {
      document.querySelector('#weather-info').innerHTML = weather_info.forecast;
    });
  };

document.querySelector('#weather-form').addEventListener('submit', showWeather);


// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  const url = "/order-melons.json"
  const formInputs = {
    melon_type: document.querySelector("#melon-type-field").value,
    qty: document.querySelector("#qty-field").value,
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json',
      },
  })
    .then((response) => response.json())
    .then((responseJson) => {
        // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
      if (responseJson.code === "OK"){
        document.querySelector('#order-status').innerHTML = responseJson.msg;
        document.querySelector('#order-status').classList.remove("order-error")
      } else{
        document.querySelector('#order-status').innerHTML = responseJson.code;
        // document.querySelector('#order-status').innerHTML = responseJson.msg;
        document.querySelector('#order-status').classList.add("order-error")
      }
      console.log(responseJson);
    });
  };
  
  document.querySelector('#order-form').addEventListener('submit', orderMelons);



  // PART 4: Dogs (Further Study)

  function dogImage() {
  
    // TODO: show the result message after your form
    const url = "https://dog.ceo/api/breeds/image/random"
  
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
         const image = responseJson.message;
         document.querySelector("#dog-image").insertAdjacentHTML('beforeend', `<div><img src=${image}></img></div>`);
      })
  }; 
    
  document.querySelector('#get-dog-image').addEventListener('click', dogImage);

// note: did not have to get/ post info because we are not passing info into python and back
// instead, we are using the url to obtain the json