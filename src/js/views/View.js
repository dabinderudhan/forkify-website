import icons from 'url:../../img/icons.svg'; // Parcel 2 // import icons

export default class View {
  _data;

  // JSDOC documentation to help others understand the code => ref. https://jsdoc.app/about-getting-started.html
  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[] } data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {object} view instance
   * @author dabinder udhan
   * @todo Finish Implementation
   */

  // method to render data
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // this will store the data of the recipe when we will run this render method.
    const markup = this._generateMarkup(); // we store the html markup of in the new variable

    if (!render) return markup;

    this._clear(); // we clear the innerhtml data of parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // we append the markup variable in the parent element
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // this will convert the string in the DOM Node Object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //selecting the DOM elements of new DOM and current DOM and converting them to an array using "Array.from()"
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(`💥 ${newEl.firstChild.nodeValue.trim()}`);
        curEl.textContent = newEl.textContent;
      }

      // update change attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // method to clear innerHTML of parent element.
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // method to render spinner
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // method to display error message on the html page
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // method to display success message on the html page
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-alert-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
