	import React from 'react';
	import { StyleSheet, View } from 'react-native';
	import { Container, Content } from 'native-base'
	import Navigator from './Components/Navigation/Navigator';
	import firebase from 'firebase';

	export default class App extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		var config = {
			apiKey: "AIzaSyDK9f2Dh5fItWfpLmNeqCzvdSCFuy7N9Bk",
			authDomain: "authentication-5a323.firebaseapp.com",
			databaseURL: "https://authentication-5a323.firebaseio.com",
			projectId: "authentication-5a323",
			storageBucket: "authentication-5a323.appspot.com",
			messagingSenderId: "647683589919"
		  };
		firebase.initializeApp(config);
	}

	render() {
		return (
		<Container>
				<View style={{ flex: 1 }}>
					<Navigator />
				</View>
		</Container>
		);
	}
	}

