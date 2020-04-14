// global scope
const cardList = document.getElementById('cardList')

function noResults(string){
  sanitize()
    const markup =
    `<h4>${string}</h4`
  cardList.insertAdjacentHTML("afterbegin", markup)
}

function searchIngredients() {
  event.preventDefault();
  loader()
  const fetchMeals = async query => {
    let response = await fetch(`/api/ingredients?ingredients=${query}`, { method: 'post' })
    let data = await response.json()
    return data
  }

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
                <img data-lazy=${meal.strMealThumb} height="275" width="275">
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
}

function searchSingleMeal() {
  event.preventDefault();
  loader()

  const fetchMeal = async query => {
    let response = await fetch(`/api?meal=${query}`, { method: 'post' })
    let data = await response.json()
    return data
  }

  let mealQuery = document.getElementById('meal').value;

  fetchMeal(mealQuery)
    .then(data => {
      sanitize()
      if(data == null || data.length < 1) {
        noResults('no results')
        return null
      } else {
        data.forEach(meal => {
          let returnMeal = new Meal(meal)
          returnMeal.render = function () {
            cardList.insertAdjacentHTML("beforeend", this.markup)
          }
          returnMeal.render()
        })
      }
      observeCardList()
    }).catch(err => {
      noResults('something went wrong on the server')
      console.log(err)
    })
}

function observeCardList () {
  // lexical scope
  var lazyCards = [].slice.call(document.querySelectorAll("li.lazy"));

  if ("IntersectionObserver" in window) {
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
    // Je kan hier een fallback schrijven voor wanneer intersection observer niet in de window beschikbaar is.
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

function Meal({ strMeal, strCategory, strMealThumb, strArea, strInstructions, strSource }) {
  this.title = strMeal
  this.category = strCategory
  this.img = strMealThumb
  this.area = strArea
  this.instructions = strInstructions
  this.src = strSource

  this.markup =
    `
    <li class="lazy">
      <section>
        <header>
          <img data-lazy=${this.img} height="275" width="275">
          <h2>${this.title}</h2>
          <h3>${this.category}</h3>
          <h4>${this.area}</h4>
        </header>
        <body>
          <p>${this.instructions}</p>
        </body>
        <footer>
          <a class="button-primary" href=${this.src}>Source</a>
        </footer>
      </section>
    </li>
  `
}