import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = '42458778-da79c0017118817650d1b611e';
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  if (searchQuery === '') {
    alert('Please enter a search term');
    return;
  }
  loader.style.display = 'block';
  fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return;
      }
      galleryContainer.innerHTML = '';
      data.hits.forEach(image => {
        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;
        galleryContainer.appendChild(img);
      });
      lightbox.refresh();
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Error fetching data:', error);
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching data. Please try again later.'
      });
    });
});
