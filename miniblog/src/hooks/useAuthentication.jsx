import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";

import { useState, useEffect } from "react";
import { app } from "../firebase/config";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(app);

    function checkIfCancelled() {
        if (cancelled){
            return;
        }
    }
    // register
    const createUser = async (data) => {
        checkIfCancelled();

        setLoading(true);
        setError(null);

        try{
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;

        }catch (error){
            setError(error.message);
            console.log(error.message);

            let systemErrorMessage;

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado.";
            }else {
                systemErrorMessage = "Ocorreu erro, por favor tente mais tarde.";
            }
            
            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    // Logout - sign out
    const logout = () => {
        checkIfCancelled();

        signOut(auth);
    }

    // Login - sign in
    const login = async (data) => {

        checkIfCancelled();

        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;
            switch (error.code) {
                case 'auth/user-not-found':
                    systemErrorMessage = 'Usuário não encontrado.';
                    break;
                case 'auth/wrong-password':
                    systemErrorMessage = 'Senha incorreta.';
                    break;
                case 'auth/invalid-email':
                    systemErrorMessage = 'E-mail inválido.';
                    break;
                case 'auth/too-many-requests':
                    systemErrorMessage = 'Muitas tentativas. Tente mais tarde.';
                    break;
                case 'auth/invalid-credential':
                    systemErrorMessage = 'E-mail ou senha inválidos.';
                    break;
                default:
                    systemErrorMessage = 'Ocorreu erro, por favor tente mais tarde.';
            }
            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
};