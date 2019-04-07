import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Image
} from 'react-native';

import { search } from '../services/getImageCollection';
import { imageCollectionStyles } from '../styles/imageCollection'


class ImageCollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        searchTerm: "plants",
        data: [],
    };
  }

  componentDidMount() {
    this.refreshSearchTerm(this.state.searchTerm)
  }

  refreshSearchTerm = (newTerm) => {
      this.setState({
          searchTerm: newTerm,
          isLoading: true,
          data: [],
        })
      search(this.state.searchTerm)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson.results,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
        Alert.alert(
            'Oops! Something went wrong',
            'Sorry, there appears to be an issue. Please check your network connection, or try again later.',
            [{text: 'OK', onPress: () => console.log('Network Error detected on a device: ' + error.message)}, ],
        );
      });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[imageCollectionStyles.item, imageCollectionStyles.hidden]} />;
    }
    return (
      <View style={imageCollectionStyles.item}>
        <Text style={imageCollectionStyles.itemText}>{item.alt_description}</Text>
        <Image
          style={[imageCollectionStyles.image,
            {
                width: (Dimensions.get('window').width / columnCount) - 20,
                height: item.height * (((Dimensions.get('window').width / columnCount) - 20))/item.width
            }]
          }
          source={{uri: item.urls.regular}}
        />
      </View>
    );
  };

  render() {
    if(this.state.isLoading){
      return(
        <View style={imageCollectionStyles.activityIndicator}>
          <ActivityIndicator/>
        </View>
      )
    } else if (this.state.data.length == 0) {
        return(
        <View style={imageCollectionStyles.item}>
            <Text style={imageCollectionStyles.emptyResultsText}>It looks like we don't have any images that match your description. Try a different search term.</Text>
        </View>
    )
    }

    return (
      <FlatList
        data={layoutCollection(this.state.data, columnCount)}
        style={imageCollectionStyles.collectionItemContainer}
        renderItem={this.renderItem}
        numColumns={columnCount}
      />
    );
  }
}

// Thank you to Spencer Carli, whose React Native Grid View approach inspired the one here.
const columnCount = 2;
const layoutCollection = (data, columnCount) => {
  const filledRowCount = Math.floor(data.length / columnCount);

  let lastRowElementCount = data.length % columnCount;

  if (lastRowElementCount !== 0) {
    while (lastRowElementCount !== columnCount) {
      data.push({ key: `blank-${lastRowElementCount}`, empty: true });
      lastRowElementCount++;
    }
  }

  return data;
};

export default ImageCollectionView;