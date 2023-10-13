const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVlODEzOWM0MzAwMTg4MTQ1NjQiLCJpYXQiOjE2OTcxOTc1MTksImV4cCI6MTY5ODQwNzExOX0.N-PfuPqhQfUKzDpgyMnN5Z5uJCfGDzZyR7BxTqEhUF4"


const addressBarContent = new URLSearchParams(location.search)
const carId = addressBarContent.get('carId')


if (carId) {

  fetch('https://striveschool-api.herokuapp.com/api/product/' + carId, {
    method: 'GET',
    headers: {
      "Authorization": apiKey
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('ERROR')
      }
    })
    .then((car) => {
      const carName = document.getElementById('name')
      const carDescription = document.getElementById('description')
      const carBrand = document.getElementById('brand')
      const carImage = document.getElementById('imageUrl')
      const carPrice = document.getElementById('price')


      carName.value = car.name
      carDescription.value = car.description
      carBrand.value = car.brand
      carImage.value = car.imageUrl
      carPrice.value = car.price


    })
    .catch((err) => {
      console.log('errore', err)
    })
}

let methodToUse = 'POST'
if (carId) {
  methodToUse = 'PUT'
}

let urlToUse = 'https://striveschool-api.herokuapp.com/api/product/'
if (carId) {
  urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + carId
}

let alertMsg = 'SUCCESSFULLY ADDED TO THE STORE'
if (carId) {
  alertMsg = 'SUCCESSFULLY MODIFIED'
}


const myForm = document.getElementById('form')
myForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const carName = document.getElementById('name')
  const carDescription = document.getElementById('description')
  const carBrand = document.getElementById('brand')
  const carImage = document.getElementById('imageUrl')
  const carPrice = document.getElementById('price')


  const newCar = {
    name: carName.value,
    description: carDescription.value,
    brand: carBrand.value,
    imageUrl: carImage.value,
    price: carPrice.value
  }

  const restoreForm = function () {
    carName.value = ''
    carDescription.value = ''
    carBrand.value = ''
    carImage.value = ''
    carPrice.value = ''
  }




  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newCar),
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert(alertMsg)
        restoreForm()
      } else {
        alert("ERROR: contact your developer and give him some cash so can fix this")
        throw new Error("POST error")
      }
    })
    .catch((err) => {
      console.log("An error occured", err)
    })
})