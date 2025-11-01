import { useAtom } from "jotai";
import { TokenDetails, UserAtom, tokenAtom , userAtom} from "../atoms/token";

/**
 * Custom hook to manage token state in the application.
 * Provides access to the current token and a method to update it.
 */
export const useTokenManager = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const setTokenManager = (newToken: TokenDetails, persist: boolean) => {

        setToken(newToken);
        if(persist && newToken){
            // Logic to persist the token, e.g., localStorage or sessionStorage
            localStorage.setItem('atom_token', JSON.stringify(newToken));
        }
    
    }

    return {token, setTokenManager}
}


export const useUserManager = () => {
    const [userStore, setUserStore] = useAtom(userAtom);
    
    const setUserStoreManager = (newUser: UserAtom | null, persist: boolean) => {
        setUserStore(newUser);
        
        if(persist && newUser){
            // Logic to persist the user, e.g., localStorage or sessionStorage
            localStorage.setItem('atom_user', JSON.stringify(newUser));
            console.log("persisted", newUser)
        }
        return newUser;
    }

    const getUserStoreManager = () => {
        if(!userStore){
            const storedUser = localStorage.getItem('atom_user');
            if(storedUser){
                const newUser: UserAtom = JSON.parse(storedUser);
                setUserStore(newUser);
                return newUser;
            }
        }
        return userStore;
    }

    const deleteUserStoreManager = () => {
        setUserStore(null);
        localStorage.removeItem('atom_user');
    }

    return {setUserStoreManager, getUserStoreManager, deleteUserStoreManager}
}