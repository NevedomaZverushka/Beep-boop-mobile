import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, ScrollView, AsyncStorage } from 'react-native';

import styles from './Styles/HistoryStyle'

 export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: [],
            userScore: 0,
            computerScore: 0,
            storageHistory: null
        }
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    async componentDidMount() {
        this.setState({ storageHistory: JSON.parse(await AsyncStorage.getItem('history')) })

        var bufPlayList = []
        this.state.storageHistory.forEach(element => { bufPlayList.push(false) })
        this.setState({ playing: bufPlayList })
    }

    async onPlay(index) {
        // TrackPlayer.setupPlayer().then(async () => {
        //     await TrackPlayer.add({
        //         url: this.props.possibleSong.media[0].url,
        //         title: this.props.possibleSong.title,
        //         artist: this.props.possibleSong.artist,
        //     });
        //     TrackPlayer.play();
        // });
        var bufPlayList = []
        this.state.playing.forEach((element, pos) => {
            if (pos === index) {
                bufPlayList.push(true)
            }
            else {
                bufPlayList.push(false)
            }
        });
        this.setState({ playing: bufPlayList })
    }
    async onPause() {
        // TrackPlayer.setupPlayer().then(async () => {
        //     TrackPlayer.pause();
        // });
        var bufPlayList = []
        this.state.playing.forEach(element => { bufPlayList.push(false) });
        this.setState({ playing: bufPlayList })
    }

    render() {
        var playList = null;
        if (this.state.storageHistory) {
            playList = this.state.storageHistory.map((sound, index) => {
                if (sound) {
                    return (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }} key={index}>
                            <Text style={{
                                flex: 0.1,
                                textAlign: 'center',
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                                textAlignVertical: 'center'
                            }}>
                                {index + 1}.
                            </Text>
                            {
                                this.state.playing[index]
                                ?
                                    <TouchableWithoutFeedback onPress={this.onPause} style={{ flex: 0.3 }}>
                                        <Text style={{
                                                color: '#ff6666',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                textAlignVertical: 'left',
                                                lineHeight: 60,
                                                margin: 10
                                        }}>
                                            &#124;  &#124;
                                        </Text>
                                    </TouchableWithoutFeedback>
                                :
                                    <TouchableWithoutFeedback onPress={() => this.onPlay(index)} style={{ flex: 0.3 }}>
                                        <Text style={{
                                                color: '#ff6666',
                                                fontSize: 45,
                                                textAlignVertical: 'center',
                                                lineHeight: 60
                                        }}>
                                            &#9655;
                                        </Text>
                                    </TouchableWithoutFeedback>
                            }
                            <Text style={{ flex: 0.8, flexDirection: 'row', textAlignVertical: 'center', fontSize: 18 }}>
                                <Text style={styles.author}>
                                    { sound.artist ? 
                                        sound.artist.length >= 10 ? ((sound.artist).substring(0, sound.artist.length - 3)) + '... - ' : sound.artist + ' - '
                                        : 'Невідомий артист'
                                    }
                                </Text>
                                <Text style={styles.soundName}>
                                    { sound.title ?
                                        sound.title.length >= 10 ? ((sound.title).substring(0, sound.title.length - 3)) + '...' : sound.title
                                        : 'Невідома пісня'
                                    }
                                </Text>
                            </Text>
                        </View>
                    )
                }
                else {
                    return (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }} key={index}>
                            <Text style={{
                                flex: 0.3,
                                textAlign: 'center',
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                                margin: 5
                            }}>
                                {index + 1}.
                            </Text>
                            <Text style={{ flex: 0.7}}>Здається, у цій грі комп'ютер програв!</Text>
                        </View>
                    )
                }
            })
        }
        else {
            playList = (
                <>
                    <Text style={styles.emptyHistory}>Здається, у вас ще не було проведено жодної гри!</Text>
                    <Text style={styles.title}>Почати гру вже зараз!</Text>
                    <View style={{ margin: 15 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('audioSearch')}>
                            <Text style={styles.btnRed}>За допомогою запису</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('textSearch')}>
                            <Text style={styles.btnRed}>За допомогою тексту</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', textAlignVertical: 'center' }}>
    
                        <View style={styles.history}>
                            <Image source={require('../assets/history.png')} style={styles.img} />
    
                            <Text style={styles.title}>Історія ігор</Text>

                            {playList}
                        </View>
    
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}