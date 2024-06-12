import React, { useEffect, useState } from 'react'
import { ThemedText } from '../ThemedText'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View, useColorScheme } from 'react-native'
import { progressive_overloading } from '@/db/sqlitedb'
import { ThemedView } from '../ThemedView'
import { Ionicons } from '@expo/vector-icons'
import { useAppContext } from '@/context/ContextProvider'
import { AdEventType } from 'react-native-google-mobile-ads';
import { interstitialAds } from '../Modals/AddGoalsPopup'
export type toggle = {
    toggleModal: (arg : boolean) => void,
}

export type notes = {
    id : number,
    title: string,
    content: string,
    created: string,
    updated: string
}

export default function AddNotesPopup({toggleModal} : toggle) {

    const [ notesTitle, setNoteTitle] = useState<string>("")
    const [ notesContent, setNoteContent] = useState<string>("")

    const colorScheme = useColorScheme()
    const { setRefresNotesTable } = useAppContext()
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitialAds.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
        });

        interstitialAds.load();

        return unsubscribe;
    }, []);

    const addNewExercise = async () : Promise<void> => {
        
        if (notesTitle === "") {
            ToastAndroid.show("Please enter a note title", ToastAndroid.LONG)
            return
        }
        
        else if (notesContent === "") {
            ToastAndroid.show("Body can't be empty", ToastAndroid.LONG)
            return
        }

        try {

            let statement = await progressive_overloading.prepareAsync("INSERT INTO notes (title, content, created, updated) VALUES (?, ?, ?, ?)")
            await statement.executeAsync([notesTitle, notesContent, new Date().toISOString(), new Date().toISOString()])
            ToastAndroid.show("note added", ToastAndroid.LONG)
            setRefresNotesTable(prev => ! prev)

            if (loaded) interstitialAds.show()
        } catch (error) {
            console.error("error adding new goal", error)
            ToastAndroid.show("error adding new goal", ToastAndroid.LONG)
        } finally {
            toggleModal(false)
        }
    }

    return (
        <KeyboardAvoidingView style={[styles.modalContainer, ]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <View style={[styles.popup_options_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
            
                <View style={[styles.inputs, { marginTop: 50}]}>
                    
                    <TextInput
                        placeholder='Goal Title'
                        value={notesTitle}
                        onChangeText={text => setNoteTitle(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2'}]}
                        
                    />
                </View>
                
                <View style={styles.inputs}>
                    
                    <TextInput
                        placeholder='Goal Descriptoin'
                        value={notesContent}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => setNoteContent(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', textAlignVertical: "top"}]}
                    />
                </View>

                <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 50}]}>
                    <TouchableOpacity onPress={addNewExercise}>
                        <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                            Add Goal
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