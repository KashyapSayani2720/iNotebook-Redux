import React, { useRef, useState } from 'react';
import { useUserRegisterMutation } from '../services/auth';
import { Toast } from 'primereact/toast';

function Register(props) {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  let isError = false;

  async function handleOnSubmit(e) {
    e.preventDefault();

    const nameValue = formRef.current.name.value;
    const emailValue = formRef.current.email.value;
    const passwordValue = formRef.current.password.value;
    const confirmPasswordValue = formRef.current.cpassword.value;

    // Validate password
    if (!nameValue.trim()) {
      isError = true;
      setErrors(prevErrors => ({
        ...prevErrors,
        name: 'Please enter your name.'
      }));
    } else {
      isError = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        name: null
      }));
    }

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
        cpassword: null
      }));
    }

    if (!confirmPasswordValue.trim()) {
      isError = true;
      setErrors(prevErrors => ({
        ...prevErrors,
        cpassword: 'Please enter your password again.'
      }));
    }
    else if(passwordValue.trim() !==  confirmPasswordValue.trim()){
      isError = true;
      setErrors(prevErrors => ({
        ...prevErrors,
        cpassword: 'Please enter same password again.'
      }));
    } 
    else {
      isError = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        cpassword: null
      }));
    }

    // // Proceed with the form data if no errors
    if (!isError) {
      const data = {
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }

      const newUser = await register(data);

      if (newUser["data"]["success"] === true) {
        await localStorage.setItem('token', newUser["data"]["authToken"]);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Registered Successfully', life: 3000 });
        window.location.replace("http://localhost:3000/");
      }
      else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: newUser["data"]["error"], life: 3000 });
      }
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const [register] = useUserRegisterMutation();
  const toast = useRef(null);

  return (
    <>
    <Toast ref={toast} />
    <div className='m-5'>
      <h1 className='text-center'>Register Here !!!</h1>
      <form ref={formRef} onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="name" className="form-control" id="name" name="name" />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" name="email" />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" autoComplete='true' className="form-control" id="password" name="password" />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" autoComplete='true' className="form-control" id="cpassword" name="cpassword" />
          {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  );
}

export default Register;
