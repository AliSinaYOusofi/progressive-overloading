import React, { ReactNode, createContext, useContext, useState } from "react";


interface ContextType  {
    refreshDatabaseFetch: boolean,
    setRefreshDatabaseFetch: React.Dispatch<React.SetStateAction<boolean>>
}
const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps{
    children: ReactNode
}
export const ContextProvider = ({children} : ContextProviderProps ) => {
    
    const [ refreshDatabaseFetch, setRefreshDatabaseFetch] = useState<boolean>(false);

    return (
    
        <Context.Provider
            value={{
                refreshDatabaseFetch,
                setRefreshDatabaseFetch
            }}
        >
        {
            children
        }
    </Context.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useAppContext must be used within a ContextProvider");
    }
    return context;
}; 