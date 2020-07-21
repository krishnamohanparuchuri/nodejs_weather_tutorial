const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const weatherDesc = document.querySelector('#weatherDesc')

errorMessage.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    errorMessage.textContent = 'Loading data...'
    weatherDesc.textContent = '';
    weatherData(location);
})

const weatherData = (location) => {
    fetch('/weather?address=' + location)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        errorMessage.textContent = data.error
                    } else {
                        errorMessage.textContent = data.place
                        weatherDesc.textContent = data.forecast

                    }
                })
        })
}