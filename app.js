const API_KEY = '6cee0181e3d8a8595440857b48fd186e';

const body = document.querySelector('body');
const inp = document.getElementById('inp');
const container = document.getElementById('container');

const getWeather = () => {
	container.innerHTML = '';
	const city = inp.value;
	inp.value = '';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
	fetch(url)
		.then((res) => res.json())
		.then((res) => {
			if (res.cod === '404') {
				const error = document.createElement('p');
				error.innerText = 'Location Not Found !';
				error.classList.add('error');
				container.appendChild(error);
			} else {
				const temp = parseInt(res.main.temp - 273);
				const windSpeed = parseInt(eval(res.wind.speed * 18) / 5);
				const humidity = res.main.humidity;
				const desc = res.weather[0].description;

				// Weather Image
				const weatherImg = document.createElement('img');

				if (desc === 'haze') {
					weatherImg.src = './images/fog.svg';
					body.style.backgroundColor = 'grey';
				} else if (desc.includes('sky')) {
					weatherImg.src = './images/sunny.svg';
					body.style.backgroundColor = '#EFCF91';
				} else if (desc === 'broken clouds') {
					weatherImg.src = './images/partly-cloudy.svg';
					body.style.backgroundColor = '#5B4EEE';
				} else if (desc === 'overcast clouds') {
					weatherImg.src = './images/overcast.svg';
					body.style.backgroundColor = '#25B0DC';
				} else if (desc.includes('clouds')) {
					weatherImg.src = './images/cloudy.svg';
					body.style.backgroundColor = '#3A7A8E';
				} else if (desc === 'smoke' || desc === 'mist') {
					weatherImg.src = './images/mist.svg';
					body.style.backgroundColor = '#A4A4A4';
				} else if (desc.includes('rain')) {
					weatherImg.src = './images/rain.svg';
					body.style.backgroundColor = '#083CF4';
				} else if (desc.includes('snow')) {
					weatherImg.src = './images/snowflake.svg';
					body.style.backgroundColor = '#EFEFEF';
				} else if (desc.includes('thunder')) {
					weatherImg.src = './images/thunderstorms.svg';
					body.style.backgroundColor = '#4C1097';
				} else {
					weatherImg.src = './images/sunny.svg';
					body.style.backgroundColor = '#EFCF91';
				}

				weatherImg.classList.add('weather-img');
				container.appendChild(weatherImg);

				// Weather Description
				const description = document.createElement('p');
				description.innerText = desc;
				description.classList.add('description');
				container.appendChild(description);

				const weather = document.createElement('p');
				weather.innerText = temp + '° C';
				weather.classList.add('temperature');
				container.appendChild(weather);

				// Details - Container
				const detailsContainer = document.createElement('div');
				detailsContainer.classList.add('details-container');

				// Wind Details
				const windDetails = document.createElement('div');
				windDetails.classList.add('details-subcontainer');

				const windImg = document.createElement('img');
				windImg.src = './images/wind-speed.png';
				windImg.classList.add('details-img');
				windDetails.appendChild(windImg);

				const speed = document.createElement('p');
				speed.innerText = windSpeed + ' Km/h';
				speed.classList.add('details-txt');
				windDetails.appendChild(speed);

				// Humidity Details
				const humidityDetails = document.createElement('div');
				humidityDetails.classList.add('details-subcontainer');

				const humidityImg = document.createElement('img');
				humidityImg.src = './images/humidity.png';
				humidityImg.classList.add('details-img');
				humidityDetails.appendChild(humidityImg);

				const percent = document.createElement('p');
				percent.innerText = humidity + '%';
				percent.classList.add('details-txt');
				humidityDetails.appendChild(percent);

				detailsContainer.appendChild(windDetails);
				detailsContainer.appendChild(humidityDetails);
				container.appendChild(detailsContainer);
			}
		})
		.catch((err) => console.log(err));
};

inp.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') getWeather();
});
