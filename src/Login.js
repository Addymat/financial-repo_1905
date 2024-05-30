import React, { useRef, useState } from 'react';
import { useUser } from './UserContext';  // Import useUser
import { checkvalidate } from './Validate';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { nameRef } = useUser();  // Access nameRef from context
  const email = useRef();
  const password = useRef();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: 'AIzaSyD1i5fBchw4DS_8vxTlWsgkGo-4ZrlkEkA',
    authDomain: 'netpt-32cfd.firebaseapp.com',
    projectId: 'netpt-32cfd',
    storageBucket: 'netpt-32cfd.appspot.com',
    messagingSenderId: '554356263243',
    appId: '1:554356263243:web:ef2bf453a3803b5a0600ce',
    measurementId: 'G-63RY700T7T'
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  const auth = getAuth();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const Checkit = () => {
    const message = checkvalidate(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) {
      return null;
    }

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: 'https://static.toiimg.com/thumb/msid-50379034,imgsize-39752,width-400,resizemode-4/50379034.jpg'
          }).then(() => {
            navigate('/home');
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.message} - ${error.code}`);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          setErrorMessage(`${error.message} - ${error.code}`);
        });
    }
  };

  return (
    <div className='container-fluid bg-secondary'>
    <form onSubmit={(e) => e.preventDefault()} className="signin">
      <div className="sign-text">{isSignInForm ? 'Sign In' : 'Sign Up'}</div>
      <div>
        <input ref={email} type="text" className="email" placeholder="Email Address" />
      </div>
      <div>
        {!isSignInForm && <input ref={nameRef} type="text" className="pw" placeholder="Full Name" />}
      </div>
      <div>
        <input ref={password} type="password" className="pw" placeholder="password" />
      </div>
      <p className="errmess">{errorMessage}</p>
      <button className="sign" onClick={Checkit}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
      <p className="newsign">{isSignInForm ? 'New to Streak?' : 'Already have an account?'}</p>
      <p className="newsignlink" onClick={toggleSignInForm}>{isSignInForm ? 'Sign Up Now' : 'Sign in'}</p>
    </form>
    </div>
  );
};

export default Login;
