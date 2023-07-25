import { Layout } from '@components/layout';
import { Input, SmartForm } from '@components/smart-form';
import { useRef } from 'react';

import useTitle from '../../hooks/use-title';
import { LoginValidation } from './../../libs/validations';
import styles from './Login.module.scss';
import { ILogin } from './type';

export type TLogin = {
  email: string;
  password: string;
};

// const defaultValues = {
//   email: 'test@test.com',
//   password: 'test'
// };

const Login = () => {
  const headTitleRef = useRef<string>('Login');
  useTitle(headTitleRef.current);

  const onSubmit = (data: ILogin) => {
    console.log(data);
  };

  return (
    <Layout>
      <section className={styles.login}>
        <SmartForm<TLogin>
          validationSchema={LoginValidation}
          onSubmit={onSubmit}
          // options={{ defaultValues }}
          cancelLink="/login"
        >
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <button type="submit">Submit</button>
        </SmartForm>
      </section>
    </Layout>
  );
};

export default Login;
