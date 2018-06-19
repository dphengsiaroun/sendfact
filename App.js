	import React from 'react';
	import { StyleSheet, View } from 'react-native';
	import { Container, Content } from 'native-base'
	import Navigator from './Components/navigation/Navigator';

	export default class App extends React.Component {

	constructor() {
		super();
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

