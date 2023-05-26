import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';


import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Handles sign up form 
const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) { 
      console.log(error)
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
    console.log(userFormData)

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
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
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;




// const signupFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#name-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
  
//     if (name && email && password) {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({name, email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       // console.log("data",[name, email, password])
//       // console.log("response", response);
//       if (response.ok) {
//         // if successful, redirect the broswer to the home page
//         document.location.replace('/');
//         console.log("data",[name, email, password])
//         console.log("response", response);
//       } else {
//         alert(response.statusText);
//       }
//     }
//   };

//   document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);


//   <div className="col ">
//       <form className="signup-form">
//           <div className="mb-3">
//               <h2 className="page-title">Sign Up</h2>
//                <form className="form"/>
//                   <div className="form-group">
//                       <label for="name-signup" className="form-label">Name</label>
//                           <input
//                               type="name"
//                               className="form-control"
//                               id="name-signup"/>
//                   </div>
//           </div>
//           <div className="mb-3">
//               <div className="form-group">
//                   <label for="email-signup" className="form-label">Email address</label>
//                   <input
//                       type="email"
//                       className="form-control"
//                       id="email-signup"/>
//               </div>
//           </div>
//           <div className="mb-3">
//               <div className="form-group">
//                   <label for="password-signup" className="form-label">Password</label>
//                   <input
//                       type="password"
//                       className="form-control"
//                       id="password-signup"/>
//               </div>
//           </div>
//               <div className="form-group">
//                   <button className="btn btn-primary" type="submit">Sign Up</button>
//               </div>
//       </form>
//       </div>
  