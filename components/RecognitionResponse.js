import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
//import TrackPlayer from 'react-native-track-player';

import styles from './Styles/RecognitionResponseStyle'

class RecognitiomResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
        }

        this.onPause = this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
    }

    async componentDidMount() {
        try {
            var storage = JSON.parse(await AsyncStorage.getItem('attempts'));
            if (storage) {
                storage.push(this.props.possibleSong === false ? null : this.props.possibleSong);
                await AsyncStorage.removeItem('attempts')
                await AsyncStorage.setItem('attempts', JSON.stringify(storage));
            }
            else {
                await AsyncStorage.setItem(
                    'attempts',
                    JSON.stringify([this.props.possibleSong === false ? null : this.props.possibleSong])
                )
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async componentWillUnmount() {
        // await soundObject.pauseAsync();
        // await soundObject.unloadAsync();
        this.setState({ playing: false })
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
        this.setState({ playing: true })
    }
    async onPause() {
        // TrackPlayer.setupPlayer().then(async () => {
        //     TrackPlayer.pause();
        // });
        this.setState({ playing: false })
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
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.wrongAnswer(null);
                                        if (this.props.userWon || this.props.computerWon) {
                                            this.props.navigation.navigate('result');
                                        }
                                        this.props.close();
                                    }}
                                    style={{ flex: 0.2 }}
                                >
                                    <Text style={styles.btnRed}>Продовжити гру</Text>
                                </TouchableOpacity>
                            </>
                        :
                            <>
                                <Text style={styles.title}>Ми знайшли!</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25, }}>
                                    {
                                        this.state.playing ?
                                            <TouchableOpacity onPress={this.onPause}
                                                style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}
                                            >
                                                <Image source={require('../assets/pause.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                        :
                                            <TouchableOpacity onPress={this.onPlay}
                                                style={{ flex: 0.1,justifyContent: 'center', alignItems: 'center', }}
                                            >
                                                <Image source={require('../assets/play.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                    }
                                    { this.props.possibleSong &&
                                        <Text style={{ flex: 0.9, textAlignVertical: 'center', fontSize: 18, margin: 5 }}>
                                            <Text style={styles.author}>
                                                { this.props.possibleSong.artist ?
                                                    this.props.possibleSong.artist.length >= 10
                                                        ? ((this.props.possibleSong.artist).substring(0, 90 - 3)) + '... - '
                                                        : this.props.possibleSong.artist + ' - '
                                                    : 'Невідомий артист'
                                                }
                                            </Text>
                                            <Text style={styles.soundName}>
                                                { this.props.possibleSong.title ?
                                                    this.props.possibleSong.title.length >= 10
                                                        ? ((this.props.possibleSong.title).substring(0, 90 - 3)) + '...'
                                                        : this.props.possibleSong.title
                                                    : 'Невідома пісня'
                                                }
                                            </Text>
                                        </Text>
                                    }
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.rightAnswer(this.props.possibleSong);
                                            this.props.close();
                                            this.props.navigation.navigate('result');
                                        }}
                                        style={{ flex: 0.5 }}
                                    >
                                        <Text style={styles.btnRed}>Це воно!</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.wrongAnswer(this.props.possibleSong);
                                            this.props.close();
                                            if (this.props.userWon || this.props.computerWon) {
                                                this.props.navigation.navigate('result');
                                            }
                                        }}
                                        style={{ flex: 0.5 }}
                                    >
                                        <Text style={styles.btnRed}>Це не воно!</Text>
                                    </TouchableOpacity>
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
        attempts: state.attempts,
        possibleSong: state.possibleSong,
        userWon: state.userWon,
        computerWon: state.computerWon,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitiomResponse)