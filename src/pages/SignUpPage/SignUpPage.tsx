import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signIn, signUp } from 'aws-amplify/auth';
import { SignUpSubmitForm } from '../../interfaces/SignInSignUpInterfaces';
import SignInSignUpComponent from '../../sharedComponent/SignInSignUpComponent/SignInSignUpComponent';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../queries/AuthQuery';
import { generateDataUrl, getUser } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../providers/AppProvider';

const SignUpPage: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { refetchCurrentUserData } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const validationSchemaForSignUp = Yup.object().shape({
    email: Yup.string()
      .required(intl.formatMessage({ id: 'requiredEmailTitle' }))
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        intl.formatMessage({ id: 'validEmailTitle' })
      )
      .email(intl.formatMessage({ id: 'validEmailTitle' }))
      .trim(),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_+}\[\]\{":;'’?><,./\\\|=-])[A-Za-z\d~`!@#$%^&*()_+}\[\]\{":;'’?><,./\\\|=-]{8,}$/,
        'Minimum 8 characters; at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      ),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const useFormReturn = useForm<SignUpSubmitForm>({
    mode: 'all',
    resolver: yupResolver(validationSchemaForSignUp),
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: async () => {
      try {
        const { isSignedIn } = await signIn({
          username: useFormReturn.getValues('email'),
          password: useFormReturn.getValues('password'),
        });
        if (isSignedIn) {
          await getUser();
          refetchCurrentUserData();
          navigate('/doc');
        }
      } catch (e: unknown) {
        const errorMsg = (e as { message: string })?.message;
        setErrorMessage(errorMsg);
        console.log('error on sign in after create user', errorMsg);
      }
    },
    onError: (err) => {
      setErrorMessage(err.message);
    },
  });

  const handleSignUp = async (formData: SignUpSubmitForm) => {
    try {
      const { userId } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
        },
      });

      const profileUrl = generateDataUrl(formData.email?.[0]?.toUpperCase());
      await createUser({
        variables: {
          createUserInput: {
            emailId: formData.email,
            profileUrl,
            cognitoUserName: userId,
          },
        },
      });
    } catch (e: unknown) {
      const message = (e as { message: string })?.message;
      console.log('error on sign up', message);
      setErrorMessage(message);
    }
  };

  return (
    <SignInSignUpComponent
      useFormReturn={useFormReturn}
      onSubmit={handleSignUp}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      type="signUp"
    />
  );
};

export default SignUpPage;
