import React, { Component } from "react";
import {
    View,
    Text,
    Image,
} from "react-native";

import { Camera, Permissions, FileSystem } from 'expo';

import { Container, Header, Item, Left, Right, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { setImagePath } from '../actions';

// const flashModeOrder = {
//     off: 'on',
//     on: 'auto',
//     auto: 'torch',
//     torch: 'off',
//   };
  

class CameraComponent extends Component {

    state = {
        // type: Camera.Constants.Type.back,
        // flash: 'off',
        permissionsGranted: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

    takePicture() {
        this.camera.takePictureAsync().then((data) => {
            var imagePath = data.uri;
            console.log('imagePath', imagePath);
            this.props.setImagePath(imagePath);
            this.props.navigation.navigate('ImagePreview', {
                imagePath: imagePath,
              });
         }).catch((err)=> console.error(err));
    }

    renderCamera() {
		console.log('CAMERA: this.props', this.props);
		console.log('CAMERA: this.state', this.state);
        return (
            <View style={{ flex: 1, }}>
                <Camera ref={ref => { this.camera = ref; }}
                        flashMode={this.state.flash}
                        style={{ flex: 1, justifyContent: 'space-between' }} 
                        type={this.state.type} >

                    <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)',}}>
                        <Left>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginLeft: 5
                                }}/>
                            <Text 
                                style={{
                                    position: 'absolute',
                                    left: 50,
                                    top: 6,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    fontFamily: 'ArialRoundedMTBold'
                                }}>SendFact</Text>
                        </Left>
                        <Right>
                            <Icon
                                name="menu"
                                type='feather'
                                color="#fff"
                                onPress={() => this.props.navigation.openDrawer()}/> 
                        </Right>
                    </Header>

                    <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            backgroundColor: 'hsla(0, 0%, 0%, 1)', 
                            paddingHorizontal: 10, 
                            marginBottom: 0,
                            paddingVertical: 10,
                            alignItems: 'flex-end' }}>
                        <View style={{ alignItems: 'center' }}> 
                            <MaterialCommunityIcons name="circle-outline" onPress={this.takePicture.bind(this)}
                                style={{ color: '#fff', fontSize: 70}}
                            ></MaterialCommunityIcons>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }

    render() {
        const { permissionsGranted } = this.state;
        if (permissionsGranted === null) {
            return <View />
        }
        else if (permissionsGranted === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                  {this.renderCamera()}
                </View>
            );
        }
    }
}

const mapStateToProps = ({ image }) => {
	const { path, error, flash, type } = image;
	return { path, error, flash, type };
};

export default connect(mapStateToProps, {setImagePath})(CameraComponent);
