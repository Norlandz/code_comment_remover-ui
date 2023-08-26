'use client'

// import Loki from 'lokijs';
// const Loki = require('lokijs')
// import loki from 'lokijs/src/lokijs.js';

// ;[pb: custom register? security pb?]; []
// ;[pb: custom register? security pb?]; To handle form submission, we’ll create an `onSubmit` function that will be called when the user submits the form. In this function, we’ll extract the values entered by the user and use the Fetch API to send a POST request to our API route handler, which we’ll create shortly.
// ;[pb: custom register? security pb?]; <>
// ;[pb: custom register? security pb?]; https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/#create-the-custom-signup-page

import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setFormValues({ username: '', email: '', password: '' }); //need_check

    // ~~~//aga now think about call to server side
    try {
      const res = await fetch('/requestMapping/authCustom/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      // signIn(undefined, { callbackUrl: '/' });
      signIn();
    } catch (error: any) {
      setLoading(false);
      setError(JSON.stringify(error)); // here is the react pb... 
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`handle change - ${name} ${value} :: ${JSON.stringify(formValues)}`)
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      <input required type="name" name="username" value={formValues.username} onChange={handleChange} placeholder="Username" />
      <input required type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email address" />
      <input required type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
      <button type="submit" disabled={loading}>
        {loading ? 'loading...' : 'Sign Up'}
      </button>
    </form>
  );
}
