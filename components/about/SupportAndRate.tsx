import React from 'react'
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

export default function SupportAndRate() {
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? 'white' : 'black'

    const handleSupportPress = () => {
        Linking.openURL('https://www.paypal.com/paypalme/aliyousufi99')
    }

    const handleRatePress = () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=your_app_id')
    }

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSupportPress}>
                <View style={styles.icon_and_text}>
                    <FontAwesome name="support" size={24} color={iconColor} />
                    <ThemedText style={styles.buttonText}>Support Us</ThemedText>
                </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.button} onPress={handleRatePress}>
                <View style={styles.icon_and_text}>
                    <MaterialIcons name="star-rate" size={24} color={iconColor} />
                    <ThemedText style={styles.buttonText}>Rate Us on Google Play</ThemedText>
                </View>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        
        margin: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'center'
    },
    icon_and_text: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
        width: '100%'
    }
})
