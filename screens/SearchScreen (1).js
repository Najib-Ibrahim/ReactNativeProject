import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SearchBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
var IP =  '192.168.0.15';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search for a recipe    ',
  };
	constructor(props) {
    	super(props);
    	this.state = {
			isLoading: true,
      dataSource: null,
      search: ''
		}
  }
  
  updateSearch = search => {
    this.setState({ search });
  };

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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    )
  }

  renderHeader = () => {
    const { search } = this.state;

    return( 
      <SearchBar 
        placeholder="Type Here"
        onChangeText={this.updateSearch}
        value={search}
        />
    )
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}>
        <ActivityIndicator animating size="large"/>
      </View>
  }

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
    
    return (
      <View style={styles.container}>
{/* 
        <View style={styles.container}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
 
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Swipeout {...swipeoutBtns}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text >
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
          </Swipeout>
          
        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>


        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me too</Text>
          </View>
        </Swipeout>

        
        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>

        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>
        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>
        <Swipeout {...swipeoutBtns}>
          <View>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
