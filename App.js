import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

import ImageCollectionView from './src/components/ImageCollectionView';
import { UNSPLASH_API_KEY } from './secrets'


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.collectionElement = React.createRef()
  }

  search(term) {
      encodedTerm = encodeURI(term)
      return fetch('https://api.unsplash.com/search/photos?page=1&per_page=20&query=' + encodedTerm,
             { headers: {
                  'Authorization' : 'Client-ID ' + UNSPLASH_API_KEY
                  }
             })
  }

  searchTermChanged = () => {
    this.collectionElement.current.refreshSearchTerm("sming");
  }

  render() {
    return (
        <ImageCollectionView ref={this.collectionElement} collection={this.search}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
