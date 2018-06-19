import React, { Component } from 'react';
import { 
	StyleSheet, 
	Alert,
	View, 
	Text,
	Image,
	KeyboardAvoidingView,
	AsyncStorage 
} from 'react-native';
import { 
	Button, 
	Form, 
	Item, 
	Input, 
	Label, 
	Left, 
	Header, 
	Body, 
	Title, 
	Right 
} from 'native-base';
import { Icon } from 'react-native-elements';
import SigninSignUpCss from './css/SigninSignUpCss';

export default class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userIsConnected: false
		};
	}

	componentDidMount() {
		this._loadInitialState().done();
	}

	_loadInitialState = async () => {
		const value = await AsyncStorage.getItem('user');
		// alert(value);
		if (value !== null) {
			this.props.navigation.navigate('Home');
			Alert.alert(
				'Information',
				'You have been connected',
			)
		}
	}

	login = () => {
		const username = this.state.username;
		const password = this.state.password;
		fetch('http://localhost:3000/users/retrieve', {
			method: 'POST',
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
				this.props.userIsConnected = true;
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
					<Title style={{color: 'white'}}>Sign In</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
				</Right>
			</Header>
			<KeyboardAvoidingView behavior='padding' style={SigninSignUpCss.wrapper}>
				<View style={SigninSignUpCss.container}>
					<Image style={SigninSignUpCss.avatar} source={require('../img/user.png')} />
					<Text style={SigninSignUpCss.header}>Sign In</Text>
					<Form>
						<Item style={SigninSignUpCss.item} floatingLabel>
							<Label style={{color: 'grey'}}>Username</Label>
							<Input style={{color: 'grey'}} onChangeText={(username) => this.setState({username})}/>
						</Item>
						<Item style={SigninSignUpCss.item} floatingLabel last>
							<Label style={{color: 'grey'}}>Password</Label>
							<Input style={{color: 'grey'}} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
						</Item>
						<Button block style={SigninSignUpCss.btn} onPress={this.login.bind(this)}>
							<Text style={{color: '#fff'}}>Sign In</Text>
						</Button>
						<Button bordered block style={SigninSignUpCss.btnOutline} onPress={() => this.props.navigation.navigate('Signup')}>
							<Text style={{color: '#2488ff'}}>Sign Up ?</Text>
						</Button>
					</Form>
				</View>
			</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}
