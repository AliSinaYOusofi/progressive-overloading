import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Switch, ToastAndroid, View, useColorScheme } from 'react-native'
import { TextInput } from 'react-native'
import { ThemedView } from '../ThemedView'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { progressive_overloading } from '@/db/sqlitedb'
import { useAppContext } from '@/context/ContextProvider'
import parseNaturalLanguageDate from '@/utils/parseNaturalLanguageDate'

export type toggleProp = {
    toggleModal: (toggle: boolean) => void;
}

type goalProps = {
    id: number;
    goal_title: string;
    description: string;
    time_to_complete: string;
    created: Date;
    updated: Date;
    achevied: number;
    complete_in: string
}

export type UpdateGoalsProps = {
    toggleModal: (toggle: boolean) => void;
    goal: goalProps
}

export default function UpdateGoalsPopup({ toggleModal, goal }: UpdateGoalsProps) {
    
    const colorScheme = useColorScheme()
    const [goalName, setGoalName] = useState<string>(goal.goal_title)
    const [goalDescription, setGoalDescription] = useState<string>(goal.description)
    const [timeToComplete, setTimeToComplete] = useState<any>(goal.complete_in)
    

    const { setRefreshGoalsDatabase } = useAppContext()

    const updateGoal = async (): Promise<void> => {
        if (goalName === "") {
            ToastAndroid.show("Please enter a goal title", ToastAndroid.LONG)
            return
        }

        else if (timeToComplete === "") {
            ToastAndroid.show("Please enter a time to complete", ToastAndroid.LONG)
            return
        }
        
        let time_to_complete: string
        try {
            time_to_complete = parseNaturalLanguageDate(timeToComplete).toISOString()
        } catch (error) {
            console.error("unsupported date text provided", error)
            ToastAndroid.show("unsupported date text provided", ToastAndroid.LONG)
            return
        }

        try {
            let statement = await progressive_overloading.prepareAsync("UPDATE goals SET goal_title = ?, description = ?, time_to_complete = ?, updated = ? WHERE id = ?")
            await statement.executeAsync([goalName, goalDescription, time_to_complete, new Date().toISOString(), goal.id])
            ToastAndroid.show("Goal updated", ToastAndroid.LONG)
            setRefreshGoalsDatabase(prev => ! prev)
            
        } catch (error) {
            console.error("error updating goal", error)
            ToastAndroid.show("error updating goal", ToastAndroid.LONG)
        }
        finally {
            toggleModal(false)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.modalContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <View style={[styles.popup_options_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>

                <View style={[styles.inputs, { marginTop: 50 }]}>

                    <TextInput
                        placeholder='Goal Title'
                        value={goalName}
                        onChangeText={text => setGoalName(text)}
                        style={[styles.inputs, { backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2' }]}
                    />
                </View>

                <View style={styles.inputs}>

                    <TextInput
                        placeholder='Goal Description'
                        value={goalDescription}
                        onChangeText={text => setGoalDescription(text)}
                        style={[styles.inputs, { backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2' }]}
                    />
                </View>

                <View style={[styles.inputs, { flexDirection: 'column' }]}>

                    <ThemedText style={{ alignSelf: "flex-start", marginBottom: 5, fontWeight: "bold" }}> I will achieve this goal in: </ThemedText>
                    <TextInput
                        value={timeToComplete}
                        onChangeText={text => setTimeToComplete(text)}
                        placeholder='eg: 5 days, one week, one month, one year ...'
                        keyboardType="ascii-capable"
                        style={[styles.inputs, { backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', borderRadius: 4 }]}
                    />
                </View>

                {/* <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>

                    <ThemedText style={{ alignSelf: "center", fontWeight: "bold" }}> Remind me: </ThemedText>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={remindMe ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={remindMe}
                        style={{ marginTop: 3 }}
                    />

                </View> */}

                <ThemedView style={[styles.button_container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 4 }]}>
                    <TouchableOpacity onPress={updateGoal}>
                        <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black' }]}>
                            Update Goal
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <Pressable
                    onPress={() => toggleModal(false)}
                    style={[styles.pressable, { backgroundColor: colorScheme === "dark" ? 'white' : 'black' }]}
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
        backgroundColor: 'white',
        padding: 20,
    },

    inputs: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
    },

    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
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


    button_container: {
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        width: "70%",
        marginBottom: 10
    },
})
