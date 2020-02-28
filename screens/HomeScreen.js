import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Image, 
  ScrollView, 
  ActivityIndicator,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Alert
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { WebBrowser } from 'expo';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem } from 'react-native-elements'
// import FastImage from 'react-native-fast-image';

var IP =  '192.168.43.208';

class FlatListItem extends React.Component {
	
	render () {
		
		const swipeoutBtns = 
      {
        onClose: (secId, rowId, direction) => {
					if(this.props.activeRowKey != null){
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
									{text: 'Delete', onPress: () => {
									
						
											console.log(this.state.activeRowKey)
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
	constructor(props) {
    	super(props);
    	this.state = {
			isLoading: true,
			dataSource: null,
		}
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
				// console.log(responseJson[1])

			})

			.catch((error) => {
				console.log('Parsing failed', error)
			});

  }


	render() {

		if (this.state.isLoading) {

		return (
			<View style={[styles.container, styles.center]}>
				<ActivityIndicator animating size="large"/>
			</View>
		)

		} else {
			


		return (
      <View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.contentContainer}
					data={this.state.dataSource}
					keyExtractor ={(item, index) => index.toString()}
					renderItem={({item, index}) => {
						// console.log(`Item = ${JSON.stringify(item.name)}, index = ${index}`);
						return (
								<FlatListItem 
								item={item} 
								index={index}
								>
								</FlatListItem>
						)
					}}
					>
				</FlatList>
      </View>
        )}
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
    	backgroundColor: '#FFF',
  },
  center:{
    flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
	item: {
		flex: 1,
		alignSelf: 'stretch',
    	margin: 30,
		alignItems: 'flex-start',
		justifyContent: 'center',
		// borderBottomWidth: 1,
		// borderBottomColor: '#EEE'
  },  
  contentContainer: {
    paddingTop: 30,
  }
});
