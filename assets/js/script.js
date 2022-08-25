let cityName = document.getElementById('citySearch').value;


// Gets current weather conditions
function getCurrentWeather(cityName) {
    let days = [0, 8, 16, 24, 32];
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=67e2a1d3d417a61c010ec2f90a5a68c9';
    fetch(url)
        .then(function (response) {
           return response.json();
        })
        .then(function (data) {
            document.getElementById('city0').innerHTML = 'City name: ' + data['city']['name'];
            getUvIndex(data['city']['coord']['lat'], data['city']['coord']['lon']);
            for (let i = 0; i < days.length; i++) {
                document.getElementById('temp' + i).innerHTML = 'Temp: ' + data['list'][days[i]]['main']['temp'];
                document.getElementById('wind' + i).innerHTML = 'Wind speed: ' + data['list'][days[i]]['wind']['speed'] + ' mph';
                document.getElementById('humidity' + i).innerHTML = 'Humidity: ' + data['list'][days[i]]['main']['humidity'] + '%';
                document.getElementById('weatherCondition' + i).src = `http://openweathermap.org/img/wn/` + data['list'][days[i]]['weather'][0]['icon'] + `@2x.png`;
                document.getElementById('date' + i).innerHTML = moment().add('days', i).format('ddd, hA');
            }
            saveSearch(cityName);
        })
};
// Pulls uv index from different call
function getUvIndex(lat, lon) {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=67e2a1d3d417a61c010ec2f90a5a68c9';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let uv = Number(data['daily'][0]['uvi']);
            document.getElementById('uv').innerHTML = 'CURRENT UV INDEX: ' + uv;
            if (uv <= 2) {
                document.getElementById("uv").classList.add('bg-success');
            } else if (2 < uv && uv <= 6) {
                document.getElementById("uv").classList.add('bg-warning');
            } else if (uv > 6) {
                document.getElementById("uv").classList.add('bg-danger');
            }
        })
};

// Gets city input
document.querySelector('.search #cityWeather').addEventListener('click', function () {
    cityName = document.getElementById('citySearch').value;
    getCurrentWeather(cityName);
});

// Save city name
function saveSearch(cityName) {
    let savedCity = [];
    for (let i = 0; i < 5; i++) {
        savedCity.push(localStorage.getItem(i))
    };
    for (let x = 0; x < 4; x++) {
        localStorage.setItem(x, savedCity[x + 1]);
    };
    localStorage.setItem(4, cityName);
    history();
};
// Displays search history
function history() {
    for (let y = 4; y >= 0; y--) {
        if (localStorage.getItem(y) != 'null') {
            document.getElementById('history' + [y]).innerHTML = localStorage.getItem(y);
        } else {
            document.getElementById('history' + [y]).innerHTML = '';
        }
    };
}
history();
// shows saved cities
document.querySelector('#history0').addEventListener('click', function () {
    cityName = document.getElementById('history0').innerHTML;
    getCurrentWeather(cityName);
});
document.querySelector('#history1').addEventListener('click', function () {
    cityName = document.getElementById('history1').innerHTML;
    getCurrentWeather(cityName);
});
document.querySelector('#history2').addEventListener('click', function () {
    cityName = document.getElementById('history2').innerHTML;
    getCurrentWeather(cityName);
});
document.querySelector('#history3').addEventListener('click', function () {
    cityName = document.getElementById('history3').innerHTML;
    getCurrentWeather(cityName);
});
document.querySelector('#history4').addEventListener('click', function () {
    cityName = document.getElementById('history4').innerHTML;
    getCurrentWeather(cityName);
});

