import { UNSPLASH_API_KEY } from '../../secrets'

export const search = (term) => {
    encodedTerm = encodeURI(term)
    return fetch('https://api.unsplash.com/search/photos?page=1&per_page=20&query=' + encodedTerm,
        { headers: {
                'Authorization' : 'Client-ID ' + UNSPLASH_API_KEY
            }
        })
}