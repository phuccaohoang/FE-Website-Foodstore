import React, { createContext, useState, useContext, useEffect } from "react";
import accountService from "../services/accountService";


export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState({
        cart_ids: [],
        phone: null,
        address: null,
        delivery_cost: 0,
        coupon_id: null,
        note: null,
    });


    useEffect(() => {
        const loadUser = async () => {
            const response = await accountService.me()
            if (response.status) {
                setUser({ ...response.data })
            }

        }
        //
        loadUser()
    }, [])

    const contextValue = {
        refresh,
        setRefresh,
        user,
        setUser,
        setPayment,
        payment
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
