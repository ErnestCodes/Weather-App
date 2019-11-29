window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector('.temperature span');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/d27ed39f765c54f621f4e984832860cc/${lat},${long}`;
            console.log('loading');
            fetch(api)
            .then( res => res.json())
            .then( data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                //set DOM element from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                  //FORMULA FOR CELSIUS
                  let celsius = (temperature - 32) * (5 / 9);
                  //set icon
                  setIcons(icon, document.querySelector(".icon"));

                  //change temperature to celsius/farenheit
                  temperatureSection.addEventListener('click', () =>{
                   if(temperatureSpan.textContent === "F") {
                       temperatureSpan.textContent = "c";
                       temperatureDegree.textContent = Math.floor(celsius);
                   }else{
                       temperatureSpan.textContent = "F";
                       temperatureDegree.textContent = temperature;
                   }
                  });
            });
        });
    }


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});