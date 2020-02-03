import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native-elements';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Header
                leftComponent={
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(this.props.btnBack)}>
                        <Text style={ [styles.arrow, !this.props.btnBack && { width: 0, height: 0, } ]}>&#8592;</Text>
                    </TouchableWithoutFeedback>
                }  
                centerComponent={ <Text style={styles.title}>{this.props.title}</Text> }
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
    arrow: {
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 35,
    },
    title: {
        justifyContent: "center",
        paddingTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center",
    },
})