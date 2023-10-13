const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVlODEzOWM0MzAwMTg4MTQ1NjQiLCJpYXQiOjE2OTcxOTc1MTksImV4cCI6MTY5ODQwNzExOX0.N-PfuPqhQfUKzDpgyMnN5Z5uJCfGDzZyR7BxTqEhUF4"


const renderCars = function (arrayOfCars) {

    const row = document.getElementById('cars-row')

    arrayOfCars.forEach((car) => {

        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
        newCol.innerHTML = `
      <div class="card">
          <div style="height: 170px;">  
          <img src=${car.imageUrl} class="card-img-top h-100" alt="literally a car">
          </div>
          <div class="card-body d-flex flex-column justify-content-between" style="height: 240px;">
          <div class="d-flex flex-column justify-content-evenly">
              <h5 class="card-title">${car.name}</h5>
              <p class="card-text"><strong>${car.brand}</strong></p>
              <p class="card-text">${car.description}</p>
              <p class="card-text">Price: ${car.price}&dollar;</p>
            </div>    
              <a href="./details.html?carId=${car._id
            }" class="btn btn-primary">DETAILS</a>
          </div>
      </div>
      `
        row.appendChild(newCol)
    })
}

const hideSpinner = function () {
    const spinner = document.getElementById('loading-spinner')
    spinner.classList.add('d-none')
}

fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
        "Authorization": apiKey
    }
})
    .then((res) => {
        hideSpinner()

        if (res.ok) {
            return res.json()
        } else {
            throw new Error('Cannot contact server')
        }
    })
    .then((cars) => {
        renderCars(cars)
    })
    .catch((err) => {
        hideSpinner()
        console.log("An error occured", err)
    })