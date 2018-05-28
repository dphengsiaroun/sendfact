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
                FileSystem.moveAsync({
                from: data.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
                }).then(() => {
                this.setState({
                    photoId: this.state.photoId + 1,
                    path: data.uri
                });
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

                    <Header searchBar rounded
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
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                            <Image
                                source={require('../assets/logo.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginLeft: 5
                                }}
                            />
                            <Button iconLeft transparent>
                                <Icon
                                    onPress={this.toggleFlash.bind(this)}
                                    name="ios-flash"
                                    style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 15}} /> 
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
                    <Icon
                        onPress={() => this.setState({ path: null })}
                        name="ios-arrow-back"
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 15, marginLeft: 0}} /> 
                    </Left>
                    <Body>
                        <Title style={{ color: 'white', fontSize: 13, fontWeight: 'bold'}}>SEND YOUR FACT</Title>
                    </Body>
                    <Right>
                    <Icon
                        onPress={() => this.setState({ path: null })}
                        name="ios-menu"
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 15, marginLeft: 0}} /> 
                    </Right>
                </Header>
                <Image
                    source={this.state.path}
                    style={{
                        width: 300,
                        height: 500,
                        marginHorizontal: 36,
                        marginTop: 36,
                        borderWidth: 1,
                        borderColor: '#efefef',
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 100, paddingHorizontal: 25}}>
                    <Button iconLeft full transparent onPress={() => this.setState({ path: null })}>
                        <Icon
                            name="ios-arrow-dropleft-circle"
                            style={{ color: '#1766FB', fontWeight: 'bold', fontSize: 35, marginRight: 15, marginLeft: 0}} /> 
                        <Text style={{ color: '#1766FB', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Back</Text>
                    </Button>
                    <Button iconLeft full transparent>
                        <Icon
                            name="ios-create"
                            style={{ color: 'grey', fontWeight: 'bold', fontSize: 35, marginRight: 15}} /> 
                        <Text style={{ color: 'grey', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Add text</Text>
                    </Button>
                    <Button iconRight success
                        style={{
                            paddingHorizontal: 15,
                        }}>
                        <Icon
                            name="ios-checkmark-outline" style={{ color: 'white', fontSize: 35, fontWeight: 'bold', marginRight: 10}} />
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Send</Text>                            
                    </Button>
                </View>
                {/* <Text>{ this.state.path }</Text> */}
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