import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const KEY = process.env.ACCESS_KEY;

const getPhoto = async (query: string) => {
    try {
        const photo = await axios.get(`https://api.unsplash.com/search/photos?client_id=${KEY}&page=1&query=${query}`);
        return photo.data.results[0].urls.small;
    } catch (error) {
        console.error();
    }
}

export default getPhoto;