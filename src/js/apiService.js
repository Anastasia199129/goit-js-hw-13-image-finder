const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.namberPage = 1;
  }

  async fechImages(namberPage) {
    const fetchj = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.namberPage}&per_page=12&key=${API_KEY}`,
    );
    const response = await fetchj.json();
    this.incrementPage();
    return response;
  }

  resetPage() {
    this.namberPage = 1;
  }

  incrementPage() {
    this.namberPage += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
