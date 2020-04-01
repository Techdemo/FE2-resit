//TODO: cardList staat in de global scope
var cardList = document.getElementById('cardList')

const sanitize = () => {
  cardList.innerHTML = ''
}

const noResults = (string) => {
  sanitize()
    const markup =
    `<h4>${string}</h4`
  cardList.insertAdjacentHTML("afterbegin", markup)
}

const loader = () => {
  sanitize()
  const markup =
    `<div class="loader">Loading..</div>`
  cardList.insertAdjacentHTML("afterbegin", markup)
}


function myFunction() {
  event.preventDefault();
  loader()

  let mealQuery = document.getElementById('meal').value;

 const fetchMeal = async query => {
   let response = await fetch(`/api?meal=${query}`, { method: 'post' })
    let data = await response.json()
    return data

// TODO: hier zou je kunnen checken of data een response heeft. Op basis daarvan geef je een succes of een false terug.
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
                <img src=${meal.strMealThumb} height="275" width="275">
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
    }).catch(err => {
      noResults('something went wrong on the server')
      console.log(err)
    })
}

document.addEventListener("DOMContentLoaded", function () {
  // TODO: schrijf hier een scope berichtje over.
  var lazyCards = [].slice.call(document.querySelectorAll("li.lazy"));

  //TODO: progressive enhancement, check of intersectionobserver beschikbaar is voor je browser.
  if ("IntersectionObserver" in window) {
    // TODO: hier kun je ook een begrip op toepassen
    let lazyCardObserver = new IntersectionObserver(function (entries, observer) {
      console.log("joejoe")
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          console.log(entry, "is intersection")
          let lazyCard = entry.target;
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
  }
});