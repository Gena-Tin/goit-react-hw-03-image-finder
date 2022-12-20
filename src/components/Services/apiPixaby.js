import axios from 'axios';

const KEY = '31354744-e6340b12404bc1f4908fb1f36';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

export default fetchImages;
