import React from 'react';

export const checkvalidate = (email,password) => {
  const isemail= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const ispassword= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if(!isemail)
  return "Email is Not Valid";

  else if(!ispassword)
  return "Password is Not Valid";

  return null;



};


