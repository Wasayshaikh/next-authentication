import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await signIn('credentials', {
          redirect: false,
          username: credentials.username,
          password: credentials.password,
        });
  
        if (result?.error) {
          console.error('Authentication failed:', result.error);
        } else {
          // Redirect to dashboard if the user is authenticated
          router.push('/');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
