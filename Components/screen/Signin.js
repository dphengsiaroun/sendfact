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
import firebase from 'firebase';

import SigninSignUpCss from './css/SigninSignUpCss';

export default class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			userIsConnected: false,
			errorMessage: null,
			redirectToReferrer: false
		};
	}

	componentDidMount() {
		this.isAuthenticated().done();
	}

	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('user');
		console.log('token', token);
		if (token) {
			this.props.navigation.navigate('Profile');
			this.setState({ redirectToReferrer: true });
			Alert.alert(
				'Information',
				'You have been connected',
			)
		}
	}

	login = () => {
		const { email, password } = this.state;
   		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				console.log('response', response);
				if (this.state.errorMessage === null) {
					AsyncStorage.setItem('user', response.user.l);
					this.setState({userIsConnected: true});
					this.props.navigation.navigate('Camera');
				} 
			})
			.catch(error => {
				this.setState({ errorMessage: error.message })
				console.log('error', error, this.state);
			});
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
						onPress={() => this.props.navigation.history.goBack()}/>
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
							<Label style={{color: 'grey'}}>Email</Label>
							<Input 
								style={{color: 'grey'}} 
								onChangeText={(email) => this.setState({email})} 
								value={this.state.email}/>
						</Item>
						<Item style={SigninSignUpCss.item2} floatingLabel last>
							<Label style={{color: 'grey'}}>Password</Label>
							<Input 
								style={{color: 'grey'}} 
								secureTextEntry={true} 
								onChangeText={(password) => this.setState({password})} 
								value={this.state.password}/>
						</Item>
						{this.state.errorMessage &&
						<Text style={{ color: 'red', marginBottom: 15}}>
							{this.state.errorMessage}
						</Text>}
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
