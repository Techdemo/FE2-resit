module.exports = {
  Paginator: function (meals, page, per_page){
    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,

    paginatedItems = meals.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(meals.length / per_page);
      return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page : null,
        total: meals.length,
        total_pages: total_pages,
        data: paginatedItems
      };
    }
}

//source: https://arjunphp.com/can-paginate-array-objects-javascript/