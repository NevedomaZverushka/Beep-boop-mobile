import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './Styles/MainPageStyle'

const cards = [
    { img: require('../assets/audio.png'), text: 'Пошук за допомогою', span: 'запису', link: 'audioSearch' },
    { img: require('../assets/text.png'), text: 'Пошук за допомогою', span: 'тексту', link: 'textSearch' }
]
const sliders = [
    {
        link: 'introduction',
        img: require('../assets/introduction.png'),
        title: "Що таке Beep-boop?",
        text: "BEEP-BOOP - це музичний акінатор, тобто гра, в якiй комп'ютер повинен вiдгадати пiсню, що ви загадали, і до того ж надасть вам можливість прослухати та насолодитись нею."
    },
    {
        link: 'history',
        img: require('../assets/history.png'),
        title: "Історія ігор",
        text: "Передивляйтеся історію гри та насолоджуйтеся улюбленою музикою!"
    }
]

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            visible: false,
        }
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
        this.hideInformation = this.hideInformation.bind(this);
    }

    componentDidMount() {
        if (this.props.attempts.length > 0) {
            this.setState({ visible: true })
        }
    }

    setSelectedIndex(e) {
        const viewSize = e.nativeEvent.layoutMeasurement.width;
        const contentOffset = e.nativeEvent.contentOffset.x;
        this.setState({ selectedIndex: contentOffset / viewSize })
    }
    hideInformation() {
        this.setState({ visible: false })
    }

    render() {
        console.log(this.props.attempts.length)
        console.log(this.state.visible)
        return(
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                    <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                        {
                            !this.state.visible
                                ? null
                                :
                                    <View style={styles.attempts} >
                                        <Text style={styles.attemptsTitle}>Поточна гра</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Text
                                                style={{
                                                    flex: 0.8,
                                                    fontSize: 18,
                                                    color: '#5a78ed',
                                                    textAlignVertical:
                                                    'center',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Залишилось спроб:
                                            </Text>
                                            <Text style={{ flex: 0.2, fontSize: 25, color: '#5a78ed' }}>
                                                { 5 - this.props.attempts.length }
                                            </Text>
                                        </View>
                                        <View style={{ position: 'absolute', zIndex: 1, right: 0, }}>
                                            <TouchableWithoutFeedback onPress={this.hideInformation}>
                                                <Text style={ styles.close }>&#10005;</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                        }

                        <View style={{ marginTop: 25, marginBottom: 10 }}>

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
                            
                            <SafeAreaView>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={this.setSelectedIndex}
                                >
                                    {
                                        sliders.map( ( block, i ) => {
                                            return(
                                                <TouchableWithoutFeedback
                                                    key={i}
                                                    onPress={() => this.props.navigation.navigate(block.link)}
                                                >
                                                    <View style={styles.sliderBlock}>
                                                        <Image source={block.img} style={styles.sliderImg} />
                                                        <View style={{ flex: 0.5, margin: 5 }}>
                                                            <Text style={styles.sliderTitle}>{block.title}</Text>
                                                            <Text style={styles.sliderText}>
                                                                {
                                                                    block.text.length > 90
                                                                        ? ((block.text).substring(0, 90 - 3)) + '...'
                                                                        : block.text
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </SafeAreaView>

                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text style={styles.title}>Починай грати вже зараз</Text>
                            <SafeAreaView>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        cards.map( ( card, i ) => {
                                            return (
                                                <TouchableWithoutFeedback
                                                    key={i}
                                                    onPress={() => this.props.navigation.navigate(card.link)}
                                                >
                                                    <View style={styles.card}>
                                                        <Image source={card.img} style={styles.img} />
                                                        <Text style={styles.textCard}>{card.text}</Text>
                                                        <Text style={styles.span}>{card.span}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </SafeAreaView>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        attempts: state.attempts
    }
}

export default connect(mapStateToProps)(MainPage)