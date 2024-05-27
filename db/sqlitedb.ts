import * as SQLite from 'expo-sqlite';

export let progressive_overloading: SQLite.SQLiteDatabase;

const openDatabase = async () => {
  progressive_overloading = await SQLite.openDatabaseAsync('progressive_overloading.db');
};

// Call the function to open the database
openDatabase();
