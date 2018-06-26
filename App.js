import React from 'react';
import Navigator from './src/Navigation/Navigator';
import Firebase from 'firebase';
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
		return (
			<Navigator />
		);
	}
}

