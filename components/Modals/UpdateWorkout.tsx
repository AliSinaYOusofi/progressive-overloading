import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, ToastAndroid, View, useColorScheme } from 'react-native'
import { TextInput } from 'react-native'
import { ThemedView } from '../ThemedView'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { progressive_overloading } from '@/db/sqlitedb'
import { Picker } from '@react-native-picker/picker'
import { useAppContext } from '@/context/ContextProvider'

export type typeToggleModal = {
    toggleModal: (toggle: boolean) => void
}

type workoutProps = {
    id: number,
    exercise_name: string,
    exercise_description: string,
    sets: number,
    reps: number,
    weight: number,
    weight_type: string,
}
export type updateWorkout = {
    toggleModal: (toggle : boolean) => void;
    workout: workoutProps
}

export default function UpdateWorkout({toggleModal, workout} : updateWorkout) {

    const colorScheme = useColorScheme()
    const [exerciseName, setExerciseName] = useState<string>(workout.exercise_name)
    const [exerciseDescription, setExerciseDescription] = useState<string>(workout.exercise_description)
    const [numberOfReps, setNumberOfReps] = useState<any>(workout.reps.toString())
    const [numberOfSets, setNumberOfSets] = useState<any>(workout.sets.toString())
    const [weight, setWeight] = useState<any>(workout.weight.toString())
    const [weightType, setWeightType] = useState<string>(workout.weight_type.toString())

    const { setRefreshDatabaseFetch } = useAppContext()

    const updateExercise = async () : Promise<void> => {
        // validate every field and show toast messages if wrong
        // add new exercise to database
        // close modal

        // start validating fields
        if (exerciseName === "") {
            ToastAndroid.show("Please enter an exercise name", ToastAndroid.LONG)
            return
        }

        else if (typeof numberOfSets !== "number" && ! isNaN(numberOfSets) && numberOfSets <= 0) {
            ToastAndroid.show("Please enter a valid set", ToastAndroid.LONG)
            return
        }
        
        else if (typeof numberOfReps !== "number" && ! isNaN(numberOfReps) && numberOfReps <= 0) {
            ToastAndroid.show("Please enter a valid rep", ToastAndroid.LONG)
            return
        }

        // insert data 

        console.log(exerciseName, exerciseDescription, numberOfSets, numberOfReps, weight, weightType)
        // current date and time
        // update the table entry
        const currentDate = new Date().toLocaleString()
        let statement = await progressive_overloading.prepareAsync("UPDATE progressive_overloading SET exercise_name = ?, exercise_description = ?, sets = ?, reps = ?, weight = ?, weight_type = ?, date = ? WHERE id = ?");
        
        await statement.executeAsync([exerciseName, exerciseDescription, numberOfSets, numberOfReps, weight, weightType, currentDate, workout.id])
        ToastAndroid.show("Exercise updated", ToastAndroid.LONG)
        
        setRefreshDatabaseFetch( prev => ! prev)
        toggleModal(false)

    }

    

    return (
        <View style={[styles.modalContainer, ]}>
            <View style={[styles.popup_options_container, {backgroundColor: colorScheme === "dark" ? '#060B17' : 'white'}]}>
            
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
                        placeholder='Sets'
                        value={numberOfSets}
                        onChangeText={text => setNumberOfSets(text)}
                        keyboardType='numeric'
                        style={{backgroundColor: colorScheme === "dark" ? 'white' : 'black', width: "40%", padding: 10, borderRadius: 4}}
                    />

                    <TextInput
                        value={numberOfReps}
                        onChangeText={text => setNumberOfReps(text)}
                        placeholder='Reps'
                        keyboardType='numeric'
                        style={[{backgroundColor: colorScheme === "dark" ? 'white' : 'black', width: '40%', padding: 10, borderRadius: 4}]} 
                    />
                </View>

                <View style={[styles.inputs, {flexDirection: 'row'}]}>

                    <View style={{width: "60%"}}>
                        <TextInput
                            value={weight}
                            onChangeText={text => setWeight(text)}
                            placeholder='weight'
                            keyboardType='numeric'
                            style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 4,}]}
                        />
                    </View>
                    <View style={{width: "35%"}}>
                        <Picker
                            selectedValue={weightType}
                            onValueChange={(itemValue) => setWeightType(itemValue)}
                            style={[styles.inputs, { backgroundColor: colorScheme === 'dark' ? 'white' : 'black', borderRadius: 14, }]}
                            >
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="lb" value="lb" />
                            <Picker.Item label="other" value="other" />
                        </Picker>
                    </View>
                </View>
            
                <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 4,}]}>
                    <TouchableOpacity onPress={updateExercise}>
                        <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                            Update Exercise
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

    popup_options_container: {
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
        columnGap: 20
    },

    container: {
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        width: "70%",
        marginBottom: 3
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
    },

    pickerContainer: {
        flex: 1,
      },
})