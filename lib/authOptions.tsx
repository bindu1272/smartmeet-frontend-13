import get from "lodash/get";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { axiosInstance } from "../remote/axios";
import type { AuthOptions } from "next-auth";
import axios from "axios";

const publicRuntimeConfig = process.env.NEXT_PUBLIC_API_URL;

const authOptions: AuthOptions = {
    pages: {
      signIn: "/login",
      error: "/login",
    },
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: "Credentials" as string,
        credentials: {
          email: { label: 'email', type: 'text' },
          password: { label: 'password', type: 'password' }
        },
        async authorize(credentials, req) {
          let user = await axios
            .post(publicRuntimeConfig + "/patients/login", {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((res) => {
              return {
                ...res.data.data.user,
                token: get(res, "data.data.access_token"),
              };
            })
            .catch((err) => {
              console.log("Error",err?.response?.data);
              throw new Error( err?.response?.data?.message || "Invalid Credentials");
            });
  
          console.log("User", user);
          return user;
        },
      }),
      // ...add more providers here
  
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      signIn: async ({user, account, profile}:any) => {
        console.log("Signed in >>>>>>>>>>>>>>");
        console.log("Account, Profile", user, account, profile);
        // if (account.provider === 'google') {
        if (user?.account?.provider === "google" || account?.provider === "google") {
          let req = {...profile,...account}
          if(user?.account?.provider === "google"){
            req = {...user?.profile,...user?.account}
          }
          await axiosInstance
            .post("/patients/gmail-login", req)
            .then((res) => {
              user.user = { ...res.data.data.user };
              user.token = get(res, "data.data.access_token");
            });
        }
        if (user?.account?.provider === "facebook" || account?.provider === "facebook") {
          let req = {...profile,...account}
          if(user?.account?.provider === "facebook"){
            req = {...user?.profile,...user?.account}
          }
  
          await axiosInstance
            .post("/patients/gmail-login", req)
            .then((res) => {
              user.user = { ...res.data.data.user };
              user.token = get(res, "data.data.access_token");
            });
        }
       
        return true;
      },
      
      jwt: async ({ token, user }: any) => {
        user && (token.user = user);
        console.log("********", token);
        return Promise.resolve(token); // ...here
      },
      session: async ({ session, token, user }: any) => {
        console.log("********1", session, user, token);
        session.user = token.user;
        return Promise.resolve({
          ...session,
          user: {
            ...session.user,
            id: session.user.id,
          },
        });
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };

  export default authOptions;
  