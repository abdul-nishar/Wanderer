import icons from "../../img/icons.svg";

/**
 * Class representing parent which is used to create child classes
 */
export default class View {
  /**
   * Clears the parent element
   */
  _clear() {
    this._parentEl.innerHTML = "";
  }

  /**
   *
   * @param {object} data - Returns the markup if render parameter is false else inserts the markup in the parent element
   * @param {boolean} [render=true] - Optional parameter to return or render the markup
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   *
   * @param {object} data
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  /**
   * Inserts the spinner markup in the parent element
   */
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
          `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Inserts the error markup in the parent element
   * @param {string} [message=this._errorMessage]
   */
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <div>
              <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Inserts the message markup in the parent element
   * @param {string} [message=this._message]
   */
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
              <div>
              <svg>
                  <use href="${icons}#icon-smile"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
