import React from 'react';
import { StyleSheet, Text, Number, View, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Search for a recipe    ',
  };
	constructor(props) {
    	super(props);
    	this.state = {
			isLoading: true,
			dataSource: null,
			name:'',
			url:'',
			dietLabels:'',
			ingredientLines:'',
			calories:'',
			totalWeight:'',
			totalTime:''
		}
	}

	componentDidMount(){
 
		return fetch('http://192.168.0.15:8000/api/recipes/')
			.then((response) => response.json())
			.then((responseJson) => {

				this.setState({
					isLoading: false,
					dataSource: responseJson
				})

			})

			.catch((error) => {
				console.log('Parsing failed', error)
			});

	}

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


	submit() {
		let collection = {}
		collection.name = this.state.name,
		collection.url	= this.state.url,
		collection.dietLabels	= this.state.dietLabels,
		collection.ingredientLines	= this.state.ingredientLines,
		collection.calories	= this.state.calories,
		collection.totalWeight	= this.state.totalWeight,
		collection.totalTime	= this.state.totalTime
		console.warn(collection)
	}

	render() {
		return(
			<View style={styles.container}>
				<ScrollView>
					<TextInput 
					style={styles.input} 
					placeholder="Name" 
					underlineColorAndroid = "#FF7F50"
					onChangeText={(text) => this.updateValue(text,'name')}
					/>
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
					<TextInput 
					style={styles.input} 
					placeholder="Ingredient" 
					underlineColorAndroid = "#FF7F50"
					onChangeText={(text) => this.updateValue(text,'ingredientLines')}
					/>
					<TextInput 
					style={styles.input} 
					placeholder="Calories" 
					underlineColorAndroid = "#FF7F50"
					onChangeText={(text) => this.updateValue(parseInt(text),'calories')}
					/>
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
				
				</ScrollView>

				<TouchableOpacity onPress={() => this.submit()} style={[styles.submitButton, styles.center]}>
					<Text style={styles.submitText}>Submit</Text>
				</TouchableOpacity>
			</View>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 23, 
		flex: 1,
    	backgroundColor: '#FFF',
	},
	center:{
		alignItems: 'center',
    	justifyContent: 'center'
	},
	submitButton:	{
		backgroundColor: '#FF7F50',
		padding: 10,
		margin: 15,
		height: 40,
		width: 100,
		alignItems: 'center',
    	justifyContent: 'center'
	},
	submitText:	{
		color: 'white'
	},
	input:	{
		margin: 15,
		height: 40,
	}
});
