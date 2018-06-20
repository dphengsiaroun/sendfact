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
				'Information',
				'You have been logged out.'
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
			this.setState({ redirectToReferrer: true });
		}
	}

    renderIfUserIsConnected() {
            if (this.state.currentUser === true) {
            return (
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>                 
                        <TouchableOpacity onPress={(this.navigateToScreen('Signin'))} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='user'
                                type='font-awesome'
                                color='hsla(46, 84%, 61%, 1)'
                            />
                            <Text style={DrawerMenuCss.text}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon
                        style={DrawerMenuCss.rightIcon}
                        name="angle-right"
                        type='font-awesome'
                        color="#222"
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
                                    name='user'
                                    type='font-awesome'
                                    color='hsla(46, 84%, 61%, 1)'
                                />
                                <Text style={DrawerMenuCss.text}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <Icon
                            style={DrawerMenuCss.rightIcon}
                            name="angle-right"
                            type='font-awesome'
                            color="#222"
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
                            <Text style={DrawerMenuCss.text}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                    <Icon
                        style={DrawerMenuCss.rightIcon}
                        name="angle-right"
                        type='font-awesome'
                        color="#222"
                    />
                </View>
                
             </ScrollView>
         </View>
     );
    }
}
