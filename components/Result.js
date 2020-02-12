import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import styles from './Styles/ResultStyle'

var backgrounds = [
    require('../assets/background_result_blue.png'),
    require('../assets/background_result_red.png'),
    require('../assets/background_result_yellow.png')
]
function compareRandom() {
    return Math.random() - 0.5;
}
backgrounds.sort(compareRandom);


class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: [],
            userScore: 0,
            computerScore: 0
        }
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    async componentDidMount() {
        var storageAttempts = JSON.parse(await AsyncStorage.getItem('attempts'));
        var storageHistory = JSON.parse(await AsyncStorage.getItem('history'));

        storageAttempts.forEach(song => {
            if (song) {
                this.state.playing.push(false);
            }
        })

        if (this.props.computerWon) {
            if (storageHistory) {
                if (storageHistory.length >= 30) {
                    storageHistory.shift();
                }
                storageHistory.push(storageAttempts[storageAttempts.length - 1]);
                await AsyncStorage.removeItem('history');
                await AsyncStorage.setItem('history', JSON.stringify(storageHistory));
            }
            else {
                await AsyncStorage.removeItem('history');
                await AsyncStorage.setItem('history', JSON.stringify([ storageAttempts[storageAttempts.length - 1] ]));
            }
        }
        else {
            if (storageHistory) {
                if (storageHistory.length >= 30) {
                    storageHistory.shift();
                }
                storageHistory.push(null);
                await AsyncStorage.removeItem('history');
                await AsyncStorage.setItem('history', JSON.stringify(storageHistory));
            }
            else {
                await AsyncStorage.setItem('history', JSON.stringify([ null ]));
            }
        }
        await AsyncStorage.removeItem('attempts');
        storageHistory = JSON.parse(await AsyncStorage.getItem('history'));

        if (storageHistory) {
            storageHistory.forEach(game => {
                if (!game) {
                    this.setState(prevState => { return { userScore: prevState.userScore + 1 } })
                }
                else {
                    this.setState((prevState) => { return { computerScore: prevState.computerScore + 1 } })
                }
            })
        }
    }
    componentWillUnmount() {
        this.props.finishGame();

        var bufPlayList = [];
        this.state.playing.forEach( element => {
            bufPlayList.push(false);
            this.onPause();
        })
        this.setState({ playing: playList });
    }

    async onPlay(pos) {
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
        var playList = this.props.attempts;
        var sounds = null;
        if (!this.props.attempts.every((sound) => { return sound == null })) {
            sounds = playList.map((sound, index) => {
                if (sound) {
                    return (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }} key={index}>
                            {
                                this.state.playing[index] ?
                                    <TouchableOpacity onPress={this.onPause}
                                        style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}
                                    >
                                        <Image source={require('../assets/pause.png')} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => this.onPlay(index)}
                                        style={{ flex: 0.1,justifyContent: 'center', alignItems: 'center', }}
                                    >
                                        <Image source={require('../assets/play.png')} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
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
                return null
            })
        }
        else {
            <Text style={{ margin: 25, textAlign: "center", fontSize: 25, color: '#ff6666' }}>
                Здається, жодного разу пісня не була вгадана.
            </Text>
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground source={backgrounds[0]} style={styles.container}>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', textAlignVertical: 'center' }}>

                        <View style={styles.result}>
                            <Text style={styles.title}>{ this.props.userWon ? "Ви виграли!" : "Компьютер виграв!" }</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={[styles.scoreText, { textAlign: 'right', flex: 0.4 }]}>Користувач</Text>
                                <Text style={[styles.scoreSpan, { flex: 0.2 }]} />
                                <Text style={[styles.scoreText, { textAlign: 'left', flex: 0.4 }]}>Компьютер</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={[styles.score, { textAlign: 'right', flex: 0.4 }]}>{this.state.userScore}</Text>
                                <Text style={[styles.scoreSpan, { flex: 0.2 }]}>:</Text>
                                <Text style={[styles.score, { textAlign: 'left', flex: 0.4 }]}>{this.state.computerScore}</Text>
                            </View>

                            {sounds}

                            <TouchableOpacity onPress={() => {
                                this.props.finishGame();
                                this.props.navigation.navigate('home');
                            }}>
                                <Text style={styles.btnRed}>Завершити гру</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        finishGame: () => dispatch({ type: 'FINISH_GAME' })
    }
}

function mapStateToProps(state) {
    return {
        userWon: state.userWon,
        computerWon: state.computerWon,
        attempts: state.attempts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)