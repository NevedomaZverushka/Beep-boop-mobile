import { StyleSheet, Dimensions } from 'react-native';

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

export default styles