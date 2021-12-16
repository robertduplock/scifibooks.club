/**
 * Scripts for trek books.
 */
(function() {

  var app = {};

  /**
   * Index search results.
   */
  app.search = function() {

    // Request and index documents.
    fetch('/search/index.json', {
      method: 'get',
    })
    .then((res) => res.json())
    .then((res) => {

      // Init the lunr search index.
      const idx = lunr(function () {
        this.ref('id')
        this.field('title')
        this.field('content')

        res.forEach(function (doc) {
          this.add(doc)
        }, this)
      })

      // Get the keywords.
      const urlParams = new URLSearchParams(window.location.search);
      const keywords = urlParams.get('keywords');
      const container = document.getElementById('search-results-container');

      // No keywords presented.
      if (!keywords) {
        document.getElementById('empty-search').classList.remove('dn');
        return false;
      }

      // Set the searched for term.
      document.querySelectorAll('.results-summary-term').forEach((element) => element.innerText = keywords)

      // No results.
      const results = idx.search(keywords);
      if (!results.length) {
        document.getElementById('no-results').classList.remove('dn');
        return false;
      }

      // Show the results.
      document.getElementById('results-summary').classList.remove('dn');
      document.getElementById('results-summary-count').innerText = (results.length);
      results.map(function (result) {
        const resultElement = document.getElementById(result.ref);
        container.appendChild(resultElement);
        resultElement.classList.remove('dn');
      });

      console.log(results);

    })
    .catch((err) => {
      console.log({ err });
    });
  }

  // Init the search.
  app.search();

})();
