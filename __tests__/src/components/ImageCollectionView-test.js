import 'react-native';
import 'isomorphic-fetch';
import React from 'react';
import { FlatList, View, Text } from 'react-native';

import * as TestRenderer from 'react-test-renderer';

import ImageCollectionView from './ImageCollectionView';

let renderer: TestRenderer.ReactTestRenderer;
let instance: TestRenderer.ReactTestInstance;

beforeAll(() => {
  renderer = TestRenderer.create( <ImageCollectionView /> );
  instance = renderer.root;
});

test( 'ImageCollectionView renders a collection of images', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
    'results': [
          {
            'key': 'crocodile',
            'alt_description' : '🦓',
            'width': 50,
            'height': 50,
            'urls': { 'regular' : 'www.chelseatroy.com' }
          },
          {
            'key': 'monkey',
            'alt_description': '🐒',
            'width': 50,
            'height': 50,
            'urls': { 'regular' : 'www.chelseatroy.com' }
          },
          {
            'key': 'zebra',
            'alt_description' : '🐊',
            'width': 50,
            'height': 50,
            'urls': { 'regular' : 'www.chelseatroy.com' }
          },
         ],
    })
  );

   expect(instance.findAllByType(FlatList).length).toBe(1)
   expect(instance.findAllByType(Text).length).toBe(3)
});

test( 'ImageCollectionView renders a collection of images', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
    'results': [],
    })
  );

   expect(instance.findByType(Alert).findByType(Text).children).toBe(["Sorry — we can't find any images of that! Please try another search term."])
});

test( 'ImageCollectionView renders a collection of images', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
    'results': [],
    })
  );

   expect(instance.findByType(Alert).findByType(Text).children).toBe(["Sorry — we're having trouble searching right now. Please try again later."])
});