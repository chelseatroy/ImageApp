import 'react-native';
import 'isomorphic-fetch';

import mockImages from '../../fixtures'
import {UNSPLASH_API_KEY} from "../../../secrets";


let mockEvent;
let mockImageList;

beforeEach(() => {
    mockEvent = {preventDefault: jest.fn()}
    mockImageList = jest.fn()

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({
            images: mockImages,
        }),
    }))
});

test('calls fetch with the correct data when initially searching for plants', () => {
    const expectedFetchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID ' + UNSPLASH_API_KEY,
        },
    }

    search(mockEvent);
    expect(window.fetch).toHaveBeenCalledWith(
        'https://api.unsplash.com/search/photos?page=1&per_page=20&query=plants',
        expectedFetchParameters
    )
});