import { auth } from './firebase';

export const authHeader = async () => {
  const token = auth.currentUser ? await auth.currentUser?.getIdToken() : null;
  return token ? { Authorization: 'Bearer ' + token } : {};
};
