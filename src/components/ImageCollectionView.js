import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';

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
          searchTerm: newTerm
      })
      this.props.collection(this.state.searchTerm)
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
      });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.hidden]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.alt_description}</Text>
        <Image
          style={[styles.image,
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
        <View style={styles.activityIndicator}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <FlatList
        data={layoutCollection(this.state.data, columnCount)}
        style={styles.container}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  item: {
    borderRadius: 10,
    backgroundColor: '#32CD3270',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 4,
    padding: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#228B22',
  },
  hidden: {
    backgroundColor: 'transparent',
  },
  activityIndicator: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  }
});

export default ImageCollectionView;