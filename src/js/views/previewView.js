import View from "./View.js";
import icons from "../../img/icons.svg";

/**
 * Class representing the preview view
 * @extends View
 */
class PreviewView extends View {
  /**
   * Generates the markup for the preview
   * @returns {string} - HTML string of the preview item
   */
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const { id: dataId, title = "NAMELESS", address } = this._data || {};

    return `
      <li class="preview">
        <a class="preview__link ${dataId === id ? "preview__link--active" : ""}" href="#${dataId}">
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${address}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView;

{
  /* <div class="preview__user-generated ${
                this._data.key ? "" : "hidden"
              }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg> 
              </div> */
}
