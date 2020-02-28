import React from 'react';
import { StyleSheet, Text, Number, View, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

var IP = '192.168.43.208'

class FlatListItem extends React.Component {
	
	render () {
			
		return (
		
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{flex: 1, flexDirection: 'row'}}>

						<Image source = {{ uri: this.props.item.image }} style={{width: 50, height: 50, margin: 5}}/>

							<View style={{flex: 1, flexDirection: 'column' }}>
								<Text style={styler.flatListItem}>{this.props.item.name}</Text>
								<Text style={styler.flatListItem}>{this.props.item.dietLabels}</Text>

							</View>		
					</View>
					<View style={{ height:1, backgroundColor:'#DCDCDC' }}/>

				</View>
		)
	}
}
const styler = StyleSheet.create({
	flatListItem: {
		padding: 10,
		fontSize: 16
	}
})

export default class AddScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
	constructor(props) {
    	super(props);
    	this.state = {
			isLoading: true,
			dataSource: null,
			selected: [],
			name:'',
			url:'',
			dietLabels:'',
			ingredientLines:'',
			calories:'',
			totalWeight:'',
			totalTime:''
		}
	}

	// Update TextField
	updateValue(text, field)
	{
		if(field=='name')
		{
			this.setState({
				name:text,
			})
		}
		else if(field=='url')
		{
			this.setState({
				url:text
			})
		}
		else if(field=='dietLabels')
		{
			this.setState({
				dietLabels:text
			})
		}
		else if(field=='ingredientLines')
		{
			this.setState({
				ingredientLines:text
			})
		}
		else if(field=='calories')
		{
			this.setState({
				calories:text
			})
		}
		else if(field=='totalWeight')
		{
			this.setState({
				totalWeight:text
			})
		}
		else if(field=='totalTime')
		{
			this.setState({
				totalTime:text
			})
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
				// console.log(this.state.dataSource)

			})
      

			.catch((error) => {
				console.log('Parsing failed', error)
      })

  }

	// Input current state to MongoDB collection
	add() {
		let collection = {}
		collection.name = this.state.name,
		collection.url	= this.state.url,
		collection.dietLabels	= this.state.dietLabels,
		collection.ingredientLines	= this.state.ingredientLines,
		collection.calories	= this.state.calories,
		collection.totalWeight	= this.state.totalWeight,
		collection.totalTime	= this.state.totalTime
		console.warn(collection)

		var url = 'http://'+ IP + ':8000/api/recipes/';

		fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(collection), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json'
		}
		}).then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));

	}
	
	// Update MongoDB collection using current state
	update() {

		let collection = {}
		collection.name = this.state.name,
		collection.url	= this.state.url,
		collection.dietLabels	= this.state.dietLabels,
		collection.ingredientLines	= this.state.ingredientLines,
		collection.calories	= this.state.calories,
		collection.totalWeight	= this.state.totalWeight,
		collection.totalTime	= this.state.totalTime
		console.warn(collection)

		console.log('>>>>> ' + this.state.selected[0])
		var url = 'http://' + IP + ':8000/api/recipes/' + this.state.selected[0];
		console.log(url)
		fetch(url, {
		method: 'PUT',
		body: JSON.stringify(collection), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json'
		}
		}).then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));

	}

	render() {
		return(
			
			<View style={styles.container}>
					<FlatList
						data={this.state.dataSource}
						keyExtractor ={item => item._id}
						renderItem={({item, index}) => {
							// console.log(`Item = ${JSON.stringify(item.name)}, index = ${index}`);
							return (
								<TouchableOpacity onPress={() => {
									var selected = this.state.selected
									if(selected.includes(item._id)){
										selected.length = 0
									} else if (!selected.includes(item._id)){ 
										selected.length = 0
										selected.push(item._id)
									}
									console.log(selected)
								}}>
									<FlatListItem 
									item={item} 
									index={index}
									/>
								</TouchableOpacity>
							)
						}}
						>
					</FlatList>
					<ScrollView>
						<TextInput 
						style={styles.input} 
						placeholder="Name" 
						underlineColorAndroid = "#FF7F50"
						onChangeText={(text) => this.updateValue(text,'name')}
						/>

					<View style={{
									flex: 1,
									flexDirection: 'row',
									alignItems: 'center',
						}}>

						<View>
							<TextInput
							style={styles.input}
							placeholder="Web Link"
							underlineColorAndroid = "#FF7F50"					
							onChangeText={(text) => this.updateValue(text,'url')}
							/>
							<TextInput 
							style={styles.input}
							placeholder="Diet labels" 
							underlineColorAndroid = "#FF7F50"
							onChangeText={(text) => this.updateValue(text,'dietLabels')}
							/>

						</View>

						<View>
							<TextInput 
							style={styles.input} 
							placeholder="Ingredients" 
							underlineColorAndroid = "#FF7F50"
							onChangeText={(text) => this.updateValue(text,'ingredientLines')}
							/>
							<TextInput 
							style={styles.input} 
							placeholder="Calories" 
							underlineColorAndroid = "#FF7F50"
							onChangeText={(text) => this.updateValue(parseInt(text),'calories')}
							/>
							
						</View>
						
						<View>
						<TextInput 
							style={styles.input} 
							placeholder="Total Weight" 
							underlineColorAndroid = "#FF7F50"
							onChangeText={(text) => this.updateValue(text,'totalWeight')}
							/>
							<TextInput 
							style={styles.input} 
							placeholder="Total Time" 
							underlineColorAndroid = "#FF7F50"
							onChangeText={(text) => this.updateValue(text,'totalTime')}
							/>
						</View>
					</View>

					</ScrollView>
				<SafeAreaView>
				<View style={{
								flex: 1,
								padding: 25,
								flexDirection: 'row',
								alignItems: 'center',
					}}>
						<TouchableOpacity onPress={() => this.add()} style={[styles.submitButton, styles.side, styles.center]}>
							<Text style={styles.submitText}>Add</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => this.update()} style={[styles.submitButton, styles.side, styles.center]}>
							<Text style={styles.submitText}>Update</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
				
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 23, 
		flex: 1,
		justifyContent: 'center',
    	backgroundColor: '#FFF',
	},
	center: {
		alignItems: 'center',
    	justifyContent: 'center'
	},
	submitButton: {
		backgroundColor: '#FF7F50',
		height: 40,
		width: 100,
	},
	side: {
		padding: 10,
		margin: 15,

	},
	submitText: {
		color: 'white'
	},
	input: {
		flex: 1,
		margin: 10,
		height: 40,
	},
	list: {
		backgroundColor: '#FF7F50'

	}
});
