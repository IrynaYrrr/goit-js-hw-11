import './../css/styles.css';

const form = document.querySelector("#search-form");
console.dir(form);

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
}
