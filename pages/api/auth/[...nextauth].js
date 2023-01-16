import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";

import { connectMongo } from "../../../db/connectDb";
import mongoose from "mongoose";
import User from "../../../db/models/User";

import { compare } from "bcryptjs";

export default NextAuth({
  //Configure JWT
  session: {
    jwt: true,
  },

  //Specify Provider
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        //Connect to DB
        await connectMongo();
        //Get all the users
        //Find user with the email
        const result = await User.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!result) {
          mongoose.connection.close();

          throw new Error("Несъществуващ и-мейл");
        }

        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          mongoose.connection.close();

          throw new Error("Грешна парола");
        }
        //Not verifed
        if (!result.isVerified) {
          mongoose.connection.close();
          throw new Error("Не ви е потвърден акаунта");
        }
        //Else send success response
        mongoose.connection.close();

        return {
          email: result.email,
          name: result.name,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

      async profile(profile, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        try {
          await connectMongo();
          const result = await User.findOne({
            email: profile.email,
          });
          // isVerified = true
          // isSocialMedia

          if (!result) {
            await User.create({
              fullName: profile.name,
              email: profile.email,
              isVerified: true,
              isSocialMedia: true,
              password: 123,
            });
          }
          if (result && !result.isSocialMedia) {
            return {
              id: "Error: И-мейла съществува",
              email:
                "Error: И-мейла е регистриран. Свържете се с нас за повече информация",
            };
          }
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
});
