import { auth } from '@/lib/firebase';
import cn from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import SocialLoginButtons from './SocialLoginButtons';

interface Props {
  moveToSignUp: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ moveToSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitPasswordLogin = async () => {
    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <span className="text-[48px] flex leading-none border-[3px] rounded-[3px] px-[6px] pb-[12px] pt-[3px] cursor-pointer shadow-sm mt-3 mb-5">
        p3y
      </span>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            submitPasswordLogin();
          }
        }}
        className="h-12 w-full rounded-sm border p-3 pl-5"
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !loading) {
            submitPasswordLogin();
          }
        }}
        className="h-12 w-full rounded-sm border p-3 pl-5"
      />
      <div className="flex w-full items-center justify-between px-1 pb-1">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="rememberMeCheckbox"
            checked={rememberMe}
            title="Remember Me"
            onChange={() => setRememberMe(!rememberMe)}
            className="h-3.5 w-3.5 rounded-sm text-right text-primary focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="rememberMeCheckbox" className="text-sm">
            Remember Me?
          </label>
        </div>
        <span className="cursor-pointer text-sm underline">
          I forgot my password
        </span>
      </div>
      <button
        className={cn('h-12 w-full rounded-md text-center border')}
        disabled={loading}
        onClick={() => submitPasswordLogin()}
      >
        {loading ? (
          <LoadingSpinner style="h-8 fill-platinum dark:fill-black dark:text-blue" />
        ) : (
          'Log In'
        )}
      </button>
      {error && <span className="text-sm text-[#e62c2c]">{error}</span>}

      <div className="flex w-full items-center justify-around">
        <hr className="w-full" />
        <span className="mx-4 text-sm">or</span>
        <hr className="w-full" />
      </div>

      <SocialLoginButtons loading={loading} />

      <p className="py-2 text-sm">
        New here?{' '}
        <span className="cursor-pointer underline" onClick={moveToSignUp}>
          Join the Movement
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
