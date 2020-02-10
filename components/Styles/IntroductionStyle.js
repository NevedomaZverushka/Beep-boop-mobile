import { StyleSheet, Dimensions } from 'react-native';

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

export default styles