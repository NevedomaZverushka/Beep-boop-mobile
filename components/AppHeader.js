import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class AppHeader extends Component {
    render() {
        return(
            <Header
                centerComponent={ <Text style={styles.title}>Beep-boop</Text> }
                containerStyle={{
                    backgroundColor: '#ffc7bb',
                    paddingBottom: 25,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                statusBarProps={{
                    translucent: true
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        justifyContent: "center",
        paddingTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center",
    },
})