


let id = '9505fd1df737e20152fbd78cdb289b6a'; 
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id; 
let valueSearch = document.getElementById("valueSearch"); 
let city = document.getElementById("city"); 
let temperature = document.getElementById("temperature"); 
let description = document.querySelector(".description"); 
let clouds = document.getElementById("clouds"); 
let humidity = document.getElementById("humidity"); 
let pressure = document.getElementById("pressure"); 
let form = document.querySelector("form"); 
let main = document.querySelector("main");  

form.addEventListener('submit', (event) => { 
    event.preventDefault(); 
    let value = valueSearch.value; 
    console.log(value); 
    
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${id}`) 
        .then((res) => { 
            let min = res.data.list[0].main.temp_min; 
            let max = res.data.list[0].main.temp_max; 
            let temp = (min + max) / 2; 
            let descriptions = res.data.list[0].weather[0].description; 
            let pressures = res.data.list[0].main.pressure; 
            let humiditys = res.data.list[0].main.humidity; 
            let cloud = res.data.list[0].clouds.all; 
            
            console.log(temp); 
            console.log(descriptions); 
            console.log(pressures); 
            console.log(humiditys); 
            console.log(cloud); 
            
            temperature.innerHTML = `
                <img src="https://openweathermap.org/img/wn/10d@4x.png"> 
                <figcaption> 
                    <span>${parseInt(temp)}</span> 
                    <sup>o</sup> 
                </figcaption>`; 
            
            description.innerHTML = descriptions; 
            clouds.innerHTML = cloud; 
            humidity.innerHTML = humiditys; 
            pressure.innerHTML = pressures; 
            city.querySelector("figcaption").innerHTML = value; 
            
            city.querySelector("img").src = `https://flagsapi.com/${res.data.city.country}/shiny/32.png`; 
            
            if (res.data.list[0].weather[0].icon === "01n") { 
                temperature.querySelector("img").src = "moon.png"; 
                temperature.querySelector("img").style.width = "80px"; 
            } else { 
                temperature.querySelector("img").src = `https://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png`; 
            } 
            valueSearch.value = ""; 
        })
        .catch(() => { 
            main.classList.add('error'); 
            console.log(main.classList); 
            setTimeout(() => { 
                main.classList.remove('error'); 
            }, 1000); 
            valueSearch.value = ''; 
        }); 
});  

function getlocation() { 
    navigator.geolocation.getCurrentPosition(showLoc); 
} 

function showLoc(pos) { 
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`; 
    fetch(url)
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } else { 
                throw new Error('Network response was not ok'); 
            } 
        }) 
        .then(data => { 
            console.log("hi " + data.address.state); 
            hi(data.address.state); 
        }) 
        .catch(error => console.error('There was a problem with the fetch operation:', error)); 
} 

function hi(value) { 
    console.log(value); 
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${id}`) 
        .then((res) => { 
            let min = res.data.list[0].main.temp_min; 
            let max = res.data.list[0].main.temp_max; 
            let temp = (min + max) / 2; 
            let descriptions = res.data.list[0].weather[0].description; 
            let pressures = res.data.list[0].main.pressure; 
            let humiditys = res.data.list[0].main.humidity; 
            let cloud = res.data.list[0].clouds.all; 
            
            console.log(temp); 
            console.log(descriptions); 
            console.log(pressures); 
            console.log(humiditys); 
            console.log(cloud); 
            
            temperature.innerHTML = `
                <img src="https://openweathermap.org/img/wn/10d@4x.png"> 
                <figcaption> 
                    <span>${parseInt(temp)}</span> 
                    <sup>o</sup> 
                </figcaption>`; 
            
            description.innerHTML = descriptions; 
            clouds.innerHTML = cloud; 
            humidity.innerHTML = humiditys; 
            pressure.innerHTML = pressures; 
            city.querySelector("figcaption").innerHTML = value; 
            
            city.querySelector("img").src = `https://flagsapi.com/${res.data.city.country}/shiny/32.png`; 
            
            if (res.data.list[0].weather[0].icon === "01n") { 
                temperature.querySelector("img").src = "moon.png"; 
                temperature.querySelector("img").style.width = "80px"; 
            } else { 
                temperature.querySelector("img").src = `https://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png`; 
            } 
            valueSearch.value = ""; 
        })
        .catch(() => { 
            main.classList.add('error'); 
            console.log(main.classList); 
            setTimeout(() => { 
                main.classList.remove('error'); 
            }, 1000); 
            valueSearch.value = ''; 
        }); 
}  

getlocation();
