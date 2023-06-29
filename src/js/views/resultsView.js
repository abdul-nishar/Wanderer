import View from "./View.js";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No landmarks available for this search. Try another one.";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
