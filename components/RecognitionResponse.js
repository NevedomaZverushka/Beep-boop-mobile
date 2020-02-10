import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
//import TrackPlayer from 'react-native-track-player';

import styles from './Styles/RecognitionResponseStyle'

var soundObject = new Audio.Sound();

class RecognitiomResponse extends Component {
    constructor(props) {
        super(props);
        this.state ={
            playing: false,
        }

        this.onPause = this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
    }

    async componentDidMount() {
        if (this.props.possibleSong) {
            await soundObject.loadAsync({uri: this.props.possibleSong.media[0].url, overrideFileExtensionAndroid: "mp3"}, downloadFirst=true);
        }
        try {
            const storage = await AsyncStorage.getItem('attempts');
            if (storage) {
                var bufStorage = storage;
                bufStorage.push(this.props.possibleSong === false ? null : this.props.possibleSong);
                storage.setItem('attempts', bufStorage);
            }
            else {
                storage.setItem('attempts', [this.props.possibleSong === false ? null : this.props.possibleSong])
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async componentWillUnmount() {
        await soundObject.pauseAsync();
        await soundObject.unloadAsync();
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
        return (
            <View style={styles.backContainer}>
                <View style={styles.container}>
                    {
                        this.props.possibleSong === false
                        ?
                            <>
                                <Text style={styles.title}>Нажаль, нічого не було знайдено!</Text>
                                <Text style={styles.paragraph}>
                                    Здається, додаток не зміг розпізнати пісню. Спробуйте покращити якість запису або поточнити текст пісні.
                                </Text>
                                <TouchableWithoutFeedback onPress={this.props.close} style={{ flex: 0.2 }}>
                                    <Text style={styles.btnRed}>Продовжити гру</Text>
                                </TouchableWithoutFeedback>
                            </>
                        :
                            <>
                                <Text style={styles.title}>Ми знайшли!</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }}>
                                    {
                                        this.state.playing
                                        ?
                                            <TouchableWithoutFeedback onPress={this.onPause} style={{ flex: 0.1 }}>
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
                                    <Text style={{ flex: 0.9, textAlignVertical: 'center', fontSize: 18, margin: 5 }}>
                                        <Text style={styles.author}>
                                            {
                                                this.props.possibleSong.artist >= 10
                                                    ? ((this.props.possibleSong.artist).substring(0, 90 - 3)) + '... - '
                                                    : this.props.possibleSong.artist + ' - '
                                            }
                                        </Text>
                                        <Text style={styles.soundName}>
                                        {
                                                this.props.possibleSong.title >= 10
                                                    ? ((this.props.possibleSong.title).substring(0, 90 - 3)) + '...'
                                                    : this.props.possibleSong.title
                                            }
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.props.rightAnswer();
                                            this.props.close();
                                        }}
                                        style={{ flex: 0.5 }}
                                    >
                                        <Text style={styles.btnRed}>Це воно!</Text>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.props.wrongAnswer();
                                            this.props.close();
                                        }}
                                        style={{ flex: 0.5 }}
                                    >
                                        <Text style={styles.btnRed}>Це не воно!</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </>
                    }
                </View>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        wrongAnswer: (song) => dispatch({ type: 'WRONG_ANSWER', song: song }),
        rightAnswer: (song) => dispatch({ type: 'RIGHT_ANSWER', song: song })
    }
}

function mapStateToProps(state) {
    return {
        possibleSong: state.possibleSong
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitiomResponse)