import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const searchImage = async (searchQuery, page) => {
  const response = await axios.get('/', {
    params: {
      key: '33534063-aefe13c47d2a31ce9d7a9c98c',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data;
};