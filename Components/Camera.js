import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Vibration
} from "react-native";

import { Camera, Permissions, FileSystem } from 'expo';

import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
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
        photoId: 'IMG_' + 1,
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
        console.log('cheese!');
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                this.setState({ path: data.uri });
                FileSystem.moveAsync({
                from: data.uri,
                to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
                }).then(() => {
                this.setState({
                    photoId: this.state.photoId + 1,
                });
                Vibration.vibrate();
                });
            });
        }
    };

    renderCamera() {
        return (
            <View style={{ flex: 1 }}>
                <Camera ref={ref => { this.camera = ref; }}
                        flashMode={this.state.flash}
                        style={{ flex: 1, justifyContent: 'space-between' }} 
                        type={this.state.type} >

                    <Header searchBar rounded
                        style={{
                            position: 'absolute', 
                            backgroundColor: 'transparent',
                            left: 0, 
                            top: 0, 
                            right: 0, 
                            zIndex: 100, 
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between' }}>
                            <Button iconLeft transparent>
                                <Icon
                                    onPress={this.toggleFlash.bind(this)}
                                    name="ios-flash"
                                    style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginRight: 15}} /> 
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>{this.state.flash.toUpperCase()}</Text>
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
                                style={{ color: 'white', fontSize: 100 }}
                            ></MaterialCommunityIcons>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }

    renderPreviewImage() {
        return (
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: this.state.path }}
                style={styles.preview}
              />
              <Text
                style={styles.cancel}
                onPress={() => this.setState({ path: null })}
              >Cancel
              </Text>
            </View>
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // height: Dimensions.get('window').height,
        // width: Dimensions.get('window').width
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    }
});