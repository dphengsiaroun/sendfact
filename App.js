	import React from 'react';
	import { StyleSheet, Text, View } from 'react-native';

	import { Container, Content } from 'native-base'
	import Swiper from 'react-native-swiper'

	import Camera from './Components/Camera'
	const styles = StyleSheet.create({
	slideDefault: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB'
	},
	text: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold'
	}
	})
	export default class App extends React.Component {

	constructor() {
		super()
		this.state = {
		outerScrollEnabled: true
		}
	}

	verticalScroll = (index) => {
		if (index !== 1) {
		this.setState({
			outerScrollEnabled: false
		})
		}
		else {
		this.setState({
			outerScrollEnabled: true
		})
		}
	}

	render() {
		return (
		<Container>
				<View style={{ flex: 1 }}>
					<Camera></Camera>
				</View>
		</Container>
		);
	}
	}

