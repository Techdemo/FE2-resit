module.exports = {
  // TODO: hier kun je vast ook iets mee in je code concept uitleg.
 numberTotalResults: function(data) {
   return `Number of results ${data.length}`
 },
 generatePagination: function(data, query) {
    let pageLimit = 8
    let dataLength = data.length / pageLimit

    let totalPages = Math.ceil(dataLength)
    let pageArr = []

    for (let i = 0; i < totalPages; i++) {
     pageArr.push({
       page: totalPages[i],
       query: query
     })
    }

    return pageArr
  }
}