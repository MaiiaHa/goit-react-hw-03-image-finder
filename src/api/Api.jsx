import axios from 'axios';

const KEY = '34588497-3719c03793052fb5df7f8aa6e';
const URL = 'https://pixabay.com/api/';

export async function fetchInput(searchInput, currentPage) {
  const options = {
    params: {
      key: KEY,
      q: searchInput,
      page: currentPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    },
  };

  const { data } = await axios.get(URL, options);
  // console.log(response); // const response = {data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
  // console.log(data); //{total: 19498, totalHits: 500, hits: Array(12)}
  return data;
}

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
