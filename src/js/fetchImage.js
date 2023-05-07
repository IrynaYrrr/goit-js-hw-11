import axios from "axios";

export async function fetchImage(searchValue, page) {
  const response = await axios.get(`https://pixabay.com/api/?key=36088783-799e53020b824ac98b477fb5a&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
  const images = response.data;
  return images;
}
