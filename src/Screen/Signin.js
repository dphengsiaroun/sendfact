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
		};
	}

	componentDidMount() {
		this.isAuthenticated().done();
	}

	// isAuthenticated = async () => {
	// 	const token = await AsyncStorage.getItem('currentUser');
	// 	console.log('token', token);
	// 	if (token) {
	// 		this.setState({ userIsConnected: true });
	// 		this.props.navigation.navigate('Profile');
	// 		Alert.alert(
	// 			'Connexion',
	// 			'Vous êtes déjà connecté.',
	// 		)
	// 	}
	// }

	isSignedIn = () => {
		return new Promise((resolve, reject) => {
		  AsyncStorage.getItem('currentUser')
			.then(res => {
			  if (res !== null) {
				resolve(true);
			  } else {
				resolve(false);
			  }
			})
			.catch(err => reject(err));
		});
	};

	login = () => {
		const { email, password } = this.state;
   		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				console.log('response', response);
				if (this.state.errorMessage === null) {
					AsyncStorage.setItem('currentUser', response.user.l);
					this.setState({ userIsConnected:'true' })
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
				<Left/>
				<Body>
					<Title style={{color: 'white'}}>Connexion</Title>
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
					<Text style={SigninSignUpCss.header}>Connexion</Text>
					<Form>
						<Item style={SigninSignUpCss.item} floatingLabel>
							<Label style={{color: 'grey'}}>Email</Label>
							<Input 
								style={{color: 'grey'}} 
								onChangeText={(email) => this.setState({email})} 
								value={this.state.email}/>
						</Item>
						<Item style={SigninSignUpCss.item2} floatingLabel last>
							<Label style={{color: 'grey'}}>Mot de passe</Label>
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
						<Button block rounded style={SigninSignUpCss.btn} onPress={this.login.bind(this)}>
							<Text style={{color: '#fff'}}>Connexion</Text>
						</Button>
						<Button transparent style={SigninSignUpCss.btnOutline} onPress={() => this.props.navigation.navigate('Signup')}>
							<Text style={{color: '#2488ff'}}>Pas encore de compte ? S'inscrire.</Text>
						</Button>
					</Form>
				</View>
			</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}
