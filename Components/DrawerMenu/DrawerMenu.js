import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  AsyncStorage,
  Alert,
  Button
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

import DrawerMenuCss from './css/DrawerMenuCss';

export default class DrawerMenu extends Component {
    constructor(props) {
		super(props);
		this.state = {
            userIsConnected: false,
            currentUser: null
		}
    }
    
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    signout(){
		try {
			AsyncStorage.removeItem('user'); // to clear the token 
			Alert.alert(
				'Déconnexion',
				'Vous êtes bien déconnecté.'
            );
            this.props.navigation.navigate('DrawerClose');
            this.props.navigation.navigate('Signin');
			this.setState({
				userIsConnected: false
			});
		} catch (error) {
			Alert.alert(
				'Error',
				error
			);
		}
    }
    
    isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('user');
		console.log('token', token);
		if (token) {
			this.props.navigation.navigate('Profile');
			this.setState({ redirectToReferrer: true, userIsConnected: true });
        }
        return token;
	}

    renderIfUserIsConnected() {
        console.log('this.state.userIsConnected', this.state.userIsConnected);
            if (this.state.userIsConnected === false) {
            return (
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>                 
                        <TouchableOpacity onPress={(this.navigateToScreen('Signin'))} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='user-circle'
                                type='font-awesome'
                                color='hsla(46, 84%, 61%, 1)'
                            />
                            <Text style={DrawerMenuCss.text}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon
                        style={DrawerMenuCss.rightIcon}
                        name="angle-right"
                        type='font-awesome'
                        color="#8996A0"
                    />
                </View>
            );
        } else {
            return(
                <View>
                    <View style={DrawerMenuCss.textWithIcon}>
                        <View style={DrawerMenuCss.withIcon}>
                            <TouchableOpacity onPress={(this.navigateToScreen('Profile'))} style={DrawerMenuCss.withIcon}>
                                <Icon
                                    style={DrawerMenuCss.iconWithText}
                                    name='user-circle'
                                    type='font-awesome'
                                    color='hsla(46, 84%, 61%, 1)'
                                />
                                <Text style={DrawerMenuCss.text}>Mon Profil</Text>
                            </TouchableOpacity>
                        </View>
                        <Icon
                            style={DrawerMenuCss.rightIcon}
                            name="angle-right"
                            type='font-awesome'
                            color="#8996A0"
                        />
                    </View>
                </View>
            );
        }
    }
    
    render() {
        console.log('Drawer menu props', this.props.navigation);
        console.log('Drawer menu state', this.state);
        return (
        <View style={DrawerMenuCss.menu}>
             <View style={DrawerMenuCss.avatarContainer}>
                 <View style={DrawerMenuCss.avatarImage}>
                    <Image 
                        style={DrawerMenuCss.avatar}
                        source={require('../../assets/logo.png')}
                    />
                    <Text style={DrawerMenuCss.profile}>SendFact</Text>
                    <Icon
                        onPress={() => this.signout()}
                        style={DrawerMenuCss.iconWithText}
                        name='power-off'
                        type='font-awesome'
                        color='white'
                    />
                 </View>
             </View>
            <ScrollView style={DrawerMenuCss.scrollContainer}>
                {this.renderIfUserIsConnected()}
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>
                        <TouchableOpacity onPress={(this.navigateToScreen('Camera'))} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='camera'
                                type='font-awesome'
                                color='hsla(46, 84%, 61%, 1)'
                            />
                            <Text style={DrawerMenuCss.text}>Ajouter une facture</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon
                        style={DrawerMenuCss.rightIcon}
                        name="angle-right"
                        type='font-awesome'
                        color="#8996A0"
                    />
                </View>
                
             </ScrollView>
         </View>
     );
    }
}
