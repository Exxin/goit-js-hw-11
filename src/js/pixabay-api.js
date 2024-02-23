
const apiKey = '42458778-da79c0017118817650d1b611e';

export async function searchImages(searchTerm) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch images');
        }

        return data.hits;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}