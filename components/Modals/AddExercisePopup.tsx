import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, ToastAndroid, View, useColorScheme } from 'react-native'
import { TextInput } from 'react-native'
import { ThemedView } from '../ThemedView'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { progressive_overloading } from '@/db/sqlitedb'
import { Picker } from '@react-native-picker/picker'

export type typeToggleModal = {
    toggleModal: (toggle: boolean) => void
}

export default function AddExercisePopup({toggleModal} : typeToggleModal) {

    const colorScheme = useColorScheme()
    const [exerciseName, setExerciseName] = useState<string>("")
    const [exerciseDescription, setExerciseDescription] = useState<string>("")
    const [numberOfReps, setNumberOfReps] = useState<any>(0)
    const [numberOfSets, setNumberOfSets] = useState<any>(0)
    const [weight, setWeight] = useState<any>(0)
    const [weightType, setWeightType] = useState<string>("kg")

    const addNewExercise = async () : Promise<void> => {
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
        const currentDate = new Date().toLocaleString()
        let statement = await progressive_overloading.prepareAsync("INSERT INTO progressive_overloading(exercise_name, exercise_description, sets, reps, weight, weight_type, date) VALUES(?, ?, ?, ?, ?, ?, ?)");
        const result = await statement.executeAsync([exerciseName, exerciseDescription, numberOfSets, numberOfReps, weight, weightType, currentDate])
        ToastAndroid.show("Exercise added", ToastAndroid.LONG)
        toggleModal(false)
    }

    useEffect( () => {
        const createTable = async () : Promise<void> => {
            
            // create table in database

            try {
                await progressive_overloading.execAsync(`CREATE TABLE IF NOT EXISTS progressive_overloading (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    exercise_name TEXT,
                    exercise_description TEXT,
                    sets INTEGER,
                    reps INTEGER,
                    weight INTEGER,
                    weight_type TEXT,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );`)
                
            } 
            
            catch (error) {
                console.error("error creating table", error)
                ToastAndroid.show("failed to create table", ToastAndroid.LONG)
            }
            
        }

        createTable()
    }, [])

    return (
        <View style={[styles.modalContainer, ]}>
            <View style={[styles.popup_options_container, {backgroundColor: colorScheme === "dark" ? '#282C35' : 'black'}]}>
            
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
                    <TouchableOpacity onPress={addNewExercise}>
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