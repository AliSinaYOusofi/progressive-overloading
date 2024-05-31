import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, ToastAndroid, View, useColorScheme } from 'react-native'
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
    future_reps: number,
    future_sets: number,
    future_weight: number,
    
}

export type updateWorkout = {
    toggleModal: (toggle : boolean) => void;
    workout: workoutProps
}

export default function UpdateWorkout({toggleModal, workout} : updateWorkout) {

    const colorScheme = useColorScheme()
    const [exerciseName, setExerciseName] = useState<string>(workout.exercise_name.toString())
    const [exerciseDescription, setExerciseDescription] = useState<string>(workout.exercise_description.toString())
    const [currentNumberOfReps, setCurrentNumberOfReps] = useState<any>(workout.reps.toString())
    const [currentNumberOfSets, setCurrentNumberofSets] = useState<any>(workout.sets.toString())
    const [currentWeight, setCurrentWeight] = useState<any>(workout.weight.toString())
    const [weightType, setWeightType] = useState<string>(workout.weight_type.toString())

    const [ futureNumberOfReps, setFutureNumberOfReps] = useState<any>(workout.future_reps.toString())
    const [ futureNumberOfSets, setFutureNumberOfSets] = useState<any>(workout.future_sets.toString())
    const [ futureWeight, setFutureWeight] = useState<any>(workout.future_weight.toString())

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

        else if (typeof currentNumberOfSets !== "number" && ! isNaN(currentNumberOfSets) && currentNumberOfSets <= 0) {
            ToastAndroid.show("Please enter a valid set", ToastAndroid.LONG)
            return
        }
        
        else if (typeof currentNumberOfReps !== "number" && ! isNaN(currentNumberOfReps) && currentNumberOfReps <= 0) {
            ToastAndroid.show("Please enter a valid rep", ToastAndroid.LONG)
            return
        }

        else if (typeof currentWeight !== "number" && ! isNaN(currentWeight) && currentWeight <= 0) {
            ToastAndroid.show("Please enter a valid weight", ToastAndroid.LONG)
            return
        }

        else if (weightType === "") {
            ToastAndroid.show("Please select a weight type", ToastAndroid.LONG)
            return
        }

        else if ( typeof futureWeight !== "number" && ! isNaN(futureWeight) && futureWeight <= 0) {
            ToastAndroid.show("Please enter a valid weight", ToastAndroid.LONG)
            return
        }

        else if ( typeof futureNumberOfSets !== "number" && ! isNaN(futureNumberOfSets) && futureNumberOfSets <= 0) {
            ToastAndroid.show("Please enter a valid set", ToastAndroid.LONG)
            return
        }

        else if ( typeof futureNumberOfReps !== "number" && ! isNaN(futureNumberOfReps) && futureNumberOfReps <= 0) {
            ToastAndroid.show("Please enter a valid rep", ToastAndroid.LONG)
            return
        }

        // insert data 

        
        // current date and time
        // update the table entry
        const currentDate = new Date().toLocaleString()

        let statement = await progressive_overloading.prepareAsync("UPDATE progressive_overloading SET exercise_name = ?, exercise_description = ?, sets = ?, reps = ?, weight = ?, weight_type = ?, future_reps = ?, future_sets  = ?, future_weight = ?, updated = ? WHERE id = ?");
        
        const result = await statement.executeAsync([exerciseName, exerciseDescription, currentNumberOfSets, currentNumberOfReps, currentWeight, weightType, futureNumberOfReps, futureNumberOfSets, futureWeight, currentDate, workout.id])
        ToastAndroid.show("Exercise updated", ToastAndroid.LONG)
        
        setRefreshDatabaseFetch( prev => ! prev)
        toggleModal(false)

    }

    return (
        <KeyboardAvoidingView style={[styles.modalContainer, ]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <View style={[styles.popup_options_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
            
                <View style={[styles.inputs, { marginTop: 50}]}>
                    
                    <TextInput
                        placeholder='exercise name'
                        value={exerciseName}
                        onChangeText={text => setExerciseName(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2'}]}
                        
                    />
                </View>
                
                <View style={styles.inputs}>
                    
                    <TextInput
                        placeholder='Notes'
                        value={exerciseDescription}
                        onChangeText={text => setExerciseDescription(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2'}]}
                    />
                </View>

                <View style={styles.current_and_future_details}>

                    <ThemedText style={styles.current_and_future_text}> Current </ThemedText>
                    <View style={styles.exercise_details}>
                        <TextInput
                            value={currentNumberOfSets}
                            onChangeText={text => setCurrentNumberofSets(text)}
                            placeholder='Sets'
                            keyboardType='numeric'
                            style={{backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', width: "40%", padding: 10, borderRadius: 4}}
                        />

                        <TextInput
                            value={currentNumberOfReps}
                            onChangeText={text => setCurrentNumberOfReps(text)}
                            placeholder='Reps'
                            keyboardType='numeric'
                            style={[{backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', width: '40%', padding: 10, borderRadius: 4}]} 
                        />
                    </View>
                    
                </View>

                <View style={[styles.inputs, {flexDirection: 'row'}]}>
                    <TextInput
                        value={currentWeight}
                        onChangeText={text => setCurrentWeight(text)}
                        placeholder='weight'
                        keyboardType='numeric'
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', borderRadius: 4,}]}
                    />
                </View>

                <View style={styles.current_and_future_details}>

                    <ThemedText style={styles.current_and_future_text}> To </ThemedText>
                    <View style={styles.exercise_details}>
                        <TextInput
                            value={futureNumberOfSets}
                            onChangeText={text => setFutureNumberOfSets(text)}
                            placeholder='Sets'
                            keyboardType='numeric'
                            style={{backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', width: "40%", padding: 10, borderRadius: 4}}
                        />

                        <TextInput
                            value={futureNumberOfReps}
                            onChangeText={text => setFutureNumberOfReps(text)}
                            placeholder='Reps'
                            keyboardType='numeric'
                            style={[{backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', width: '40%', padding: 10, borderRadius: 4}]} 
                        />
                    </View>
                    
                </View>

                <View style={[styles.inputs, {flexDirection: 'row'}]}>

                    <View style={{width: "60%"}}>
                        <TextInput
                            value={futureWeight}
                            onChangeText={text => setFutureWeight(text)}
                            placeholder='weight'
                            keyboardType='numeric'
                            style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', borderRadius: 4,}]}
                        />
                    </View>
                    <View style={{width: "35%"}}>
                        <Picker
                            selectedValue={weightType}
                            onValueChange={(itemValue) => setWeightType(itemValue)}
                            style={[styles.inputs, { backgroundColor: colorScheme === 'dark' ? 'white' : '#F6F5F2', borderRadius: 14, }]}
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
                            Update exercise
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <Pressable 
                    onPress={() => toggleModal(false)}
                    style={[styles.pressable, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}
                >
                    <Ionicons 
                        name="close-outline" 
                        size={20} 
                        color={colorScheme !== "dark" ? 'white' : 'black'}
                    />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
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
        marginBottom: 10
    },

    text: {
        textAlign: 'center'
    },

    pressable: {
        position: 'absolute',
        zIndex: 1,
        
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

    current_and_future_details: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        columnGap: 20
    },

    current_and_future_text : {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
        marginLeft: "7%",
        marginTop: 10
    }
})