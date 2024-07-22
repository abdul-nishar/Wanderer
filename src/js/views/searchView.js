class SearchView {
  _parentEl = document.querySelector(".search");

  /**
   * Gets the query and radius from the search input
   * @returns {Array} - An array containing the query and radius
   */
  getQuery() {
    const radius = this._parentEl.querySelector(".search__field").value;
    const query = this._parentEl.querySelector(".dropdown__default-option").innerHTML;
    return [query, radius];
  }

  /**
   * Adds the search handler to the search form
   * @param {Function} handler - The search handler function
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
    this._dropDownHandler();
  }

  /**
   * Clears the search input field
   */
  _clearSearch() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  /**
   * Handles the dropdown functionality for selecting search options
   */
  _dropDownHandler() {
    this._parentEl.querySelector(".dropdown__default-option").addEventListener("click", (e) => {
      const el = document.querySelector(".dropdown__list");
      el.style.display = el.style.display === "block" ? "none" : "block";
    });

    this._parentEl.querySelector(".dropdown__list").addEventListener("click", function (e) {
      if (e.target && e.target.matches("li")) {
        document.querySelector(".dropdown__default-option").innerHTML = e.target.innerHTML;
        this.style.display = "none";
      }
    });
  }
}

export default new SearchView();