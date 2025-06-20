import React, { createContext, useState, useContext } from "react";


export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(true);

    const contextValue = {
        refresh,
        setRefresh
    }
    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );


};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSesstion must be used within a SessionProvider');
    }
    return context;
};
