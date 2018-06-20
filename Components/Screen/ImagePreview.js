import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Modal
} from "react-native";

import { Camera, Permissions, FileSystem } from 'expo';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Container, Content, Header, Item, Left, Right, Title, Body, Input, Label, Button } from 'native-base';
import { Icon } from 'react-native-elements';

class ImagePreview extends Component {

   constructor(props) {
       super(props);
       this.state = {
        ModalVisibleStatus: false 
        };
        console.log('props', this.props)
   }

    addText() {
        console.log('Add Text');
        this.setState({ModalVisibleStatus: true});   
    }

    renderViewModal() {
        return (
            <Modal
                style={{ backgroundColor: '#000'}}
                visible={this.state.ModalVisibleStatus}
                transparent={false}
                onRequestClose={ () =>  this.ShowModalFunction() }>
                <View style={{ flex: 1, backgroundColor: '#222' }}>
                <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                        <Left>
                            <Icon 
                                name="chevron-left"
                                type='feather'
                                color="white"
                                onPress={() => this.setState({ ModalVisibleStatus: false })}/>
                            <Text 
                            style={{
                                position: 'absolute',
                                left: 25,
                                top: 3,
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Back</Text>
                            
                        </Left>
                        <Right/>
                    </Header>
                    <Label 
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '5%',
                            fontSize: 14, 
                            color: 'white'
                        }}>Add your Text</Label>
                    <TextInput 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '5%',
                            height: 50, 
                            width: '90%', 
                            fontSize: 24, 
                            fontWeight: '600',
                            borderWidth: 1,
                            borderBottomColor: 'hsla(46, 84%, 61%, 1)',
                            color: 'white'}}/>
                </View>
            </Modal>
        );
    }

    render() {
        const { navigation } = this.props;
        const imagePath = navigation.state.params.imagePath;
        console.log('navigation', navigation.state.params.imagePath);
        console.log('this.props', this.props, this.state);
        const images = [ { url: imagePath} ];

        return (
            <View style={{ flex: 1 }}>
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
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}/> 
                        </Right>
                    </Header>
                    <ImageViewer style={{marginHorizontal: 10, marginTop: 10}} renderIndicator={() => null} imageUrls={images}/>
                    {this.renderViewModal()}
                    <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginVertical: '0%',
                            paddingVertical: 20, 
                            paddingHorizontal: 10,
                            position: 'absolute', 
                            backgroundColor: '#fff',
                            left: 0, 
                            bottom: 0, 
                            right: 0, 
                            zIndex: 100, 
                        }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('Camera')}>                    
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
            </View>
        );
    }
}

export default ImagePreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});