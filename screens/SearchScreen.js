import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert
} from 'react-native';

import { SearchBar, List, ListItem } from 'react-native-elements'
// import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
var IP =  '192.168.43.208';

class FlatListItem extends React.Component {
	
	render () {
		
    // const {navigate} = this.props.navigation;
		const swipeoutBtns = 
      {
        onClose: (secId, rowId, direction) => {
					if(this.state.activeRowKey != null){
						this.setState({activeRowKey: null});
					}
        },
        onOpen:(secId, rowId, direction) => {
					this.setState({activeRowKey: this.props.item._id});

        },
        right: [
          {
            onPress: () => {
							Alert.alert(
								'Alert',
								'Are you sure you want to save this?',
								[
									{text: 'Cancel', onPress: () => console.log('Save Cancelled'), style: 'save'},
									{text: 'Save', onPress: () => {}}
						],
						
						{cancelable: true},
					)},

        autoClose: true,
        backgroundColor: '#FF7F50',
        text: 'Save', type: 'Save', 
          },
					{
            onPress: () => {
							Alert.alert(
								'Alert',
								'Are you sure you want to delete?',
								[
									{text: 'Cancel', onPress: () => console.log('Delete Cancelled'), style: 'cancel'},
									{text: 'OK', onPress: () => {
									
											fetch('http://' + IP + ':8000/api/recipes/' + this.state.activeRowKey, {
												method: 'DELETE',
												headers: {'Content-Type': 'application/json'},
											})
											.then(res => res.text()) // OR res.json()
											.then(res => console.log(res))
										
											.catch((error) => {
												console.log('Delete failed', error)
											});
								}
							}
						],
						
						{cancelable: true},
					)},

        autoClose: true,
        backgroundColor: '#CC0000',
        text: 'Delete', type: 'Delete', 
          }
        ],
        rowId: this.props.index,
        sectionId: 1,
			}
			
      return (
				<Swipeout {...swipeoutBtns} style={styles.container}>
					<TouchableWithoutFeedback onPress={() => WebBrowser.openBrowserAsync(this.props.item.url)}>
						<View style={{ flex: 1, flexDirection: 'column' }}>
							<View style={{flex: 1, flexDirection: 'row'}}>

								<Image source = {{ uri: this.props.item.image }} style={{width: 100, height: 100, margin: 5}}/>

									<View style={{flex: 1, flexDirection: 'column' }}>
										<Text style={styler.flatListItem}>{this.props.item.name}</Text>
										<Text style={styler.flatListItem}>{this.props.item.dietLabels}</Text>
									</View>	

							</View>
							<View style={{ height:1, backgroundColor:'#DCDCDC' }}/>

						</View>
					</TouchableWithoutFeedback>
				</Swipeout>
		)
	}
}

const styler = StyleSheet.create({
		flatListItem: {
			padding: 10,
			fontSize: 16
		}
})

export default class SearchScreen extends React.Component {
static navigationOptions = {
  header: null
}
	constructor(props) {
    	super(props);
    	this.state = {
      isLoading: true,
      allDataSource: null,
      dataSource: null,
      error: null
    }
    this.arrayholder = [];
  }


	componentDidMount(){
		
		return fetch('http://' + IP + ':8000/api/recipes/all')
			.then((response) => response.json())
			.then((responseJson) => {

				this.setState({
					isLoading: false,
					dataSource: responseJson,
					activeRowKey: null
				})
				// console.log(this.state.dataSource)

			})
      

			.catch((error) => {
				console.log('Parsing failed', error)
      })

  }
  // updateSearch = search => {
    
  // };
  searchFilterFunction = (search) => {
    this.setState({ search });    
    const newData = this.arrayholder.filter(item => {      
      const itemData = item.name;
      const textData = search.toUpperCase();
      
      return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ dataSource: newData });  
  };


  render() {
    var swipeoutBtns = 
      {
        autoClose: true,
        onClose: (secId, rowId, direction) => {

        },
        onOpen:(secId, rowId, direction) => {

        },
        right: [
          {
            onPress: () => {

            },
            text: 'Delete', type: 'Delete'
          }
        ],
        rowId: this.props.index,
        sectionId: 1,
      }
      const {navigate} = this.props.navigation;
      const { search } = this.state;
    return (
      

      <View style={styles.container}>

        <View style={styles.contentContainer}>
        <SearchBar 
          placeholder="Type Here"
          // onChangeText={this.updateSearch}
          value={search}
          lightTheme round
          onChangeText={search => this.searchFilterFunction(search)}
          autoCorrect={false}
          />
          </View>
          <FlatList
					data={this.state.dataSource}
					keyExtractor ={(item, index) => index.toString()}
					renderItem={({item, index}) => {
						// console.log(`Item = ${JSON.stringify(item.name)}, index = ${index}`);
						return (
              <TouchableWithoutFeedback>
                <FlatListItem 
                item={item} 
                index={index}
                >
                </FlatListItem>
              </TouchableWithoutFeedback>
						)
					}}
					>
            
				</FlatList>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#FF7F50',
  },
});
