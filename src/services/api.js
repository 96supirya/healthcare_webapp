// services/api.js
import axios from 'axios';

export const translateText = async (text, from, to) => {
    const response = await axios.post(
        'https://healthcare-webapp-seven.vercel.app/translate',
        {
            text,
            source_lang: from,
            target_lang: to,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    return response
};
