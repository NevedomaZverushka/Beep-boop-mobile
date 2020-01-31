import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions } from 'react-native';

const cards = [
    { img: require('../assets/audio.png'), text: 'Пошук за допомогою', span: 'запису' },
    { img: require('../assets/text.png'), text: 'Пошук за допомогою', span: 'тексту' }
]
const sliders = [
    {
        img: require('../assets/introduction.png'),
        title: "Що таке Beep-boop?",
        text: "BEEP-BOOP - це музичний акінатор, тобто гра, в якiй комп'ютер повинен вiдгадати пiсню, що ви загадали, і до того ж надасть вам можливість прослухати та насолодитись нею."
    },
    {
        img: require('../assets/history.png'),
        title: "Історія ігор",
        text: "some text"
        // TODO придумать text
    }
]

export default class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        }
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    setSelectedIndex(e) {
        const viewSize = e.nativeEvent.layoutMeasurement.width;
        const contentOffset = e.nativeEvent.contentOffset.x;
        this.setState({ selectedIndex: contentOffset / viewSize })
    }

    render() {
        return(
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={{ marginTop: 15, marginBottom: 10 }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[ styles.title, { flex: 0.5 } ] }>Коротко про гру</Text>
                            <View style={styles.circleDiv}>
                                {
                                    sliders.map( ( block, i ) => {
                                        return(
                                            <View key={i} style={[ styles.circle,
                                                        { opacity:
                                                            i === 0
                                                                ? this.state.selectedIndex >= 0.5 ? 0.5 : 1 - this.state.selectedIndex
                                                                : this.state.selectedIndex >= 0.5 ? this.state.selectedIndex : 0.5
                                                        }]} />
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            onScroll={this.setSelectedIndex}
                        >
                            {
                                sliders.map( ( block, i ) => {
                                    return(
                                        <View key={i} style={styles.sliderBlock}>
                                            <Image source={block.img} style={styles.sliderImg} />
                                            <View style={{ flex: 0.5, margin: 5 }}>
                                                <Text style={styles.sliderTitle}>{block.title}</Text>
                                                <Text style={styles.sliderText}>
                                                    {
                                                        block.text.length > 90 ? ((block.text).substring(0, 90 - 3)) + '...' : block.text
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text style={styles.title}>Починай грати вже зараз</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                cards.map( ( card, i ) => {
                                    return (
                                        <View key={i} style={styles.card}>
                                            <Image source={card.img} style={styles.img} />
                                            <Text style={styles.textCard}>{card.text}</Text>
                                            <Text style={styles.span}>{card.span}</Text>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </ScrollView>
            </ImageBackground>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    circleDiv: {
        marginRight: 20,
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#5a78ed',
    },
    sliderBlock: {
        width: screenWidth - 40,
        margin: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
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
    sliderImg: {
        flex: 0.5,
        width: Math.round(( screenWidth - 40) / 1.9),
        height: Math.round((( screenWidth - 40) / 1.9) * 0.66), 
    },
    sliderTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5a78ed',
    },
    sliderText: {
        
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
        width: '100%',
        height: 120,
    },
    textCard: {
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
    },
    title: {
        color: '#ff6666',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 18,
    }
})