document.querySelector('.search-form').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#search-input').value;

    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e859d4777a41bf7186c21b029f88a814&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
    
        if(json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning(`A localização <strong>${input}</strong> não foi encontrada.`)        
        }
    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');

    document.querySelector('.location').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.temp-info').innerHTML = `${json.temp} <sup>°C`;
    document.querySelector('.wind-info').innerHTML = `${json.windSpeed} <span>km/h</span>`;    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.wind-angle').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.result').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('.result').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg;
}

