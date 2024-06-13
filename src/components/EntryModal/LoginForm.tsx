import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { LoadingSpinner } from '../LoadingSpinner';
import SocialLoginButtons from './SocialLoginButtons';

interface Props {
  isOpen: boolean;
  moveToSignUp: () => void;
  closeDialog: () => void;
}

const LoginForm: React.FC<Props> = ({ isOpen, moveToSignUp, closeDialog }) => {
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setError('');
  }, [isOpen]);

  const handlePasswordLogin = async () => {
    try {
      const user = await auth.logInWithPassword(email, password);
      closeDialog();
    } catch (err: any) {
      console.error(err);
      setError('Authentication Failed');
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6 overflow-y-scroll">
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
          if (e.key === 'Enter' && !auth.loading) {
            handlePasswordLogin();
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
          if (e.key === 'Enter' && !auth.loading) {
            handlePasswordLogin();
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
        disabled={auth.loading}
        onClick={() => handlePasswordLogin()}
      >
        {auth.loading ? (
          <LoadingSpinner style="h-8 fill-platinum dark:fill-black dark:text-blue" />
        ) : (
          'Log In'
        )}
      </button>

      <div className="flex w-full items-center justify-around">
        <hr className="w-full" />
        <span className="mx-4 text-sm">or</span>
        <hr className="w-full" />
      </div>

      <SocialLoginButtons setError={setError} closeDialog={closeDialog} />

      {error && <span className="text-sm text-[#e62c2c]">{error}</span>}

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
