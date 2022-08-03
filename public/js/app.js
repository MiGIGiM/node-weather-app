
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const msgOne = document.getElementById('msgOne');

const msgTwo = document.getElementById('msgTwo');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  msgOne.textContent = 'loading...'
  msgTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) { 
        msgOne.textContent = data.error;
        msgTwo.textContent = '';
      }

      if (data.forecast) {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    })
  })
})