import React, { useState} from 'react'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { TouchableOpacity, StyleSheet, useColorScheme, Modal } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import AddExercisePopup from '../Modals/AddExercisePopup'
import { useNavigation } from 'expo-router'
import AddGoalsPopup from '../Modals/AddGoalsPopup'
import AddNotesPopup from './AddNotesPopup'

export default function AddNotesButton() {

    // redirect to aadd new workout page or popup
    const navigation = useNavigation()
    const colorScheme = useColorScheme();
    const [popup, setPopup] = useState(false)

    const displayAddGoalPopup = () => {
        setPopup(true)
    }

    const redirectToGoalSetting = () => {
        navigation.navigate('notes')
    }

    return (
        <>
            <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}>
                <TouchableOpacity onPress={displayAddGoalPopup}>
                    <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                        Add Note
                    </ThemedText>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}>
                <TouchableOpacity onPress={redirectToGoalSetting}>
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
                <AddNotesPopup toggleModal={setPopup}/>
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