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

// const flashModeOrder = {
//     off: 'on',
//     on: 'auto',
//     auto: 'torch',
//     torch: 'off',
//   };
  

class CameraComponent extends Component {

    state = {
        type: Camera.Constants.Type.back,
        flash: 'off',
        path: null,
        permissionsGranted: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

    takePicture() {
        this.camera.takePictureAsync().then((data) => {
            var imagePath = data.uri;
            // console.log('imagePath', imagePath);
            this.props.navigation.navigate('ImagePreview', {
                imagePath: imagePath,
              });
         }).catch((err)=> console.error(err));
    }

    addText() {
        console.log('Add Text');
    }

    renderCamera() {
		console.log('CAMERA: this.state, this.props', this.state, this.props);
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
                                    fontSize: 17
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

    renderPreviewImage() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                    <Left>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{
                            width: 35,
                            height: 35,
                            marginLeft: 5
                        }}
                    />
                    <Text 
                        style={{
                            position: 'absolute',
                            left: 50,
                            top: 6,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}>SendFact</Text>
                    </Left>
                    <Right>
                    <Icon
                        name="menu"
                        type="feather"
                        color="white"
                        onPress={() => this.props.navigation.openDrawer()}/> 
                    </Right>
                </Header>
                <Image
                    source={{uri : this.state.path}}
                    style={{
                        width: '90%',
                        height: '71%',
                        marginHorizontal: '5%',
                        marginTop: '5%',
                        borderWidth: 5,
                        borderColor: '#efefef',
                    }}
                />
                <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginVertical: '2%', 
                        paddingHorizontal: 10,
                        position: 'absolute', 
                        backgroundColor: '#fff',
                        left: 0, 
                        bottom: 10, 
                        right: 0, 
                        zIndex: 100, 
                    }}>
                        <Button transparent onPress={() => this.setState({ path: null })}>                    
                        <Icon
                        raised
                            name="chevron-left"
                            type='feather'
                            color="#828282"
                            size={25}
                        />
                        </Button>                        
                        <Button transparent onPress={() => this.addText()}>
                        <Icon
                        raised
                            name="pencil"
                            type="font-awesome"
                            color="#828282"
                            size={25}
                            /> 
                        </Button>                        
                        <Button transparent onPress={() => this.props.navigation.navigate("Validation")}>
                        <Icon
                            reverse
                            raised
                            name="paper-plane"
                            type="entypo"
                            color="#1766FB"
                            size={25}
                        />
                        </Button>
                </View>
            </Container>
          );
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
                  {this.state.path ? this.renderPreviewImage() : this.renderCamera()}
                </View>
            );
        }
    }
}

const mapStateToProps = ({ auth }) => {
	const { user, isLoggedIn } = auth;
	return { user, isLoggedIn };
};

export default connect(mapStateToProps)(CameraComponent);
