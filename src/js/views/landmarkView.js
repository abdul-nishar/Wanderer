import View from "./View.js";
import icons from "../../img/icons.svg";

/**
 * Class representing landMarkView
 * @extends View
 */
class LandmarkView extends View {
  /**
   *@private
   */
  _parentEl = document.querySelector(".landmark");

  /**
   * Creates markup for the landMarkView using the state data
   * @param {object} data this data comes from the state object in the model
   * @returns {string} to be inserted in the parent element
   */
  _generateMarkup() {
    return `
    <div class="landmark__title rise"><h1>${this._data.name}(${
      this._data.type
    })</h1></div>
    
    <div class="landmark__details">
      <div class="landmark__info">
        <svg class="landmark__info-icon">
          <use href="${icons}#latitude"></use>
        </svg>
        <span class="landmark__info-data landmark__info-data--latitude">${
          this._data.latitude
        }°</span>
      </div>
      <div class="landmark__info">
        <svg class="landmark__info-icon">
          <use href="${icons}#longitude"></use>
        </svg>
        <span class="landmark__info-data landmark__info-data--longitude">${
          this._data.longitude
        }°</span>
      </div>

      <button class="btn--round btn--delete ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-delete"></use>
        </svg> 
      </button>

      <div class="landmark__user-generated ">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg> 
      </div>
    
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>

    <div class="landmark__image_gallery_container">
       ${this._data.images.map(this._generateMarkupImageGallery).join("")}
    </div>
    <div class="landmark__wiki_data">
      <h2 class="heading--2">DESCRIPTION</h2>
      <h2 class="landmark__wiki_data_text">${
        this._data.wikiData.items[0].htmlSnippet
      }</h2>
      <a
      class="btn--small landmark__search_btn"
      href=${this._data.wikiData.items[0].link}
      target="_blank"
    >
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

  _generateMarkupAddressDetail(element) {
    return `
      <li class="landmark__address_detail">
        <div class="landmark__address_detail_nature">${element[0]}</div>
          <span class="landmark__address_value"> : ${element[1]}</span>
      </li>
      `;
  }

  _generateMarkupImageGallery(image) {
    return `
    <div class="landmark__image_element">
    <a target="_blank" href="${image}">
      <img src="${image}" alt="Cinque Terre" width="600" height="400">
    </a>
  </div>
    `;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

export default new LandmarkView();
