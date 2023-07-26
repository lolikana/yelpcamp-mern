import { Layout } from '@components/layout';
import { Input, SmartForm } from '@components/smart-form';
import Button from '@components/ui/buttons/Button';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useHttpClient } from './../../hooks/use-http';
import useTitle from './../../hooks/use-title';
import { LoginValidation } from './../../libs/validations';
import styles from './Login.module.scss';
import { TLogin } from './type';

const defaultValues = {
  email: 'postman1@postman.com',
  password: 'postman1'
};

const Login = () => {
  const headTitleRef = useRef<string>('Login');
  useTitle(headTitleRef.current);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const errorText = document.getElementById('login-error');
    window.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (target === errorText) return;
      clearError();
    });
  }, [error]);

  const onSubmit = async (data: TLogin) => {
    try {
      const { email, password } = data;
      const url = `${import.meta.env.VITE_PATH}${import.meta.env.VITE_PORT}/login`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json'
      };
      const body = JSON.stringify({
        email: email,
        password: password
      });
      const res = (await sendRequest(url, method, headers, body)) as Promise<TLogin>;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <section className={styles.login}>
        {error && <p id="login-error">{error}</p>}
        {isLoading && <h1>LOADING</h1>}
        <SmartForm<TLogin>
          validationSchema={LoginValidation}
          onSubmit={onSubmit}
          options={{ defaultValues }}
          cancelLink="/login"
        >
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Button type="submit" text="Submit" style="submit" />
          <div className={styles.login__account}>
            Don’t have an account yet? <Link to="/signup">Sign up</Link>
          </div>
        </SmartForm>
      </section>
    </Layout>
  );
};

export default Login;
