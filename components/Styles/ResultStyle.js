import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    result: {
        flex: 1,
        flexDirection: 'column',
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
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: '#5a78ed',
        fontWeight: 'bold',
        fontSize: 22,
        margin: 10,
    },
    score: {
        color: '#ff6666',
        fontWeight: 'bold',
        fontSize: 40,
        margin: 5,
    },
    scoreSpan: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 20,
    },
    scoreText: {
        color: 'black',
        fontSize: 18,
        margin: 5,
    },
})

export default styles