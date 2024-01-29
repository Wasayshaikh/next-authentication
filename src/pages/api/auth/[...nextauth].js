import * as fs from 'fs/promises'
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: 'Username', type: 'text' },
              password: {  label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const { username, password } = credentials;
                const data = await fs.readFile("data/users.json","utf-8");
                const dataJson = JSON.parse(data)
                const findUser =  dataJson.user.find(user => user.email === username && user.password === password);
             
                if (findUser) {
                  // If credentials are valid, return an object with the user data
                  const { id, name, email } = findUser;
                  return Promise.resolve({ id, name:name, email:email});
                }
                else{
                   return Promise.resolve(null);
                }
        
                // If credentials are invalid, return null
                return Promise.resolve(null);
              },
        })
    ],
    pages: {
        signIn: '/',
      },
      callbacks: {
        async session(session, user) {
          return Promise.resolve({ ...session, user });
        },
      },
      session: {
        jwt: false,
      },
})