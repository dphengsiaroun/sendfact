import React, { Component } from 'react';
import { 
	View, 
	Text,
	Image,
	ActivityIndicator
} from 'react-native';
import { 
	Button, 
	Left, 
	Header, 
	Body, 
	Title, 
	Right 
} from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// import { emailChanged, passwordChanged, loginUser } from '../actions';

import SocialLoginCss from './css/SocialLoginCss';

class SocialLogin extends Component {


	render() {
		console.log('SIGNIN: this.props', this.props);
		return (
			<React.Fragment>
			<Header style={SocialLoginCss.header}>
				<Left>
					<Image
						source={require('../../assets/logo.png')}
						style={SocialLoginCss.imgHeader}/>
					<Text 
						style={SocialLoginCss.textHeader}>SENDFACT</Text>
				</Left>
				<Right>
					<Icon
						name="menu"
						type='feather'
						color="#fff"
						onPress={() => this.props.navigation.openDrawer()}/> 
				</Right>
			</Header>
			<View style={SocialLoginCss.container}>
				<View 
					style={{
						paddingVertical: 10, 
						backgroundColor: '#338F2F',
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						marginHorizontal: 10
					}}>
					<Text 
						style={{
							fontSize: 15, 
							paddingLeft: 10, 
							color: 'white',
							fontFamily: 'ArialRoundedMTBold'
						}}>S'identifier</Text>
				</View>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
					backgroundColor: 'white',
					marginHorizontal: 10,
					marginVertical: 0,
					paddingTop: 30
				}}>
					<Icon 
						reverse
						// raised
						name="google"
						type="font-awesome"
						color="#D44A35"
						size={30}
						onPress={() => this.props.navigation.navigate('Profile')}
						/>
					<Icon
						reverse
						name="facebook"
						type="font-awesome"
						color="#3C599B"
						size={30}
						onPress={() => this.props.navigation.navigate('Profile')}
						/>
				</View>
				<Text 
					style={{
						paddingVertical: 30,
						color: '#828282',
						backgroundColor: 'white',
						textAlign: 'center',
						marginHorizontal: 10,
						fontSize: 16,
						fontFamily: 'ArialRoundedMTBold'
					}}>ou</Text>
				<View style={{
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					backgroundColor: 'white',
					paddingBottom: 20,
					marginHorizontal: 10
				}}>
					
					<Button 
						block
						style={{
							padding: 10,
							marginHorizontal: 15,
							marginVertical: 5,
							backgroundColor: '#338F2F'
						}} 
						onPress={() => this.props.navigation.navigate('Signin')}>
							<Text 
								style={{
									color: '#fff', 
									fontSize: 16, 
									textAlign: 'center', 
									alignContent: 'center',
									fontFamily: 'ArialRoundedMTBold'
							}}>Connexion manuelle</Text>
					</Button>
					<Button 
						block
						transparent
						style={{
							padding: 10,
							marginHorizontal: 15,
							marginVertical: 5,
							borderWidth: 1,
							borderColor: '#338F2F'
						}} 
						onPress={() => this.props.navigation.navigate('Signup')}>
							<Text 
								style={{
									color: '#338F2F', 
									fontSize: 16, 
									textAlign: 'center', 
									alignContent: 'center',
									fontFamily: 'ArialRoundedMTBold'
							}}>Inscription manuelle</Text>
					</Button>
				</View>
			</View>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, isLoggedIn } = auth;
	return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, { })(SocialLogin);
