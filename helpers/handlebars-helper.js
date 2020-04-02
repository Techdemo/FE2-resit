module.exports = {
  // TODO: hier kun je vast ook iets mee in je code concept uitleg.
 numberTotalResults: function(data) {
   return `Number of results ${data.length}`
 },
 generatePagination: function(data) {
    let pageLimit = 8
    let dataLength = data.length / pageLimit

    let totalPages = Math.ceil(dataLength)
    let pageArr = []

    for (let i = 1; i < totalPages; i++) {
      pageArr.push({
        page: i
      })
    }
      return pageArr
  }
}