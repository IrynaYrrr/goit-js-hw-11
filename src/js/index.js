import './../css/styles.css';
import { fetchImage } from './fetchImage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let page = 1;
let inputRequest = '';
const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");
const buttonLoadMore = document.querySelector("button[type=button]");



buttonLoadMore.style.display = "none";

buttonLoadMore.addEventListener('click', onClickLoadMore);

form.addEventListener("submit", handleSubmit);

const galleryCards = new SimpleLightbox('.gallery a');

async function searchFn() {
  buttonLoadMore.style.display = "none";
  const inputValue = input.value.trim();

  if (inputValue === '') {
    gallery.innerHTML = '';
    return;
  }

  if (inputValue !== inputRequest) {
    gallery.innerHTML = '';
  }

  inputRequest = inputValue

  try {
    const images = await fetchImage(inputValue, page);

    if (images.hits.length === 0) {
      gallery.innerHTML = '';
      Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
        width: '300px',
        position: 'center-center',
        distance: '10px',
      });

      return;
    }

    if (images.hits.length < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.", {
        width: '300px',
        position: 'right-bottom',
        distance: '10px',
      });
    }
    else {
      buttonLoadMore.style.display = "block";
    }

    if (page === 1) {
      Notify.info(`Hooray! We found ${images.totalHits} images.`, {
        width: '300px',
        position: 'center-top',
        distance: '10px',
        timeout: 2000,
      });
    }

    renderImgList(images.hits);

  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

function renderImgList(images) {
  const markup = images
    .map((img) => {
      return `<div class="photo-card">
      <div class="img-wrap">
      <a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" /></a>
      </div>
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

  gallery.insertAdjacentHTML("beforeend", markup);


  galleryCards.refresh();

  if (page > 1) {
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.1,
      behavior: "smooth",
    });
  }


};

function onClickLoadMore(e) {
  e.preventDefault();
  page += 1;
  searchFn();
}

function handleSubmit(e) {
  e.preventDefault();
  page = 1;
  searchFn();
}
