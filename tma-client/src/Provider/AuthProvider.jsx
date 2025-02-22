import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../firebase/Firebase.config";




export const AuthContext = createContext()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [sportData, setSportData] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // console.log(loading, user);
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };
    const updateUserProfile = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData)
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }
    // theme setup
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light" // Persist user preference
    );

    // Apply theme to the root HTML tag
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); // Persist theme in localStorage
    }, [theme]);

    // Toggle between dark and light themes
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    // theme setup
    const authInfo = {
        user, setUser, createNewUser, logOut, userLogin, loading,
        updateUserProfile, signInWithGoogle,sportData, resetPassword, setLoading, toggleTheme
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe()
        }
    }, [])



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
