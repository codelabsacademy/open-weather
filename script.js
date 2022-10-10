let btn = document.querySelector("button");

let latitude;
let longitude;
let weatherAPI;
const chartData = [];

const grabLocation = async () => {
  if (latitude === undefined) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //Start of getCurrentPosition
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&timezone=auto`;
      let response = await fetch(weatherAPI);
      let data = await response.json();
      updateDOM(data);
      //End
    });
  } else {
    console.log("We already have that data");
  }
};

const updateDOM = (data) => {
  data.daily.time.forEach((elm, index) => {
    let p = document.createElement("p");
    p.innerText = `Date: ${elm} - min: ${data.daily.temperature_2m_min[index]} °C`;
    document.getElementById("data").appendChild(p);
  });
};

btn.addEventListener("click", grabLocation);
