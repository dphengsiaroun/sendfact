import React from 'react';
// import Navigator from './app/navigation/Navigator';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux'; 
import Firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
// import reducers from './app/reducers';
import { config } from './env/config'
import { AppNavigator, middleware } from './app/navigation/AppNavigator';
// import { addNavigationHelpers } from 'react-navigation';
import configStore from './app/store/configStore.js';
import { NavigationActions } from 'react-navigation';
const store = configStore();

Firebase.initializeApp(config);


export default class App extends React.Component {

	// componentDidMount() {
	// 	this.authSubscription = Firebase.auth().onAuthStateChanged((user) => {
	// 	  this.setState({
	// 		loading: false,
	// 		user,
	// 	  });
	// 	});
	// }
	
	// componentWillUnmount() {
	// 	this.authSubscription();
	// }

	componentWillMount() {
		console.log('xxxx', this.props, this.state);
	}

	// isAuthenticated = async () => {
	// 	const token = await AsyncStorage.getItem('currentUser');
	// 	console.log('token', token);
	// 	if (token) {
	// 		// this.props.navigation.navigate('Camera');
	// 		this.setState({ userIsConnected: true });
	// 		Alert.alert(
	// 			'Connexion',
	// 			'Vous êtes bien connecté.',
	// 		)
	// 	}
	// }

	someEvent() {
		// call navigate for AppNavigator here:
		this.navigator && this.navigator.dispatch(
		  NavigationActions.navigate({ routeName: someRouteName })
		);
	  }

	render() {
		return (
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		);
	}
}

