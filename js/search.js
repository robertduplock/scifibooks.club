/**
 * Scripts for trek books.
 */
(function() {

  let app = {};

  /**
   * Index search results.
   */
  app.search = function() {

    // Request and index documents.
    fetch('/search/index.json', {
      method: 'get',
    })
    .then((response) => response.json())
    .then((response) => {

      // Init the lunr search index.
      const idx = lunr(function () {
        this.ref('id')
        this.field('title')
        this.field('content')
        this.field('tags')
        this.metadataWhitelist = ['position']

        response.forEach(function (doc) {
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
      results.map((result) => {
        response.map((responseItem) => {
          if (result.ref === responseItem.id) {
            container.insertAdjacentHTML('beforeend', app.searchTemplate(responseItem));
          }
        })
      });

    })
    .catch((err) => {
      console.log({ err });
    });
  }

  /**
   * Renders a search result teaser.
   *
   * @param data
   *   An object of data for the element.
   */
  app.searchTemplate = (data) => {
    return `
      <div class="pa2 pa3-ns bb b--black-20" id="${data.id}">
        <a class="link dark-gray flex" href="${data.id}">
          <span class="b f4">${data.title}</span>
          <span class="pt1 ml2">${data.section.charAt(0).toUpperCase() + data.section.slice(1)}</span>
        </a>
        <p>${data.summary}</p>
      </div>
    `;
  }

  // Init the search.
  app.search();

})();
