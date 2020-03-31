document.addEventListener("DOMContentLoaded", function () {
  // TODO: schrijf hier een scope berichtje over.
  var lazyCards = [].slice.call(document.querySelectorAll("li.lazy"));

  //TODO: progressive enhancement, check of intersectionobserver beschikbaar is voor je browser.
  if ("IntersectionObserver" in window) {
    // TODO: hier kun je ook een begrip op toepassen
    let lazyCardObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
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