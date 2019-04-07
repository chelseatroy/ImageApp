import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput, SafeAreaView} from 'react-native';

import ImageCollectionView from './src/components/ImageCollectionView';
import { UNSPLASH_API_KEY } from './secrets'


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.collectionElement = React.createRef()
    this.state = {
        input: "",
    }
  }

  search(term) {
      encodedTerm = encodeURI(term)
      return fetch('https://api.unsplash.com/search/photos?page=1&per_page=20&query=' + encodedTerm,
             { headers: {
                  'Authorization' : 'Client-ID ' + UNSPLASH_API_KEY
                  }
             })
  }

  searchTermChanged = (text) => {
    this.setState({input: text})
    this.collectionElement.current.refreshSearchTerm(text);
  }

  render() {
    return (
        <SafeAreaView style={styles.safeArea}>

           <View style={styles.container}>
                <Text style={styles.title}>Welcome to Image Browser!</Text>
                <Text style={styles.description}>We've selected some lovely plants to get you started, but you can search for any kind of image you like.</Text>
                <TextInput style={styles.searchBar}
                        placeholder="Type your image search terms..."
                        onChangeText={this.searchTermChanged}
                        value={this.state.input}
                      />
                <ImageCollectionView ref={this.collectionElement} collection={this.search}/>
           </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
   flex: 1,
   backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 5
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#228B22',
    padding: 3,
  },
  description: {
    alignItems: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderColor: '#228B22',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  }
});
