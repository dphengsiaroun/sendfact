import React, { Component } from 'react';
import { 
	StyleSheet, 
	ImageBackground, 
	View,
	Image,
	Alert,
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
import firebase from 'firebase';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userIsConnected: true,
		};
	}

	componentDidMount() {
		this.isAuthenticated().done();
	}


	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('user_is_signed_in');
		console.log('token', token);
		if (token === null) {
			this.setState({ userIsConnected: false });
			this.props.navigation.navigate('Signin');
			Alert.alert(
				'Connexion',
				'Veuillez vous connecter.',
			)
		}
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
					<Button block info style={ProfileCss.btn} onPress={() => this.props.navigation.navigate('Camera')}>
						<Icon 
							name='camera'
							type="font-awesome" 
							color="white"/>
						<Text>Go to camera</Text>
					</Button>
					{/* <Button block style={ProfileCss.btnWarning} onPress={() => this.props.navigation.navigate('Signin')}>
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
					</Button> */}
			</View>
			</React.Fragment>
		);
	}
}


