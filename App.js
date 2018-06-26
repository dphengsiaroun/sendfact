import React from 'react';
import Navigator from './app/Navigation/Navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import Firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './app/reducers';
import { config } from './env/config'

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			userIsConnected: false,
			loading: true
		}
	}

	componentDidMount() {
		this.authSubscription = Firebase.auth().onAuthStateChanged((user) => {
		  this.setState({
			loading: false,
			user,
		  });
		});
	  }
	
	componentWillUnmount() {
		this.authSubscription();
	}

	componentWillMount() {
		Firebase.initializeApp(config);
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

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Navigator />
			</Provider>
		);
	}
}

