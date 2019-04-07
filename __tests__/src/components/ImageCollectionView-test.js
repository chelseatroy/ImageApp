import 'react-native';
import 'isomorphic-fetch';
import React from 'react';
import {
    FlatList,
    View,
    Text
} from 'react-native';

import * as TestRenderer from 'react-test-renderer';

import mockImages from '../../fixtures'
import ImageCollectionView from '../../../src/components/ImageCollectionView';

let renderer: TestRenderer.ReactTestRenderer;
let instance: TestRenderer.ReactTestInstance;

beforeAll(() => {
  jest.doMock('react-native', () => reactNativeMock);
  renderer = TestRenderer.create( <ImageCollectionView /> );
  instance = renderer.root;
});

test( 'ImageCollectionView renders a collection of images', () => {
  fetch.mockResponseOnce(
    JSON.stringify(mockImages)
  );

   expect(instance.findAllByType(FlatList).length).toBe(1)
   expect(instance.findAllByType(Text).length).toBe(3)
});

test( 'ImageCollectionView renders an alert in the case of no images', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
    'results': [],
    })
  );

   expect(instance.findByType(Alert).findByProps({className: "emptyResultsText"}).children).toContain(["It looks like we don't have any images that match your description. Try a different search term."])
});

test( 'ImageCollectionView renders an alert in the case of a network issue', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
    'results': [],
    })
  );

   expect(instance.findByType(Alert).findByType(Text).children).toContain([
       'Oops! Something went wrong',
       'Sorry, there appears to be an issue. Please check your network connection, or try again later.',
   ])
});