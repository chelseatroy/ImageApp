import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    SafeAreaView
} from 'react-native';

import ImageCollectionView from './src/components/ImageCollectionView';
import { mainScreenStyles } from './src/styles/mainScreen'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.collectionElement = React.createRef()
    this.state = {
        input: "",
    }
  }

  searchTermChanged = (text) => {
    this.setState({input: text})
    this.collectionElement.current.refreshSearchTerm(text);
  }

  render() {
    return (
        <SafeAreaView style={mainScreenStyles.safeArea}>

           <View style={mainScreenStyles.container}>
                <Text style={mainScreenStyles.title}>Welcome to Image Browser!</Text>
                <Text style={mainScreenStyles.description}>We've selected some lovely plants to get you started, but you can search for any kind of image you like.</Text>
                <TextInput style={mainScreenStyles.searchBar}
                        placeholder="Type your image search terms..."
                        onChangeText={this.searchTermChanged}
                        value={this.state.input}
                      />
                <ImageCollectionView ref={this.collectionElement}/>
           </View>
        </SafeAreaView>
    );
  }
}
