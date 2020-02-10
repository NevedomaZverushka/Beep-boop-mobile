import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

import styles from './Styles/HistoryStyle'

 export default function History(props) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <ScrollView style={{ flex: 1, flexDirection: 'column', textAlignVertical: 'center' }}>

                    <View style={styles.history}>
                        <Image source={require('../assets/history.png')} style={styles.img} />

                        <Text style={styles.title}>Історія ігор</Text>
                        <Text style={styles.emptyHistory}>Здається, у вас ще не було проведено жодної гри!</Text>
                        <Text style={styles.title}>Почати гру вже зараз!</Text>
                        <View style={{ margin: 15 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('audioSearch')}>
                                <Text style={styles.btnRed}>За допомогою запису</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('textSearch')}>
                                <Text style={styles.btnRed}>За допомогою тексту</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}