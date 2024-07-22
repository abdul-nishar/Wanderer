import View from "./View.js";
import icons from "../../img/icons.svg";

/**
 * Class representing the pagination view
 * @extends View
 */
class PaginationView extends View {
  /**
   * @private fields
   */
  _parentEl = document.querySelector(".pagination") || document.createElement('div');

  /**
   * Generates the markup for the pagination buttons
   * @returns {string} - HTML string of the pagination buttons
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.landmarks.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numOfPages > 1) {
      return this._nextPageButtonMarkup(curPage);
    }

    if (curPage === numOfPages && numOfPages > 1) {
      return this._prevPageButtonMarkup(curPage);
    }

    if (curPage > 1 && curPage < numOfPages) {
      return this._prevPageButtonMarkup(curPage) + this._nextPageButtonMarkup(curPage);
    }

    return "";
  }

  /**
   * Adds event listener for pagination button clicks
   * @param {Function} handler - The event handler function
   */
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Generates markup for the next page button
   * @param {number} curPage - The current page number
   * @returns {string} - HTML string of the next page button
   */
  _nextPageButtonMarkup(curPage) {
    return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  /**
   * Generates markup for the previous page button
   * @param {number} curPage - The current page number
   * @returns {string} - HTML string of the previous page button
   */
  _prevPageButtonMarkup(curPage) {
    return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();