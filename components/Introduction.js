import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, FlatList, SafeAreaView } from 'react-native';

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
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    introduction: {
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
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5,
    },
    list: {
        margin: 10,
    },
})