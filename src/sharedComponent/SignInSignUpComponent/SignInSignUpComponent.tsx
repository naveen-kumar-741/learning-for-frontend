import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, Path } from 'react-hook-form';
import CustomButton from '../CustomButton/CustomButton';
import {
  PageType,
  SignInSignUpComponentProps,
} from '../../interfaces/SignInSignUpInterfaces';
import CustomInput from '../CustomInput/CustomInput';
import styles from './SignInSignUpComponent.module.scss';

const SignInSignUpComponent = <T extends FieldValues>({
  useFormReturn,
  onSubmit,
  type,
  errorMessage,
  setErrorMessage,
}: SignInSignUpComponentProps<T>) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormReturn;

  const watchAllFields = watch();
  useEffect(() => {
    setErrorMessage('');
  }, [
    watchAllFields?.email,
    watchAllFields.password,
    watchAllFields?.confirm_password,
    setErrorMessage,
  ]);

  // Hub.listen("auth", ({ payload: { event }, ...rest }) => {
  //   switch (event) {
  //     case "signedIn":
  //     case "signInWithRedirect":
  //       getUser().then((userData) => console.log(userData));
  //       break;
  //     case "signedOut":
  //       break;
  //     case "tokenRefresh_failure":
  //     case "signInWithRedirect_failure":
  //       console.log("Sign in failure");
  //       break;
  //   }
  // });

  return (
    <div className={styles.signInPage}>
      <div className={styles.signInBlock}>
        <form className={styles.signInForm} onSubmit={handleSubmit(onSubmit)}>
          <img
            className={styles.logo}
            src="/assets/images/logo_final.jpg"
            alt="logo"
          />
          <div className={styles.signInFormFields}>
            <CustomInput
              label="Email Id"
              type="text"
              errorMessage={errors.email?.message as string}
              {...register('email' as Path<T>)}
            />

            <CustomInput
              label="Password"
              type="password"
              errorMessage={errors.password?.message as string}
              {...register('password' as Path<T>)}
            />

            {type === 'signUp' && (
              <CustomInput
                label="Confirm Password"
                type="password"
                errorMessage={errors.confirm_password?.message as string}
                {...register('confirm_password' as Path<T>)}
              />
            )}
            <SignInSignUpSwitcher type={type} />
            <div
              className={`formError d-flex align-items-center justify-content-center ${
                errorMessage && 'show'
              }`}
            >
              <span className="ic-form-invalid" />{' '}
              <span className="ms-1">{errorMessage}</span>
            </div>
          </div>
          <CustomButton className={styles.signInBtn} type="submit">
            Sign {type === 'signIn' ? 'In' : 'Up'}
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const SignInSignUpSwitcher: React.FC<{ type: PageType }> = ({ type }) => {
  if (type === 'signIn') {
    return (
      <span className={styles.signInFormText}>
        Don't have an account, <Link to="/sign-up">Sign Up</Link>
      </span>
    );
  }
  return (
    <span className={styles.signInFormText}>
      Already have an account, <Link to="/sign-in">Sign In</Link>
    </span>
  );
};

export default SignInSignUpComponent;
