import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.js'; // Adjust path and type as needed
import type {IUser} from '../models/user.js'

/**
 * Configures and sets up all Passport strategies.
 */
export const configurePassport = (): void => {
    
    // Define the Local Strategy for username/password login
    passport.use(new LocalStrategy(
        {
            // CRITICAL: Ensure these match the keys sent from your frontend
            usernameField: 'username', 
            passwordField: 'password',
            session: false // We use JWTs, not sessions
        },
        async (username, password, done) => {
            try {
                console.log(username);
                // 1. Find the user by the login credential (email or username)
                // Use .toLowerCase() for case-insensitive lookup
                const normalizedUsername = username.toLowerCase()
                console.log(normalizedUsername);
                const user = await User.findOne({ username: normalizedUsername }).select('+password');
                // If user is not found
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                // 2. Compare the plain text password with the hashed password from the DB
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    // Password does not match
                    return done(null, false, { message: 'Incorrect password.' });
                }

                // 3. SUCCESS: Return the user object
                // Passport will pass this 'user' object to your logIn controller's callback
                return done(null, user);

            } catch (error) {
                // Database or server error
                return done(error);
            }
        }
    ));

    // Optional: Only needed if using JWT strategy as well, but good practice.
    // This tells Passport how to serialize/deserialize user sessions (even if session: false is used)
    passport.serializeUser((user, done) => {
        done(null, (user as IUser).id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
