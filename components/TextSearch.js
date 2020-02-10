import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native';
import { connect } from 'react-redux';

import api from '../api'
import RecognitiomResponse from './RecognitionResponse';
import styles from './Styles/TextSearchStyle'

class TextSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popUp: false,
        }
        this.sendText = this.sendText.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }

    closePopUp() {
        this.setState({ popUp: false })
    }

    sendText() {
        if (this.props.text !== "") {
            api.sendText(this.props.text)
                .then((response) => {
                    if (response.status === 200 && response.data.status === "success") {
                        let generalized = api.generalizeResponse(response.data)
                        this.props.updateSong(generalized.result && generalized.result.length > 0 ? generalized.result[0] : false)
                        this.setState({ popUp: true })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
                    <ScrollView>

                        <View style={styles.container}>
                            <Image source={require('../assets/text.png')} style={styles.img} />
                            <Text style={styles.title}>Пошук за допомогою <Text style={styles.span}>тексту</Text></Text>
                            <TextInput
                                style={styles.textArea}
                                editable multiline={true}
                                numberOfLines={4}
                                placeholder="I'm blue da ba dee da ba daa..."
                                onChangeText={(e) => this.props.updateText(e) }
                            />
                            <TouchableWithoutFeedback onPress={this.sendText}>
                                <Text style={styles.btnBlue}>Надіслати</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <Modal animationType="fade" transparent={true} visible={this.state.popUp}>
                    <RecognitiomResponse close={this.closePopUp} />
                </Modal>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateText: (text) => dispatch({ type: 'UPDATE_TEXT', text: text }),
        updateSong: (song) => dispatch({ type: 'UPDATE_SONG', song: song }),
    }
}

function mapStateToProps(state) {
    return {
        text: state.text,
        possibleSong: state.possibleSong
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch)