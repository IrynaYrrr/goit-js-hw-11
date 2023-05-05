import './../css/styles.css';
import { fetchImage } from './fetchImage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let page = 1;
const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");
const buttonLoadMore = document.querySelector("button[type=button]");

buttonLoadMore.style.display="none";

// console.log(buttonLoadMore);

buttonLoadMore.addEventListener('click', onClick);

form.addEventListener("submit", handleSubmit);


async function searchFn() {
  buttonLoadMore.style.display="none";
  const inputValue = input.value.trim();
  const images = await fetchImage(inputValue, page);

  console.log(images);

  if(images.hits.length === 0){
    Notify.failure('Sorry, there are no images matching your search query. Please try again.',  {
      width: '300px',
      position: 'center-center',
      distance: '10px',
    });

    return;
  }

  if(images.hits.length < 40) {
    Notify.info("We're sorry, but you've reached the end of search results.",  {
      width: '300px',
      position: 'center-bottom',
      distance: '10px',
    });
  }
  else {
    buttonLoadMore.style.display="block";
  }

  renderImgList(images.hits);
}

function renderImgList(images){
  const markup = images
      .map((img) => {
        return `<div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${img.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${img.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${img.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${img.downloads}</b>
          </p>
        </div>
      </div>`;
      })
      .join("");
      gallery.innerHTML = markup;
};

function onClick(e) {
  e.preventDefault();
  page += 1;
  searchFn();
}

function handleSubmit(e) {
  e.preventDefault();
  page = 1;
  searchFn();
}
