import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '아이디', type: 'text', placeholder: 'admin' },
        password: { label: '비밀번호', type: 'password', placeholder: '1234' },
      },
      async authorize(credentials) {
        if (
          credentials?.username === 'admin' &&
          credentials?.password === '1234'
        ) {
          const user = { id: '1', name: 'admin' };

          return user;
        }
        return null;
      },
    }),
  ],
});
