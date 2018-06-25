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
	Header, 
	Left, 
	Right, 
	Body, 
	Title 
} from 'native-base';
import { Icon } from 'react-native-elements';
import SigninSignUpCss from './css/SigninSignUpCss';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	componentWillMount() {
		this.isAuthenticated().done();
	}


	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('currentUser');
		console.log('token', token);
		if (token) {
			this.setState({ userIsConnected: true });
			this.props.navigation.navigate('Profile');
			Alert.alert(
				'Connexion',
				'Vous êtes déjà connecté.',
			)
		}
	}


	create = () => {
		const username = this.state.username;
		const password = this.state.password;
		fetch('http://192.168.1.50:3000/users/add', {
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
				Alert.alert(
					'Information',
					res.message,
					[
					  {text: 'OK', onPress: () => console.log('OK')},
					],
					{ cancelable: false }
				  )
				this.props.navigation.navigate('Home');
			} else {
				Alert.alert(
					'Information',
					res.message,
					[
					  {text: 'OK', onPress: () => console.log('OK')},
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
						name="angle-left"
						type='font-awesome'
						color="white"
						size={30}
						onPress={() => this.props.navigation.goBack()}/>
				</Left>
				<Body>
					<Title style={{color: 'white'}}>S'inscrire</Title>
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
					<Image style={SigninSignUpCss.avatar} source={require('../img/user-add.png')} />
					<Text style={SigninSignUpCss.header}>S'inscrire</Text>
					<Form>
						<Item style={SigninSignUpCss.item} floatingLabel>
							<Label style={{color: 'grey'}}>Ajouter un email</Label>
							<Input style={{color: 'grey'}} onChangeText={(username) => this.setState({username})}/>
						</Item>
						<Item style={SigninSignUpCss.item2} floatingLabel last>
							<Label style={{color: 'grey'}}>Ajouter un mot de passe</Label>
							<Input style={{color: 'grey'}} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
						</Item>
						<Button block rounded style={SigninSignUpCss.btn} onPress={this.create.bind(this)}>
							<Text style={{color: 'white'}}>Enregistrer</Text>
						</Button>
					</Form>
				</View>
			</KeyboardAvoidingView>
		</React.Fragment>
		);
	}
}
