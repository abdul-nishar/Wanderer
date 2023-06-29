class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    let radius = this._parentEl.querySelector(".search__field").value;
    const query = this._parentEl.querySelector(".default_option").innerHTML;
    return [query, radius];
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
    this._dropDownHandler();
  }

  _clearSearch() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  _dropDownHandler() {
    this._parentEl
      .querySelector(".default_option")
      .addEventListener("click", function (e) {
        const el = document.querySelector(".dropdown_list");
        el.style.display = el.style.display == "block" ? "none" : "block";
      });

    // this._parentEl.querySelector(".dropdown_list").forEach((list) => {
    //   list.addEventListener("click", console.log("meow"));
    // });
    this._parentEl
      .querySelector(".dropdown_list")
      .addEventListener("click", function (e) {
        if (e.target && e.target.matches("li")) {
          document.querySelector(".default_option").innerHTML =
            e.target.innerHTML;
          this.style.display = "none";
        }
      });
  }
}

export default new SearchView();
