import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';


import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// changed file to Login.js
const LoginFormHandler =  (event) => {
  

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.loginUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  // Collect values from the login form
  // const email = document.querySelector('#email-login').value.trim();
  // const password = document.querySelector('#password-login').value.trim();

//   if (email && password) {
//     // Send a POST request to the API endpoint
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log("response", response);
//     if (response.ok) {
//       // If successful, redirect the browser to the dashboard page
//       document.location.replace('/profile');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };


// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);
return (
 <>
  {/* <div className="container-sm p-3 text-primary-emphasis bg-primary-subtle border border-4 border-primary-subtle rounded-3" >
  <div className="container text-center">
      <div className="row align-items-start">
          <div className="col">
              <h2 className="page-title">Log In</h2>
          <form className="login-form">
              <div className="mb-3">
                  <div className="form-group">
                  <label for="email-login" className="form-label">Email</label>
                  <input
                      type="email"
                      className="form-control"
                      id="email-login"/>
                  </div>
              </div>
              <div className="mb-3">
                  <div className="form-group">
                  <label for="password-login" className="form-label">Password</label>
                  <input
                      type="password"
                      className="form-control"
                      id="password-login"
                  />
                  </div>
              </div>
              <div className="form-group">
                  <button className="btn btn-primary" type="submit">Log In</button>
              </div>
          </form>
      </div>
      <div className="vr"></div>
      </div>
  </div>
</div> */}
 <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>

</>
)

}

export default LoginFormHandler;
