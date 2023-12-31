import View from "./View.js";
import icons from "../../img/icons.svg";

class PreviewView extends View {
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? "preview__link--active" : ""
        }" href="#${this._data.id}">
            <div class="preview__data">
              <h4 class="preview__title">${
                this._data.title ? this._data.title : "NAMELESS"
              }</h4>
              <p class="preview__publisher">${this._data.address}</p>
              
            </div>
        </a>
    </li>
    `;
  }
}

export default new PreviewView();

{
  /* <div class="preview__user-generated ${
                this._data.key ? "" : "hidden"
              }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg> 
              </div> */
}
