import React from 'react'
import { StyleSheet, ToastAndroid, useColorScheme } from 'react-native';
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TouchableOpacity } from 'react-native';
import { progressive_overloading } from '@/db/sqlitedb';

type Props = {
    id: string | number;
    toggleModal: (toggle: boolean) => void;
}

export default function DeleteWorkout({id, toggleModal} : Props) {

    const colorScheme = useColorScheme()

    const deleteWorkout = async () : Promise<void> => {
        
        try {
            await progressive_overloading.execAsync(`DELETE FROM progressive_overloading WHERE id = ${id}`);
            ToastAndroid.show("Workout deleted", ToastAndroid.LONG)
        } catch (error) {
            console.error("Failed to delete data", error);
            ToastAndroid.show("Failed to delete data", ToastAndroid.LONG)
        }

        finally {
            toggleModal(false);
        }
    }
    return (
        <View style={styles.modalContainer}>
            <View style={[styles.popup_container, { backgroundColor: colorScheme === "dark" ? "#060B17" : "white"}]}>

                <ThemedText> Are sure you want to delete this workout? </ThemedText>
                <ThemedText> This action cannot be undone</ThemedText>

                <View style={styles.button_views}>
                    <TouchableOpacity onPress={deleteWorkout} style={[styles.delete_button, styles.both_button]}>
                        <ThemedText> Delete </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleModal(false)} style={[styles.cancel_button, styles.both_button]}>
                        <ThemedText> Cancel </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: "relative",
        
    },

    popup_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10
    },

    button_views : {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
    },

    delete_button: {
        backgroundColor: "#c04000",
        
    },

    cancel_button: {
        backgroundColor: "#355e3b",
        
    },
    
    both_button: {
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 10
    }
})