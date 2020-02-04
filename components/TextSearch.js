import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

class TextSearch extends Component {
    constructor(props) {
        super(props);
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
                            <TouchableWithoutFeedback onPress={() => alert('hello')}>
                                <Text style={styles.btnBlue}>Надіслати</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        width: screenWidth - 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        width: screenWidth - 85,
        height: (screenWidth - 85) * 0.66,
        marginBottom: 10,
    },
    title: {
        color: '#5a78ed',
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        margin: 5,
    },
    span: {
        textTransform: 'uppercase',
        color: '#ff6666',
    },
    textArea: {
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: '#5a78ed',
        width: '100%',
        textAlignVertical: 'top',
        fontSize: 20,
    },
    btnBlue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5a78ed',
        margin: 10,
        borderWidth: 2,
        borderColor: '#5a78ed',
        padding: 10,
    }
})

function mapDispatchToProps(dispatch) {
    return {
        updateText: (text) => dispatch({ type: 'UPDATE_TEXT', text: text }),
    }
}

function mapStateToProps(state) {
    return {
        text: state.text,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch)