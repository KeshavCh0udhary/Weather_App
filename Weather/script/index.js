const Display = () => {
    return `<div id="container"></div>

    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas" frameborder="0" scrolling="no" marginheight="0"
                marginwidth="0">
            </iframe>
        </div>
    </div>`
}

document.getElementById("display").innerHTML = Display();

let container = document.getElementById("container");

const api_key = `d06f572a55f4c31aee40da047ef7ba15`

let api_ke = "0452830f6c045329fbc16f33b1bae2d2"

async function getData(lat, lon) {

    let city = document.getElementById('city').value;
    getLocationWeather()

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    try {
        let res = await fetch(url);
        let users = await res.json();
        append(users);
        coords(users.coord.lat, users.coord.lon);
    }
    catch (err) {

    }
}

function append(data) {
    container.style.backgroundColor = "#000000d0";
    
    container.innerHTML = null;
    let h2 = document.createElement("h2");
    h2.innerText = "City Name : " + data.name;
    let p = document.createElement("h3");
    let a = Math.floor(data.main.temp_min - 273);
    p.innerText = "Min Temp : " + a + "°C";

    let p2 = document.createElement("h3");
    let t = Math.floor(data.main.temp_max - 273);
    p2.innerText = `Max temp : ${t}°C`
    let p3 = document.createElement("p");
    p3.innerText = `${data.weather[0].description}`
    let div = document.createElement("div");
    let img = document.createElement("img");
    let weather = data.weather[0].description

    let lat = data.coord.lat;
    let lon = data.coord.lon;

    if (weather == "clear sky") {
        img.setAttribute("src", "https://cdn.iconscout.com/icon/free/png-64/weather-2844887-2365236.png");

    } else if (weather == "haze") {
        img.setAttribute("src", "data:image/png;base64,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");

    } else if (weather == "overcast clouds") {
        img.setAttribute("src", "data:image/jpeg;base64,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");

    } else {
        img.setAttribute("src", "data:image/png;base64,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");
    }
    div.append(img);

    container.append(h2, p, p2, p3, div);
    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}


function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude);
        console.log(longitude);
    }
}


async function coords(lat, lon) {

    let urll = `https:api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${api_ke}`
    try {
        let res = await fetch(urll);
        let data = await res.json();
        displaydata(data.daily)

    }
    catch (err) {
        console.log(err)
    }


}
let div = document.createElement("div");
function displaydata(data) {
    div.innerHTML = null;
    div.setAttribute("id", "days")

    for (let i = 0; i < data.length; i++) {
        let day = data[i].dt * 1000;
        let img = document.createElement("img");
        let daily = ["Sunday", "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];
        img.setAttribute("src", `https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`)
        let div2 = document.createElement("div");
        let h2 = document.createElement("h3");
        h2.innerText = `${Math.floor(data[i].temp.max - 273)} °C`;
        let h3 = document.createElement("h3");
        h3.innerText = `${Math.floor(data[i].temp.min - 273)} °C`;
        div2.style.background = "#000000d0";
        div2.style.textAlign = "center";
        const d = new Date();
        let day2 = d.getDay();

        let d1 = document.createElement("h4");
        d1.innerText = daily[(day2 + i) % 7];

        div2.append(img, d1, h2, h3);
        div.append(div2)
        document.querySelector("body").append(div)
    }
}