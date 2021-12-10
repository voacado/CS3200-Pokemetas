import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormBox from '../components/form/FormBox';

/**
 * Page to change your password
 * 
 * @param props Properties passed from parent component
 */
function ChangePassword(props) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    // subfunction to handle password change submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const element = document.getElementById("message");
        if (password.length > 50) {
          element.innerHTML =  "Password must be 50 or less characters.";
          setTimeout(() => { element.innerHTML =  ""; }, 2000);
          return;
        }
        if (password !== confirm) {
            element.innerHTML =  "The two passwords do not match";
            setTimeout(() => { element.innerHTML =  ""; }, 2000);
            return;
        }
        const data = await editPass(password);
            if (data.success) {
                element.innerHTML = data.message
            } else {
                element.innerHTML =  data.message;
                setTimeout(() => { element.innerHTML =  ""; }, 2000);
            }
    }

        return <FormBox title='Change Password' 
        handleSubmit={handleSubmit} 
        topName="Password"
        bottomName="Confirm Password"
        topType="password"
        bottomType="password"
        setTop={setPassword} 
        setBottom={setConfirm}/>  
}

/**
  * Async function call to backend API repsonsible for changing password.
  * @param {String} password 
  */
 async function editPass(password) {
    let port = "";
    if (window.location.port) {
      port = `:${window.location.port}`
    } 
  
    return fetch(`http://${window.location.hostname}${port}/api/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        console.log(data);
      }
    })
  }

export default ChangePassword;