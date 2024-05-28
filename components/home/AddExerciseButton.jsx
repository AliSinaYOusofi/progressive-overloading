import React, { useState} from 'react'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { TouchableOpacity, StyleSheet, useColorScheme, Modal } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import AddExercisePopup from '../Modals/AddExercisePopup'
import { useNavigation } from 'expo-router'
export default function AddExerciseButton() {

    // redirect to aadd new workout page or popup
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const [popup, setPopup] = useState()

    const displayAddNewExercisePopup = () => {
        setPopup(true)
    }

    const redirectToProgressiveOverloading = () => {
        navigation.navigate('explore')
    }

    return (
        <>
            <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}>
                <TouchableOpacity onPress={displayAddNewExercisePopup}>
                    <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                        Add Exercise
                    </ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}>
                <TouchableOpacity onPress={redirectToProgressiveOverloading}>
                    <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                        View All
                    </ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <Modal 
                transparent={true}
                visible={popup}
                animationType='slide'
                onRequestClose={() => setPopup(false)}
            >
                <AddExercisePopup 
                    toggleModal={setPopup}
                />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create( {
    container: {
        padding: 10,
        borderRadius: 4,
        marginTop: 10
    },

    text: {
        textAlign: 'center'
    }
} )