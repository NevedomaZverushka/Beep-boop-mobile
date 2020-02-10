import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, ScrollView, FlatList, SafeAreaView } from 'react-native';

import styles from './Styles/IntroductionStyle'

const rules = [
    {
        id: 1,
        text: 'Гість має загадати будь-яку пісню, а потім заспівати/програти/ввети будь-яку її частину;'
    },
    {
        id: 2,
        text: 'Додаток намагатиметься відгадати цю пісню та надаватиме користувачеві варіанти своїх відповідей протягом 5-ти спроб;'
    },
    {
        id: 3,
        text: 'Якщо правильна відповідь не була надана, перемогу одержує гість (користувач має змогу підтверджувати правильніть відповіді), у протилежному випадку - додаток.'
    },
]

export default function Introduction(props) {
    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={styles.introduction}>
                        <Image source={require('../assets/introduction.png')} style={styles.img} />

                        <Text style={styles.title}>Що таке Beep-Boop?</Text>
                        <Text style={{ margin: 10, fontSize: 15, }}>
                            BEEP-BOOP - це музичний акінатор, тобто гра, в якiй комп'ютер повинен вiдгадати пiсню,
                            що ви загадали, і до того ж надасть вам можливість прослухати та насолодитись нею.
                        </Text>

                        <Text style={styles.title}>Коротко про правила гри:</Text>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                                style={styles.list}
                                keyExtractor={item => item.id.toString()}
                                data={rules}
                                renderItem={
                                    ({ item }) =>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 15, }}>
                                                <Text style={{ fontWeight: 'bold', color: '#ff6666' }}>{item.id}. </Text>
                                                {item.text}
                                            </Text>
                                        </View>
                                }
                            />
                        </SafeAreaView>
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}