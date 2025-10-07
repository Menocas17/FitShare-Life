import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'database' },
  callbacks: {
    async signIn({ profile }) {
      let { data: user } = await supabase
        .from('users')
        .select('id, email, name, avatar, google_id')
        .eq('email', profile!.email as string)
        .single();

      if (!user) {
        const { data: newUser } = await supabase
          .from('users')
          .insert({
            email: profile?.email as string,
            name: profile?.name as string,
            avatar: profile?.picture as string,
            session_token: null,
            session_expiry: null,
            google_id: profile?.sub as string,
          })
          .select('id, email, name, avatar, google_id')
          .single();

        user = newUser;

        await supabase.from('profiles').insert({
          user_id: newUser?.id,
          bio: '',
          height: null,
          weight: null,
          weight_goal: null,
          body_measurements: {
            chest: null,
            waist: null,
            hips: null,
            thighs: null,
          },
        });
      } else {
        if (!user.google_id) {
          await supabase
            .from('users')
            .update({
              google_id: profile?.sub,
              avatar: profile?.picture as string,
            })
            .eq('id', user.id);
        }
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await supabase
        .from('users')
        .update({ session_token: token, session_expiry: expiry.toISOString() })
        .eq('id', user!.id);

      return `/api/auth/set-session?token=${token}`;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith('/') ? `${baseUrl}${url}` : url;
    },
  },
});

export { handler as GET, handler as POST };
