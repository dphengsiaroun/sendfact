import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Vibration
} from "react-native";

import { Camera, Permissions, FileSystem } from 'expo';

import { Container, Content, Header, Item, Icon, Left, Right, Title, Body, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
  };
  

class CameraComponent extends Component {

    state = {
        type: Camera.Constants.Type.back,
        flash: 'auto',
        photoId: 1,
        photos: [],
        path: null,
        permissionsGranted: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

    componentDidMount() {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
          console.log(e, 'Directory exists');
        });
    }

    toggleFlash() {
        this.setState({
          flash: flashModeOrder[this.state.flash],
        });
    }

    takePicture = async () => {
        console.log('cheese!', this.state.path);
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                this.setState({ path: data.uri });
                console.log('takePicture', data.uri)
                FileSystem.moveAsync({
                from: data.uri,
                to: `${FileSystem.documentDirectory}photos/IMG_${this.state.photoId}.jpg`,
                }).then(() => {
                this.setState({
                    photoId: this.state.photoId + 1,
                    path: data.uri
                });
                console.log('takePicture2',  `${FileSystem.documentDirectory}photos/IMG_${this.state.photoId}.jpg`);
                Vibration.vibrate();
                });
            });
        }
    };

    renderCamera() {
        return (
            <View style={{ flex: 1, }}>
                <Camera ref={ref => { this.camera = ref; }}
                        flashMode={this.state.flash}
                        style={{ flex: 1, justifyContent: 'space-between' }} 
                        type={this.state.type} >

                    <Header
                        style={{
                            position: 'absolute', 
                            backgroundColor: '#efc84a',
                            left: 0, 
                            top: 0, 
                            right: 0, 
                            zIndex: 100, 
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between' }}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginLeft: 5,
                                    marginTop: 5
                                }}
                            />
                            <Button iconLeft transparent>
                                <Icon
                                    onPress={this.toggleFlash.bind(this)}
                                    name="ios-flash"
                                    style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 5, paddingHorizontal: 10}} /> 
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12}}>{this.state.flash.toUpperCase()}</Text>
                            </Button>
                            <Button iconRight transparent>
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="ios-reverse-camera" style={{ color: 'white', fontSize: 35, fontWeight: 'bold' }} />
                            </Button>
                        </View>
                    </Header>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
                        <View style={{ alignItems: 'center' }}> 
                            <MaterialCommunityIcons name="circle-outline" onPress={this.takePicture.bind(this)}
                                style={{ color: '#efc84a', fontSize: 100 }}
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
                <Header style={{ backgroundColor: '#efc84a'}}>
                    <Left>
                    <Image
                        source={require('../assets/logo.png')}
                        style={{
                            width: 35,
                            height: 35,
                            marginLeft: 5
                        }}
                    />
                    </Left>
                    <Right>
                    <Icon
                        name="ios-menu"
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 15, marginLeft: 0}} /> 
                    </Right>
                </Header>
                <Image
                    source={{ uri: 'https://acme.invoicehome.com/assets/invoice_templates/fr/invoice/165-3c78ee28644560efbaecb13ecfe177814d9fb9c573b9185a37a5a409adc06fa5.png'}}
                    style={{
                        width: '90%',
                        height: '70%',
                        marginHorizontal: '5%',
                        marginTop: 15,
                        borderWidth: 1,
                        borderColor: '#efefef',
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: '5%', paddingHorizontal: 10}}>
                    <Button iconLeft transparent onPress={() => this.setState({ path: null })}>
                        <Icon
                            name="ios-arrow-dropleft-circle"
                            style={{ color: '#1766FB', fontSize: 48}} /> 
                    </Button>
                    <Button iconLeft transparent>
                        <Icon
                            name="ios-create"
                            style={{ color: 'grey', fontSize: 40}} /> 
                    </Button>
                    <Button iconRight transparent>
                        <Icon
                            name="ios-checkmark-circle" style={{ color: '#51AC4F', fontSize: 50}} />
                    </Button>
                </View>
            </Container>
          );
    }

    render() {
        const { permissionsGranted } = this.state

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
export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});