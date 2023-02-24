const axios = require('axios').default;

const API_KEY = `33868959-c90ef2f8a68881f2755b75c20`;
const API_URL = `https://pixabay.com/api/`;

export default class fetchImg {
  constructor() {
    this.image_type = `photo`;
    this.orientation = `horizontal`;
    this.query = ``;
    this.safesearch = true;
    this.page = 1;
    this.per_page = 30;
  }

  async fetchImg() {
    const URL = `${API_URL}?key=${API_KEY}&q=${this.query}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  currentHits() {
    return this.page * this.per_page;
  }

  get getQuery() {
    return this.query;
  }

  set setQuery(newQuery) {
    this.query = newQuery;
  }
}
