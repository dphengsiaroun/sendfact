import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Modal,
    ActivityIndicator
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Container, Header, Left, Right, Title, Body, Form, Label, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { commentChanged, setComment, saveToFirebase } from '../actions';

class ImagePreview extends Component {

    state = {
        ModalVisibleStatus: false,
    };

    onCommentChange(text) {
        this.props.commentChanged(text);
    }

    addComment() {
		const { comment } = this.props;
        this.props.setComment({ comment });
        this.setState({ModalVisibleStatus: !this.state.ModalVisibleStatus});                
	}

    newComment() {
        console.log('New comment');
        this.setState({ModalVisibleStatus: !this.state.ModalVisibleStatus});   
    }

    onButtonPress() {
        const isLoggedIn = this.props.auth.isLoggedIn;
        if (isLoggedIn === false) {
            return this.props.navigation.navigate('Signin');
        }
        const user = this.props.auth.user.user.email;
        const { path, comment } = this.props.image;
        this.props.saveToFirebase(path, comment, user);
    }

    renderError() {
		if (this.props.image.error) {
			return (
				<View style={{padding: 10, marginBottom: 10, borderRadius: 5}}>
					<Text style={{color: 'red', textAlign: 'center', fontSize: 15}}>
						{this.props.image.error}
					</Text>
				</View>
			)
		}
	}
    
    renderButton() {
		if (this.props.image.loading) {
            return <ActivityIndicator 
                        size="large" 
                        color="#338F2F" 
                        />
		}

		return (
			<Button transparent onPress={this.onButtonPress.bind(this)}>
                <Icon
                    reverse
                    raised
                    name="paper-plane"
                    type="entypo"
                    color="#1766FB"
                    size={25}
                />
            </Button>
		);
	}

    renderViewModal() {
        return (
            <Modal
                style={{ backgroundColor: '#000'}}
                visible={this.state.ModalVisibleStatus}
                transparent={false}
                onRequestClose={ () =>  this.ShowModalFunction() }>
                <View style={{ backgroundColor: '#fff'}}>
                    <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                        <Left>
                            <Button transparent
                                onPress={() => this.setState({ ModalVisibleStatus: !this.state.ModalVisibleStatus })}>
                                <Icon 
                                    name="angle-left"
                                    type='font-awesome'
                                    color="white"
                                    size={30}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color: 'white', fontSize: 15}}>Commentaire</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Form style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 25}}>
                        <Label 
                        style={{
                            fontSize: 14, 
                            color: '#8996A0',
                            marginBottom: 15
                        }}>Ecrivez votre commentaire</Label>
                        <TextInput
                            multiline = {true}
                            style={{
                                minHeight: 40, 
                                width: '100%', 
                                fontSize: 18, 
                                fontWeight: '600',
                                paddingBottom: 10,
                                marginBottom: 30,
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderBottomColor: '#efefef',
                                color: '#000'}}
                            onChangeText={this.onCommentChange.bind(this)} 
                            value={this.props.comment}/>
                        <Button
                            rounded
                            block
                            style={{
                                paddingHorizontal: 5
                            }}
                            onPress={() => this.addComment()}>
                            <Text 
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Ajouter</Text>
                        </Button>
                    </Form>
                </View>
            </Modal>
        );
    }

    render() {
		console.log('IMAGE PREVIEW: this.props', this.props);
        const imagePath = this.props.image.path;
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
                                fontFamily: 'ArialRoundedMTBold',
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
                    <ImageViewer style={{height: 400, marginHorizontal: 10, marginTop: 10, marginBottom: 90}} renderIndicator={() => null} imageUrls={images}/>
                    {/* <Text>{this.props.image.comment}</Text> */}
                    {this.renderViewModal()}
                    <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            paddingVertical: 20, 
                            paddingHorizontal: 10,
                            position: 'absolute', 
                            backgroundColor: 'white',
                            left: 0, 
                            bottom: 0, 
                            right: 0, 
                            zIndex: 100, 
                        }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>                    
                                <Icon
                                    raised
                                    name="chevron-left"
                                    type='feather'
                                    color="#828282"
                                    size={25}
                                />
                            </Button>                        
                            <Button transparent onPress={() => this.newComment()}>
                                <Icon
                                    raised
                                    name="pencil"
                                    type="font-awesome"
                                    color="#828282"
                                    size={25}
                                /> 
                            </Button>                   
                            {this.renderButton()}
                    </View>
                    {this.renderError()}
                </Container>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state); // state
    console.log(ownProps); // undefined
	return state;
};
export default connect(mapStateToProps, { commentChanged, setComment, saveToFirebase })(ImagePreview);