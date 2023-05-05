import './../css/styles.css';

const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");

let searchValue = input.value;

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const response = await fetch(`https://pixabay.com/api/?key=36088783-799e53020b824ac98b477fb5a&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`);
  const images = await response.json();
   console.log(images);
}


// form.addEventListener("submit", async () => {
//   try {
//     const images = await fetchImg();
//     renderImgListItems(images);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchImg() {
//   const imgIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = imgIds.map(async (imgId) => {
//     const response = await fetch(`https://pixabay.com/api/?key=36088783-799e53020b824ac98b477fb5a&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`);
//     return response.json();
//   });

//   const images = await Promise.all(arrayOfPromises);
//   return images;
// }

// function renderImgListItems(images) {
//   console.log(images);
//   const markup = images
//     .map(
//       (img) => `<div class="photo-card">
//       <img src="" alt="" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b>
//         </p>
//         <p class="info-item">
//           <b>Views</b>
//         </p>
//         <p class="info-item">
//           <b>Comments</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads</b>
//         </p>
//       </div>
//     </div>`
//     )
//     .join("");
//     gallery.innerHTML = markup;
// }
