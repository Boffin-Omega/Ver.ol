import {
  Field,
  FieldGroup,
  FieldLabel,

} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {Link, Form, useNavigate} from 'react-router-dom'
import SubmitButton from "@/components/SubmitButton.tsx"
import {useAuthStore} from './store/authStore'
import { useEffect } from 'react'

export default function SignUp(){
    const navigate = useNavigate();
    const { signUpState, statusMessage } = useAuthStore();
    
    useEffect(() => {
        if (signUpState === 'success') {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [signUpState, navigate]);
    return (
        <div className="w-full max-w-md bg-white p-10">
            <h1 className="font-bold text-4xl mb-4 text-center">Sign up</h1>
            <Form method="post">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input id="username" name="username"autoComplete="off" />
                        {/* <FieldError>Choose another username.</FieldError> */}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input type="email" id="email" name="email" autoComplete="off" placeholder="example@example.com"/>
                        {/* <FieldError>Please enter a valid email!</FieldError> */}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="pswrd">Enter your password</FieldLabel>
                        <Input type="password" id="pswrd" name="password" autoComplete="off"/>
                        {/* <FieldError>Please enter a valid password</FieldError> */}
                    </Field>

                    <Field orientation="horizontal">
                        <SubmitButton text={"Sign up"} />
                    </Field>

                    <p>Already have an account ? <Link to="/login">Login</Link></p>
            </FieldGroup>

            </Form>
            {signUpState !== null && (
                <div className={`${signUpState === 'error' ? 'text-red-500' : 'text-lime-500'} text-center mt-4 transition-all`}>
                    {statusMessage}
                </div>
            )}
        </div>
               
    );
}