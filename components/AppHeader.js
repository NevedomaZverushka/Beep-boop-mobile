import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
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
                        <Text
                            style={[
                                styles.arrow,
                                { color: 'white' },
                                !this.props.btnBack && { width: 0, height: 0, },
                                this.props.cards && { color: '#ff6666'}
                            ]}
                        >
                            &#8592;
                        </Text>
                    </TouchableWithoutFeedback>
                }  
                centerComponent={
                    <Text style={ [styles.title, { color: this.props.cards ? '#ff6666' : 'white' } ]}>
                        {this.props.title}
                    </Text>
                }
                containerStyle={{
                    backgroundColor: this.props.cards ? 'white' : '#ffc7bb',
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
        fontSize: 35,
    },
    title: {
        justifyContent: "flex-start",
        paddingTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
    },
})