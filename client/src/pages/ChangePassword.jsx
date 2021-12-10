import React, { useState } from 'react';
import FormBox from '../components/form/FormBox';
import LoginBox from '../components/form/LoginBox';

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

    if (!props.token) {
      return <LoginBox setToken={props.setToken} />
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
    let link = "";
    if (window.location.port) {
      link = `http://${window.location.hostname}:${window.location.port}/api/change-password`
    } else {
      link =`https://${window.location.hostname}/api/change-password`
    }
  
    return fetch(link, {
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