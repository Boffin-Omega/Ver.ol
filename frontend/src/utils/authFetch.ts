import {useAuthStore} from '../store/authStore'
interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export async function authFetch(url: string, options: FetchOptions = {}): Promise<Response> {
    const token = useAuthStore.getState().token;

    if (!token) {
        useAuthStore.getState().logout();
        throw new Error('User is not logged in.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        // Handle common auth errors
        if (response.status === 401) {
            useAuthStore.getState().logout();
            throw new Error('Session expired or invalid token.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network request failed');
    }
}