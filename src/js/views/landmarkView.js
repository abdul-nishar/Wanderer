import View from "./View.js";
import icons from "../../img/icons.svg";

/**
 * Class representing LandmarkView
 * @extends View
 */
class LandmarkView extends View {
  /**
   * @private
   */
  _parentEl = document.querySelector(".landmark") || document.createElement('div');

  /**
   * Creates markup for the LandmarkView using the state data
   * @param {object} data - This data comes from the state object in the model
   * @returns {string} - HTML string to be inserted in the parent element
   */
  _generateMarkup() {
    if (!this._data) return '';

    return `
      <div class="landmark__title rise"><h1>${this._data.name} ${this._data.type}</h1></div>
      <div class="landmark__details">
        <div class="landmark__info">
          <svg class="landmark__info-icon">
            <use href="${icons}#latitude"></use>
          </svg>
          <span class="landmark__info-data landmark__info-data--latitude">${this._data.latitude}°</span>
        </div>
        <div class="landmark__info">
          <svg class="landmark__info-icon">
            <use href="${icons}#longitude"></use>
          </svg>
          <span class="landmark__info-data landmark__info-data--longitude">${this._data.longitude}°</span>
        </div>

        <button class="btn--round btn--delete ${this._data.key ? "" : "hidden"}">
          <svg>
            <use href="${icons}#icon-delete"></use>
          </svg>
        </button>

        <div class="landmark__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>

        <button class="btn--round btn--bookmark">
          <svg>
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
          </svg>
        </button>
      </div>

      <div class="landmark__image_gallery_container">
        ${this._data.images.map(this._generateMarkupImageGallery).join("")}
      </div>
      <div class="landmark__wiki_data">
        <h2 class="heading--2">DESCRIPTION</h2>
        <h2 class="landmark__wiki_data_text">${this._data.wikiData.items[0].htmlSnippet}</h2>
        <a class="btn--small landmark__search_btn" href="${this._data.wikiData.items[0].link}" target="_blank">
          <span>Read More</span>
          <svg class="landmark__search_icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>

      <div class="landmark__address">
        <h2 class="heading--2">ADDRESS DETAILS</h2>
        <ul class="landmark__address_list">
          ${this._data.address.map(this._generateMarkupAddressDetail).join("")}
        </ul>
      </div>
    `;
  }

  /**
   * Generates markup for a single address detail
   * @param {Array} element - The address detail element
   * @returns {string} - HTML string of the address detail
   */
  _generateMarkupAddressDetail(element) {
    return `
      <li class="landmark__address_detail">
        <div class="landmark__address_detail_nature">${element[0]}</div>
        <span class="landmark__address_value"> : ${element[1]}</span>
      </li>
    `;
  }

  /**
   * Generates markup for a single image in the image gallery
   * @param {string} image - The image URL
   * @returns {string} - HTML string of the image element
   */
  _generateMarkupImageGallery(image) {
    return `
      <div class="landmark__image_element">
        <a target="_blank" href="${image}">
          <img onerror="" src="${image}" alt="Sorry the image can't be loaded" width="600" height="400">
        </a>
      </div>
    `;
  }

  /**
   * Adds event listeners for rendering the view
   * @param {Function} handler - The event handler function
   */
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  /**
   * Adds event listener for adding a bookmark
   * @param {Function} handler - The event handler function
   */
  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", this._bookmarkClickHandler.bind(this, handler));
  }

  /**
   * Handles the bookmark button click event
   * @param {Function} handler - The event handler function
   * @param {Event} e - The event object
   */
  _bookmarkClickHandler(handler, e) {
    const btn = e.target.closest(".btn--bookmark");
    if (!btn) return;
    handler();
  }
}

export default new LandmarkView();