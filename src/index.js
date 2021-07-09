import './sass/main.scss';
import NewsApiService from './js/apiService';
import createMarkup from './templates/galery.hbs';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
defaultModules.set(PNotifyMobile, {});

const newsApiService = new NewsApiService();

const refs = {
  searchBtn: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  wrapper: document.querySelector('.wrapper'),
};

refs.searchBtn.addEventListener('submit', onSearchBtnClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchBtnClick(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    alert({
      type: 'error',
      text: 'Fill in the search field!',
      closerHover: true,
      delay: 1000,
    });
    return;
  }
  newsApiService.resetPage();
  cleaningContainer();

  const array = await newsApiService.fechImages();
  renderHTML(array);

  if (array.total === 0) {
    console.log(array);
    refs.loadMoreBtn.classList.add('visually-hidden');
  }
}

function renderHTML(arr) {
  const rendMarcup = createMarkup(arr);
  console.log(rendMarcup);
  console.log(rendMarcup === '');
  refs.wrapper.insertAdjacentHTML('beforeend', rendMarcup);
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function cleaningContainer() {
  refs.wrapper.innerHTML = '';
}

async function onLoadMoreClick() {
  const marcup = await newsApiService.fechImages();
  console.log(marcup);
  renderHTML(marcup);
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
