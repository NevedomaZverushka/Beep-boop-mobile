import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, ImageBackground, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import styles from './Styles/ResultStyle'

function unique(arr) {
    let res = [];
    arr.forEach(element => {
        if (!res.includes(element)) {
            res.push(element);
        }
    })
    return res;
}

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

        unique(storageAttempts).forEach(song => {
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
    }

    async onPlay() {
        // TrackPlayer.setupPlayer().then(async () => {
        //     await TrackPlayer.add({
        //         url: this.props.possibleSong.media[0].url,
        //         title: this.props.possibleSong.title,
        //         artist: this.props.possibleSong.artist,
        //     });
        //     TrackPlayer.play();
        // });
    }
    async onPause() {
        // TrackPlayer.setupPlayer().then(async () => {
        //     TrackPlayer.pause();
        // });
    }

    render() {
        var playList = this.props.attempts;
        playList = unique(playList);

        var sounds = null;
        if (!this.props.attempts.every((sound) => { return sound == null })) {
            sounds = playList.map((sound, index) => {
                if (sound) {
                    return (
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }} key={index}>
                            {
                                this.state.playing[index]
                                ?
                                    <TouchableWithoutFeedback onPress={this.onPause} style={{ flex: 0.2 }}>
                                        <Text style={{
                                                padding: 1,
                                                color: '#ff6666',
                                                fontSize: 26,
                                                fontWeight: 'bold',
                                                textAlignVertical: 'center'
                                        }}>
                                            &#124;  &#124;
                                        </Text>
                                    </TouchableWithoutFeedback>
                                :
                                    <TouchableWithoutFeedback onPress={this.onPlay} style={{ flex: 0.1 }}>
                                        <Text style={{ color: '#ff6666', fontSize: 45, textAlignVertical: 'center' }}>
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