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

import DrawerMenuCss from './css/DrawerMenuCss';

export default class DrawerMenu extends Component {
    constructor(props) {
		super(props);
		this.state = {
            userIsConnected: false
		}
    }

    componentDidMount() {
        // this.isAuthenticated().done();
	}
    
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    // isAuthenticated = () => {
	// 	const token = AsyncStorage.getItem('currentUser');
	// 	console.log('token', token);
	// 	if (token) {
	// 		this.setState({ userIsConnected: true });
	// 		// this.props.navigation.navigate('Camera');
	// 	} else {
	// 		this.setState({ userIsConnected: false });            
    //     }
	// }

    signout(){
		try {
			AsyncStorage.removeItem('currentUser'); // to clear the token 
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

    renderIfUserIsConnected() {
        console.log('xxxxx', this.state.userIsConnected);
            if (this.state.userIsConnected === false) {
            return (
                <View>
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
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>                 
                        <TouchableOpacity onPress={(this.navigateToScreen('Signup'))} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='user-plus'
                                type='font-awesome'
                                color='hsla(46, 84%, 61%, 1)'
                            />
                            <Text style={DrawerMenuCss.text}>S'inscrire</Text>
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
