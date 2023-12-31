import { Input, SmartForm } from '@components/smart-form';
import Button from '@components/ui/buttons/Button';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useHttpClient } from './../../hooks/use-http';
import useTitle from './../../hooks/use-title';
import { SignupValidation } from './../../libs/validations';
import styles from './../login/Login.module.scss';
import { TSignup } from './type';

const Signup = () => {
  const navigate = useNavigate();
  const headTitleRef = useRef<string>('Signup');
  useTitle(headTitleRef.current);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const errorText = document.getElementById('signup-error');
    window.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (target === errorText) return;
      clearError();
    });
  }, [error]);

  const onSubmit = async (data: TSignup) => {
    try {
      const { username, email, password, confirmPassword } = data;
      const url = `${
        import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : ''
      }/api/signup`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json'
      };
      const body = JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
      (await sendRequest({ url, method, headers, body })) as Promise<TSignup>;
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`${styles.login} form-section`}>
      <div className="frame">
        {error && <p id="signup-error">{error}</p>}
        {isLoading && <h1>LOADING</h1>}
        <SmartForm<TSignup>
          validationSchema={SignupValidation}
          onSubmit={onSubmit}
          options={{}}
          cancelLink="/signup"
        >
          <Input name="username" type="text" />
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Input name="confirmPassword" type="password" />
          <Button type="submit" text="Submit" style="submit" />
          <div className={styles.login__account}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </SmartForm>
      </div>
    </section>
  );
};

export default Signup;
