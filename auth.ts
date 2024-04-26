import NextAuth, { NextAuthConfig } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

declare module 'next-auth' {
    export interface Session {
        sessionToken: string;
    }
}

export const authConfig = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.preferred_username,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
    callbacks: {
        // async jwt({ token, user, account }) {
        //     // Persist the OAuth access_token to the token right after signin
        //     if (account) {
        //         token.accessToken = account.access_token;
        //     }

        //     return token;
        // },
        async session({ session, token }) {
            if (typeof token?.accessToken === 'string') {
                session.sessionToken = token.accessToken;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
