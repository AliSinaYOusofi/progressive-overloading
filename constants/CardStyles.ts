import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
const colorScheme = useColorScheme();
const cardStyles = StyleSheet.create({
    card: {
        marginVertical: 8,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 16,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap",
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10,
    }
});

export default cardStyles;
