import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function NoWorkoutsAdded() {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
            <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>
                No workouts added yet.
            </Text>
            <Text style={[styles.subtext, { color: colorScheme === 'dark' ? '#ccc' : '#666' }]}>
                Start adding your workouts to track your progress!
            </Text>

            <View style={styles.icon_container}>
                <Entypo  name="progress-one" size={24} color={colorScheme === 'dark' ? 'white' : 'black' } />
                <Entypo name="progress-two" size={24} color={colorScheme === 'dark' ? 'white' : 'black' } />
                <Entypo name="progress-full" size={24} color={colorScheme === 'dark' ? 'white' : 'black' } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        textAlign: 'center',
    },

    icon_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        columnGap: 10
    }
});
