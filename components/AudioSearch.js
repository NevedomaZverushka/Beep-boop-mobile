import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

export default class AudioSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image source={require('../assets/audio.png')} style={styles.img} />
                        <Text style={styles.title}>Пошук за допомогою <Text style={styles.span}>запису</Text></Text>
                    </View>
                </ScrollView>
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
})