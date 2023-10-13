const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVlODEzOWM0MzAwMTg4MTQ1NjQiLCJpYXQiOjE2OTcxOTc1MTksImV4cCI6MTY5ODQwNzExOX0.N-PfuPqhQfUKzDpgyMnN5Z5uJCfGDzZyR7BxTqEhUF4"

const addressBarContent = new URLSearchParams(location.search)
const carId = addressBarContent.get('carId')


const removeCar = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + carId, {
        method: 'DELETE',
        headers: {
            "Authorization": apiKey
        }
    })
        .then((res) => {
            if (res.ok) {
                alert('VEHICLE REMOVED FROM THE STORE')
                location.assign('./home.html')
            } else {
                alert("A problem occured")
                throw new Error('Error')
            }
        })
        .catch((err) => {
            console.log('ERROR', err)
        })
}

const generateCarDetails = function (car) {
    const row = document.getElementById('car-details')
    row.innerHTML = `
          <div class="col col-12 col-lg-6">
              <h2 class="text-center">${car.brand} ${car.name} - in detail</h2>
              <img
                src=${car.imageUrl}
                class="w-100"
                alt="generic concert picture"
              />
              <p>
                ${car.description}
              </p>
              <p>Prezzo: ${car.price}€</p>
              <button class="btn btn-danger" onclick="removeCar()">REMOVE FROM STORE</button>
              <a class="btn btn-warning" href="./backoffice.html?carId=${car._id
        }">MANAGE OFFER</a>
          </div>
      `
}

const getCarDetails = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + carId, {
        headers: {
            "Authorization": apiKey
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('An error occured')
            }
        })
        .then((carData) => {
            generateCarDetails(carData)
        })
        .catch((err) => console.log('ERROR', err))
}

getCarDetails()