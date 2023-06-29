import View from "./View.js";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.landmarks.length / this._data.resultsPerPage
    );
    // 1) Page 1 and other pages
    if (curPage === 1 && numOfPages > 1) {
      return this._nextPageButtonMarkup(curPage);
    }
    // 2) Last page
    if (curPage === numOfPages && numOfPages > 1) {
      return this._prevPageButtonMarkup(curPage);
    }
    // 3) Other pages
    if (curPage > 1 && curPage < numOfPages) {
      return (
        this._prevPageButtonMarkup(curPage) +
        this._nextPageButtonMarkup(curPage)
      );
    }
    // 4) Page 1 and no other pages
    return "";
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _nextPageButtonMarkup(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
  }

  _prevPageButtonMarkup(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
    `;
  }
}

export default new PaginationView();
