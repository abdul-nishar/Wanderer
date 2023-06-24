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
  _parentEl = document.querySelector(".recipe");

  /**
   * Creates markup for the landMarkView using the state data
   * @param {object} data this data comes from the state object in the model
   * @returns {string} to be inserted in the parent element
   */
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img src=${this._data.image} alt=${
      this._data.name
    } class="recipe__img" />
        <h1 class="recipe__title">
            <span>${this._data.name.split(",")[0]}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-globe"></use>
        </svg>
        (
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.longitude
        },</span>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.latitude
        })</span>
        
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-walk"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">4</span>
            <span class="recipe__info-text">km</span>

        </div>

        <div class="recipe__user-generated">
        <svg>
            <use href="${icons}#icon-user"></use>
        </svg>
        </div>
        <button class="btn--round">
        <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">Description</h2>
        <p class="recipe__directions-text">${this._data.description}</p>
        <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
        >
            <span>Know More</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </a>
    </div>

    <div class="recipe__ingredients">
          <h2 class="heading--2">Address Information</h2>
          <ul class="recipe__ingredient-list">
            ${Object.entries(this._data.address)
              .map((element) => {
                return `<li class="recipe__ingredient">
                <div class="recipe__quantity"><strong>${element[0]}</strong></div>
                <div class="recipe__description">
                :
                <span class="recipe__unit">${element[1]}</span>
                </div>
            </li>`;
              })
              .join("")}
          </ul>
        </div>
`;
  }
}

export default new LandmarkView();
