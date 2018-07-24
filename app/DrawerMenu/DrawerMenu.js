import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { userLogout } from '../actions';
import { connect } from 'react-redux';

import DrawerMenuCss from './css/DrawerMenuCss';

class DrawerMenu extends Component {

    signout(){
        this.props.userLogout()
        Alert.alert(
            'Déconnexion',
            'Vous êtes bien déconnecté.',
        );
        console.log('SIGNOUT: this.props', this.props.userLogout());
    }

    renderIfUserIsNotConnected() {
        const { isLoggedIn } = this.props;
            if (!isLoggedIn) {
            return (
                <View>
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>                 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SocialLogin')} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='user-circle'
                                type='font-awesome'
                                color='#338F2F'
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='user-plus'
                                type='font-awesome'
                                color='#338F2F'
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={DrawerMenuCss.withIcon}>
                                <Icon
                                    style={DrawerMenuCss.iconWithText}
                                    name='user-circle'
                                    type='font-awesome'
                                    color='#338F2F'
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
		console.log('DRAWER_NAV: this.props', this.props);
        return (
        <View style={DrawerMenuCss.menu}>
             <View style={DrawerMenuCss.avatarContainer}>
                 <View style={DrawerMenuCss.avatarImage}>
                    <Image 
                        style={DrawerMenuCss.avatar}
                        source={require('../../assets/logo.png')}
                    />
                    <Text style={DrawerMenuCss.profile}>SendFact</Text>
                    {this.props.isLoggedIn && 
                        <Icon
                            onPress={() => this.signout()}
                            style={DrawerMenuCss.iconWithText}
                            name='power-off'
                            type='font-awesome'
                            color='white'
                        />
                    }
                 </View>
             </View>
            <ScrollView style={DrawerMenuCss.scrollContainer}>
                {this.renderIfUserIsNotConnected()}
                <View style={DrawerMenuCss.textWithIcon}>
                    <View style={DrawerMenuCss.withIcon}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={DrawerMenuCss.withIcon}>
                            <Icon
                                style={DrawerMenuCss.iconWithText}
                                name='camera'
                                type='font-awesome'
                                color='#338F2F'
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

const mapStateToProps = ({ auth }) => {
	const { isLoggedIn } = auth;
	return { isLoggedIn };
};

export default connect(mapStateToProps, { userLogout })(DrawerMenu);
