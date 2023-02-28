import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../UI/ButtonSubmit';
import { CheckBoxForm } from '../UI/CheckBoxForm';
import { InputForm } from '../UI/InputForm';
import { TitleForm } from '../UI/TitleForm';
import { Signup } from '../Signup';

import styles from './Signin.module.scss';
import { switchForm } from '../../store/formSlice';
import { ResetPassword } from '../ResetPassword';

const Signin: React.FC = () => {
  const dispath = useDispatch();

  return (
    <form className={styles.signin}>
      <TitleForm>Войти в личный кабинет</TitleForm>
      <div className={styles.inputs}>
        <InputForm placeholder='vashapochta@gmail.com' name='email' label='Email' type='email' />
        <InputForm
          placeholder='впишите пароль'
          name='password'
          label='Пароль'
          type='password'
          optionalButton={{ text: 'Забыли пароль?', onClick: () => {dispath(switchForm(ResetPassword))} }}
        />
        <CheckBoxForm label='Запомнить меня' />
      </div>
      <ButtonSubmit>Войти</ButtonSubmit>
      <span className={styles.link}>Нет аккаунта? <button onClick={() => dispath(switchForm(Signup))} type='button' className={styles.button}>Зарегистрироваться</button></span>
    </form>
  );
};

export { Signin };
