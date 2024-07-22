import View from "./View.js";
import previewView from "./previewView.js";

/**
 * Class representing the results view
 * @extends View
 */
class ResultsView extends View {
  /**
   * @private fields
   */
  _parentEl = document.querySelector(".results") || document.createElement('div');
  _errorMessage = "No landmarks available for this search. Try another one.";

  /**
   * Generates the markup for the results
   * @returns {string} - HTML string of the results
   */
  _generateMarkup() {
    if (!this._data || !Array.isArray(this._data)) return this._errorMessage;

    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();