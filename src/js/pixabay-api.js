export function getImagesFromPixabay(query) {
  const KEY = '42458778-da79c0017118817650d1b611e';
  const BASE_URL = 'https://pixabay.com/api/';
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFESEARCH = true;

  const LINK = `${BASE_URL}?key=${KEY}&q=${query}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`;

  return fetch(LINK).then(response => {
    if (!response.ok) {
      throw new Error('Image error!');
    }
    return response.json();
  });
}
