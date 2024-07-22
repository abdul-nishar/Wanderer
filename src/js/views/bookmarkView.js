import View from "./View.js";
import previewView from "./previewView.js";

/**
 * BookmarkView class extends View to handle bookmark related functionalities.
 */
class BookmarkView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice location and bookmark it :)";

  /**
   * Generates the markup for the bookmarks list.
   * @returns {string} - HTML string of the rendered bookmarks.
   */
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }

  /**
   * Adds event listener for loading bookmarks.
   * @param {Function} handler - Event handler for the load event.
   */
  addHandlerBookmarks(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarkView();