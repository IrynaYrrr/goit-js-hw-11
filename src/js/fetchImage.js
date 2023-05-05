export async function fetchImage(searchValue) {
  const response = await fetch(`https://pixabay.com/api/?key=36088783-799e53020b824ac98b477fb5a&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`);
  const images = await response.json();
  return images;
}
