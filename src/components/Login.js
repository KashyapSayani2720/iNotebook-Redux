import React, { useRef, useState } from 'react';
import { useUserLoginMutation } from '../services/auth';
import { Toast } from 'primereact/toast';

function Login(props) {
    const formRef = useRef(null);
    const [errors, setErrors] = useState({});
    let isError = false;
    const toast = useRef(null);

    async function handleOnSubmit(e) {
        e.preventDefault();

        const emailValue = formRef.current.email.value;
        const passwordValue = formRef.current.password.value;

        // Validate email
        if (!emailValue.trim()) {
            isError = true;
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Please enter your email address.'
            }));
        } else if (!isValidEmail(emailValue)) {
            isError = true;
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Please enter a valid email address.'
            }));
        } else {
            isError = false;
            setErrors(prevErrors => ({
                ...prevErrors,
                email: null
            }));
        }

        // Validate password
        if (!passwordValue.trim()) {
            isError = true;
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Please enter your password.'
            }));
        } else {
            isError = false;
            setErrors(prevErrors => ({
                ...prevErrors,
                password: null
            }));
        }

        // Proceed with the form data if no errors
        if (!isError) {
            const data = {
                email : emailValue,
                password : passwordValue
            }

            const user = await login(data);

            if(user["data"]["success"] === true){
                localStorage.setItem('token', user["data"]["authToken"]);
                window.location.replace("http://localhost:3000/");
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Logged In Successfully', life: 3000 });
            }
            else{
                toast.current.show({ severity: 'error', summary: 'Error', detail: user["data"]["error"], life: 3000 });
            }
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const [login] = useUserLoginMutation();

    return (
        <>
        <Toast ref={toast} />
        <div className='m-5'>
            <h1 className='text-center'>Login Here !!!</h1>
            <form ref={formRef} onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" autoComplete='true' className="form-control" id="password" name="password" />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
}

export default Login;
