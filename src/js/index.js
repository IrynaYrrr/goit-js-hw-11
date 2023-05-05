import './../css/styles.css';
import { fetchImage } from './fetchImage';

const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const inputValue = input.value.trim();
  const images = await fetchImage(inputValue);
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
}
