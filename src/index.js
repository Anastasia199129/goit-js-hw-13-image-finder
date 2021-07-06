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

const searchBtn = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const wrapper = document.querySelector('.wrapper');

searchBtn.addEventListener('submit', onSearchBtnClick);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

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

  // if (newsApiService.query.checkValidity() === false) {
  //   alert({
  //     type: 'error',
  //     text: 'Incorrect input!',
  //     closerHover: true,
  //     delay: 500,
  //   });
  //   return;
  // }

  newsApiService.resetPage();
  cleaningContainer();

  const chototam = await newsApiService.fechImages();
  renderHTML(chototam);
}

function renderHTML(x) {
  if (!newsApiService.query.length === 0) {
    wrapper.innerHTML = '';
    return;
  }
  const rendMarcup = createMarkup(x);
  console.log(rendMarcup);

  wrapper.insertAdjacentHTML('beforeend', rendMarcup);
}

async function onLoadMoreClick() {
  const chototam = await newsApiService.fechImages();
  renderHTML(chototam);
  loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function cleaningContainer() {
  wrapper.innerHTML = '';
}
