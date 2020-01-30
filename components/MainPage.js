import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';

const cards = [
    { img: require('../assets/audio.png'), text: 'Пошук за допомогою', span: 'запису' },
    { img: require('../assets/text.png'), text: 'Пошук за допомогою', span: 'тексту' }
]

export default class MainPage extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            cards.map( card => {
                                return (
                                    <View style={styles.card}>
                                        <Image source={card.img} style={styles.img} />
                                        <Text style={styles.text}>{card.text}</Text>
                                        <Text style={styles.span}>{card.span}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    card: {
        backgroundColor: 'white',
        paddingTop: 30,
        paddingLeft: 30,
        paddingBottom: 20,
        paddingRight: 30,
        margin: 20,
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
        textAlign: 'center',
        width: '100%',
        height: 120,
    },
    text: {
        fontWeight: 'bold',
        color: '#5a78ed',
        fontSize: 18,
        textAlign: 'center'
    },
    span: {
        color: '#ff6666',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})