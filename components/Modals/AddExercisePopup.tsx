import React, { useState } from 'react'
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native'
import { TextInput } from 'react-native'
import { ThemedView } from '../ThemedView'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'

export type typeToggleModal = {
    toggleModal: (toggle: boolean) => void
}

export default function AddExercisePopup({toggleModal} : typeToggleModal) {

    const colorScheme = useColorScheme()
    const [exerciseName, setExerciseName] = useState("")
    const [exerciseDescription, setExerciseDescription] = useState("")
    const [numberOfReps, setNumberOfReps] = useState("")
    const [numberOfSets, setNumberOfSets] = useState("")
    const [weight, setWeight] = useState("")

    return (
        <View style={[styles.modalContainer, ]}>
            <ThemedView style={[styles.popup_options_container]}>
            
                <View style={[styles.inputs, { marginTop: 50}]}>
                    
                    <TextInput
                        placeholder='exercise name'
                        value={exerciseName}
                        onChangeText={text => setExerciseName(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}
                        
                    />
                </View>
                
                <View style={styles.inputs}>
                    
                    <TextInput
                        placeholder='exercise description'
                        value={exerciseDescription}
                        onChangeText={text => setExerciseDescription(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}
                    />
                </View>

                <View style={styles.exercise_details}>
                    
                    <TextInput
                        value={numberOfSets}
                        onChangeText={text => setNumberOfSets(text)}
                        placeholder='Sets'
                        style={{backgroundColor: colorScheme === "dark" ? 'white' : 'black', width: "40%", padding: 10}}
                    />

                    <TextInput
                        value={numberOfReps}
                        onChangeText={text => setNumberOfReps(text)}
                        placeholder='Reps'
                        style={[{backgroundColor: colorScheme === "dark" ? 'white' : 'black', width: '40%', padding: 10}]} 
                    />
                </View>

                <View>
                    <TextInput
                        
                        value={exerciseName}
                        onChangeText={text => setExerciseName(text)}
                        placeholder='weight'
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 4,}]}
                        
                    />
                </View>
            
                <ThemedView style={[styles.container, styles.inputs, { backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 4,}]}>
                    <TouchableOpacity >
                        <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                            Add Exercise
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <Pressable 
                    onPress={() => toggleModal(false)}
                    style={[styles.pressable]}
                >
                    <Ionicons 
                        name="close-outline" 
                        size={20} 
                        color="black" 
                    />
                </Pressable>
            </ThemedView>
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

    popup_options_container: {
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },

    inputs: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
    },

    exercise_details: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        columnGap: 10
    },

    container: {
        padding: 10,
        borderRadius: 4,
        marginTop: 10
    },

    text: {
        textAlign: 'center'
    },

    pressable: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 50,
        color: "black",
        top: 10,
        right: 10
    },

    weight: {
        width: "80%"
    }
})