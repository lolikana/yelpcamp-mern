import { Input, SmartForm } from '@components/smart-form';
import Button from '@components/ui/buttons/Button';
import { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from './../../context/auth-context';
import { useHttpClient } from './../../hooks/use-http';
import useTitle from './../../hooks/use-title';
import { LoginValidation } from './../../libs/validations';
import styles from './Login.module.scss';
import { TLogin, TLoginResponse } from './type';

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
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
      const url = `${
        import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : ''
      }/api/login`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json'
      };
      console.log(import.meta.env.PROD);
      const body = JSON.stringify({
        email: email,
        password: password
      });
      const res = (await sendRequest({ url, method, headers, body })) as TLoginResponse;

      auth.login(res.userId, res.token);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`${styles.login} form-section`}>
      <div className="frame">
        {error && <p id="login-error">{error}</p>}
        {isLoading && <h1>LOADING</h1>}
        <SmartForm<TLogin>
          validationSchema={LoginValidation}
          onSubmit={onSubmit}
          options={{}}
          cancelLink="/login"
        >
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Button type="submit" text="Submit" style="submit" />
          <div className={styles.login__account}>
            Don’t have an account yet? <Link to="/signup">Sign up</Link>
          </div>
        </SmartForm>
      </div>
    </section>
  );
};

export default Login;
