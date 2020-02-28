import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Image, 
  ScrollView, 
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { WebBrowser } from 'expo';
import { FlatList } from 'react-native-gesture-handler';
// import FastImage from 'react-native-fast-image';

var IP =  '192.168.0.15';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Random for a recipe    ',
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
    const swipeoutBtns = 
      {
        onClose: (secId, rowId, direction) => {
					if(this.state.activeRowKey != null){
						this.setState({activeRowKey: null});
					}
        },
        onOpen:(secId, rowId, direction) => {
					this.setState({activeRowKey: this.state.dataSource.id});

        },
        right: [
          {
            onPress: () => {
							// Alert.alert(
							// 	'Alert',
							// 	'Are you sure you want to delete this?'
							// 	[
							// 		{text: 'No', onPress: () => console.log('Delete Canceled'), style='cancel'},
							// 		{text: 'Yes', onPress: () => {

							// 		}}
							// 	],
							// 	{cancelable: true}
							// );
              WebBrowser.openBrowserAsync('https://google.co.uk');
            },
        autoClose: true,
        backgroundColor: '#FF7F50',
        text: 'Update', 
        type: 'Update', 
					},
					{
            onPress: () => {
							// Alert.alert(
							// 	'Alert',
							// 	'Are you sure you want to delete this?'
							// 	[
							// 		{text: 'No', onPress: () => console.log('Delete Canceled'), style='cancel'},
							// 		{text: 'Yes', onPress: () => {
							// 			FlatListData.splice(this.state.dataSource.index, 1)
							// 		}}
							// 	],
							// 	{cancelable: true}
							// );
              WebBrowser.openBrowserAsync('https://google.co.uk');
            },
        autoClose: true,
        backgroundColor: '#CC0000',
        text: 'Delete', 
        type: 'Delete', 
          }
        ],
        rowId: this.props.index,
        sectionId: 1,
      }

		if (this.state.isLoading) {

		return (
			<View style={[styles.container, styles.center]}>
				<ActivityIndicator animating size="large"/>
			</View>
		)

		} else {
			
			let recipes = this.state.dataSource.map((val,key) =>  {
				return <View key={key} style={styles.item}>
					<Image source = {{ uri: val.image }} style={{width: 80, height: 80}}/>
          <Text>{val.name}</Text>
				</View>
			});

		return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        	{/* <FlatList style={styles.container} contentContainerStyle={styles.contentContainer}> */}
						<Swipeout {...swipeoutBtns} style={styles.container}>
						<TouchableWithoutFeedback onPress={() => WebBrowser.openBrowserAsync(recipes.val.url)}>          
								{recipes[1]}
						</TouchableWithoutFeedback>
						</Swipeout>
						<Swipeout {...swipeoutBtns} onPress={this._handlePress} style={styles.container}>          
								{recipes[2]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>         
								{recipes[3]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>          
								{recipes[4]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[5]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>          
								{recipes[6]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[7]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[8]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[9]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[10]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[11]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[12]}
						</Swipeout>
						<Swipeout {...swipeoutBtns} style={styles.container}>
								{recipes[13]}
						</Swipeout>
						{/* </FlatList> */}
        </ScrollView>
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
