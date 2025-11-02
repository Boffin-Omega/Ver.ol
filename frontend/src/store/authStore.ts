import { create } from 'zustand';

// Define the shape of our state
interface AuthState {
    loginState: string|null;
    signUpState: string|null;
    statusMessage: string|null;

    token: string | null;
    userId: string | null; // <-- NEW: To store the user's unique ID
    userName:string|null;

    // isAuthenticated is a derived property (getter)
    isAuthenticated: boolean; 
    
    // Actions
    login: (token: string, userId: string,userName:string) => void;
    logout: () => void;
}

// Helper for initial state and persistence
const getInitialState = () => {
    // Check localStorage for persisted values
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    return {
        token,
        userId,
        userName
    };
};

export const useAuthStore = create<AuthState>((set, get) => ({
    // STATE
    ...getInitialState(), // Initialize state from localStorage

    loginState:null,
    signUpState:null,
    statusMessage:null,

    // DERIVED STATE: isAuthenticated is derived from the presence of the token
    // Note: This is defined as a property on the initial state object, 
    // but its value uses a getter, meaning it updates automatically 
    // when 'token' changes.
    get isAuthenticated() {
        return !!get().token;
    },

    // ACTIONS
    login: (token: string, userId: string,userName:string) => { // <--- ACTION TAKES BOTH
        // 1. Store state
        set({ token, userId ,userName});
        
        // 2. Persist to localStorage
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', userId); // <-- NEW: Persist the ID
        localStorage.setItem('userId', userName); // <-- NEW: Persist the ID

        console.log(`User ${userName}:${userId} logged in.`);
    },

    logout: () => {
        // 1. Clear state
        set({ token: null, userId: null ,userName:null});
        
        // 2. Clear persistence
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId'); // <-- NEW: Clear the ID
        localStorage.removeItem('userName'); // <-- NEW: Clear the ID

        console.log('User logged out, token cleared.');
    },
}));

// This store can now be used in two ways:
// 1. Inside a component: const isAuthenticated = useAuthStore(state => state.isAuthenticated);
// 2. Outside a component (in actions/loaders): useAuthStore.getState().login(token);
