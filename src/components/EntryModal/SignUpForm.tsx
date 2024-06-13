import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { LoadingSpinner } from '../LoadingSpinner';
import SocialLoginButtons from './SocialLoginButtons';

interface Props {
  isOpen: boolean;
  moveToLogin: () => void;
  closeDialog: () => void;
}

const SignUpForm: React.FC<Props> = ({ isOpen, moveToLogin, closeDialog }) => {
  const auth = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setTermsAgree(false);
    setError('');
  }, [isOpen]);

  const handlePasswordSignUp = async () => {
    try {
      const user = await auth.signUpWithPassowrd(
        email,
        password,
        firstName,
        lastName,
        termsAgree
      );
      closeDialog();
    } catch (err: any) {
      console.error(err);
      setError(
        'We hit a snag signing you up. Sorry about that! Try again or contact us for assistance.'
      );
    }
  };

  return (
    <div className="p-6 py-10 overflow-y-scroll">
      <div className="flex flex-col items-center gap-y-6">
        <span className="w-full pl-1 text-left text-xl">
          Create Your Free Account:
        </span>

        <SocialLoginButtons setError={setError} closeDialog={closeDialog} />

        <div className="flex w-full items-center justify-around">
          <hr className="w-full" />
          <span className="mx-4">or</span>
          <hr className="w-full" />
        </div>
      </div>

      <form
        className="flex flex-col items-center gap-4 pt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordSignUp();
        }}
      >
        <div className="flex w-full justify-around gap-4">
          <input
            required={true}
            type="name"
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className="h-12 w-1/2 rounded-sm border p-3 pl-5"
          />
          <input
            required={true}
            type="name"
            placeholder="Last Name*"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className="h-12 w-1/2 rounded-sm border p-3 pl-5"
          />
        </div>
        <input
          required={true}
          type="email"
          placeholder="E-mail*"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="h-12 w-full rounded-sm border p-3 pl-5"
        />
        <input
          required={true}
          id="password"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="h-12 w-full rounded-sm border p-3 pl-5"
        />
        <div className="flex w-full items-center gap-1.5 pl-1 py-2">
          <input
            required={true}
            type="checkbox"
            id="termsAgreeCheckbox"
            checked={termsAgree}
            title="I Agree to Terms and Conditions"
            onChange={() => setTermsAgree(!termsAgree)}
            className="h-3.5 w-3.5 rounded-sm text-right text-primary focus:ring-2"
          />
          <label htmlFor="termsAgreeCheckbox" className="text-sm">
            I Agree to{' '}
            <a
              href="/terms"
              target="_blank"
              className="underline underline-offset-1"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
        <button
          className={cn('h-12 w-full rounded-md border text-center', {
            'hover:bg-opacity-95': !auth.loading,
          })}
          disabled={auth.loading}
        >
          {auth.loading ? (
            <LoadingSpinner style="h-8 fill-platinum dark:fill-black dark:text-blue" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className={cn('flex items-center justify-center text-center')}>
        {error && <span className="mt-4 text-sm text-[#e62c2c]">{error}</span>}
      </div>
      <p className="w-full pt-6 text-center text-sm">
        Already have an account?{' '}
        <span className="cursor-pointer underline" onClick={moveToLogin}>
          Log In
        </span>
      </p>
    </div>
  );
};

export default SignUpForm;
