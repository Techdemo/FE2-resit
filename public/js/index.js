// global scope
var cardList = document.getElementById('cardList')

function noResults(string){
  sanitize()
    const markup =
    `<h4>${string}</h4`
  cardList.insertAdjacentHTML("afterbegin", markup)
}

function searchIngredients() {
  event.preventDefault();
  loader()
  let formCollection = document.forms.ingredientForm
  let formData = new FormData(formCollection).getAll('ingredients')
  let ingredientQuery = formData.toString()

  fetchMeals(ingredientQuery)
  .then(data => {
    sanitize()
    if (data == null || data.length < 1) {
      noResults('no results')
      return null
    } else {
      data.forEach(meal => {
        const markup =
          `
          <li class="lazy">
            <section>
              <header>
                <img src=${meal.strMealThumb} height="275" width="275">
                <h2>${meal.strMeal}</h2>
              </header>
            </section>
          </li>
       `
        cardList.insertAdjacentHTML("beforeend", markup)
        observeCardList()
      })
    }
  }).catch(err => {
    noResults('something went wrong on the server')
    console.log(err)
  })

  const fetchMeals = async query => {
    let response = await fetch(`/api/ingredients?ingredients=${query}`, { method: 'post' })
    let data = await response.json()
    return data
  }
}

function searchSingleMeal() {
  event.preventDefault();
  loader()

  let mealQuery = document.getElementById('meal').value;

  const fetchMeal = async query => {
    let response = await fetch(`/api?meal=${query}`, { method: 'post' })
    let data = await response.json()
    return data
  }

  fetchMeal(mealQuery)
    .then(data => {
      sanitize()
      if(data == null || data.length < 1) {
        noResults('no results')
        return null
      } else {
        data.forEach(meal => {
          const markup =
            `
          <li class="lazy">
            <section>
              <header>
                <img data-lazy=${meal.strMealThumb} height="275" width="275">
                <h2>${meal.strMeal}</h2>
                <h3>${meal.strCategory}</h3>
                <h4>${meal.strArea}</h4>
              </header>
              <body>
                <p>${meal.strInstructions}</p>
              </body>
              <footer>
                <a class="button-primary" href=${meal.strSource}>Source</a>
              </footer>
            </section>
          </li>
       `
          cardList.insertAdjacentHTML("beforeend", markup)
        })
      }
      observeCardList()
    }).catch(err => {
      noResults('something went wrong on the server')
      console.log(err)
    })
}

function observeCardList () {
  // TODO: schrijf hier een scope berichtje over.
  var lazyCards = [].slice.call(document.querySelectorAll("li.lazy"));

  //TODO: progressive enhancement, check of intersectionobserver beschikbaar is voor je browser.
  if ("IntersectionObserver" in window) {
    // TODO: hier kun je ook een begrip op toepassen
    let lazyCardObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyCard = entry.target;
          let img = lazyCard.querySelector('img')
          let src = img.getAttribute('data-lazy')
          img.setAttribute('src', src)

          lazyCard.classList.remove("lazy");
          lazyCard.classList.add("fade-in")

          lazyCardObserver.unobserve(lazyCard);
        }
      });
    });

    lazyCards.forEach(function (lazyImage) {
      lazyCardObserver.observe(lazyImage);
    });
  } else {
    return null
    // TODO: Write fallback for when intersection observer is not in hte window
  }
};

// hoisting
function loader() {
  sanitize()
  const markup =
    `<div class="loader">Loading..</div>`
  cardList.insertAdjacentHTML("afterbegin", markup)
}

function sanitize(){
  cardList.innerHTML = ''
}