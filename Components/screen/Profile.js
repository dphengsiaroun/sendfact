import React, { Component } from 'react';
import { 
	StyleSheet, 
	ImageBackground, 
	View,
	Image,
	AsyncStorage
} from 'react-native';
import { 
	Button, 
	Container, 
	Content, 
	Text,
	Header,
	Left, 
	Right, 
	Body, 
	Title 
} from 'native-base';
import { Icon } from 'react-native-elements';
import ProfileCss from './css/ProfileCss';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userIsConnected: true,
		};
	}

	componentWillMount() {
		const userIsConnected = AsyncStorage.getItem('user');
		if (userIsConnected) {
			this.setState({
				userIsConnected: true
			});
		}
	}

	deleteUser() {
		const username = this.state.username;
		const password = this.state.password;
		fetch('http://localhost:3000/users/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
		.then((response) => response.json())
		.then((res) => {
			if (res.success === true) {
				AsyncStorage.setItem('user', res.user);
				this.props.navigation.navigate('Home');
			} else {
				Alert.alert(
					'Information',
					res.message,
					[
					  {text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{ cancelable: false }
				  )
				console.log(res);
			}
		})
		.done();
	}


	render() {
		console.log('profile', this.props.navigation);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#efc848'}}>
				<Left>
					<Icon 
						name="chevron-left"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.goBack()}/>
				</Left>
				<Body>
					<Title style={{color: 'white'}}>Profile</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
				</Right>
			</Header>
			<View style={ProfileCss.container}>
				<Image style={ProfileCss.avatar} source={require('../img/user.png')} />				
				<Text style={ProfileCss.text}>Welcome</Text>
				<Text style={ProfileCss.name}>Dany !</Text>
					<Button block info style={ProfileCss.btn} onPress={() => this.props.navigation.navigate('Home')}>
						<Icon 
							name='home'
							type="font-awesome" 
							color="white"/>
						<Text>Home</Text>
					</Button>
					<Button block style={ProfileCss.btnWarning} onPress={() => this.props.navigation.navigate('Signin')}>
						<Icon 
							name='cog' 
							type="font-awesome" 
							color="white"/>
						<Text>Edit my profile</Text>
					</Button>
					<Button block style={ProfileCss.btnDanger} onPress={() => this.props.navigation.navigate('Signin')}>
						<Icon 
							name='trash'
							type="font-awesome"
							color="white" />
						<Text>Delete my account</Text>
					</Button>
			</View>
			</React.Fragment>
		);
	}
}


