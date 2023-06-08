import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonWithText, InputForm, CheckBoxForm, TitleForm, TextUnderline } from '../UI';
import { Signin } from '../';

import { useAppDispatch } from '../../hooks/hooks';
import { setMessageIsOpen, switchForm, setIsOpen } from '../../store/popupSlice';
import { getUser, updateStatus } from '../../store/userSlice';
import { signUp, signIn, sendVerificationCode } from '../../store/authSlice';
import { registerEmail, registerPassword, registerRepeatPassword } from '../../utils/registersRHF';
import styles from './Signup.module.scss';
import { ADD_STICKERS } from '../../utils/constants';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const userEmail = getValues('email');
  const userPassword = getValues('password');

  const onSubmit = () => {
    dispatch(signUp({ email: userEmail, password: userPassword })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(sendVerificationCode());
        dispatch(signIn({ email: userEmail, password: userPassword })).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(getUser());
            dispatch(updateStatus(true));
            dispatch(setIsOpen(false));
            navigate(ADD_STICKERS);
            dispatch(
              setMessageIsOpen({
                messageIsOpen: true,
                message: 'Подтвердите почту',
                messageIsError: false,
              }),
            );
          }
        });
      }
      if (res.meta.requestStatus === 'rejected' && res.payload === '400') {
        dispatch(
          setMessageIsOpen({
            messageIsOpen: true,
            message: 'Учётная запись с такой почтой уже существует',
            messageIsError: true,
          }),
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signup}>
      <TitleForm>Регистрация</TitleForm>
      <div className={styles.inputs}>
        <InputForm
          register={register}
          option={{
            ...registerEmail,
            onBlur: (value: React.FocusEvent<HTMLInputElement>) => {
              setValue('email', value.target.value.trim());
            },
          }}
          error={errors?.email}
          placeholder='example@gmail.com'
          name='email'
          label='Электронная почта'
          type='email'
        />
        <InputForm
          register={register}
          option={{
            ...registerPassword,
            validate: (val: string) => {
              if (val.indexOf(' ') >= 0) {
                return '';
              }
            },
          }}
          error={errors?.password}
          placeholder='Пароль'
          name='password'
          label='Пароль'
          type='password'
          optionalEyeButton={{
            visible: dirtyFields.password && watch('password') !== '',
          }}
        />

        <InputForm
          register={register}
          option={{
            ...registerRepeatPassword,
            validate: (val: string) => {
              if (val !== watch('password')) {
                return 'Пароли не совпадают';
              }
            },
          }}
          error={errors?.passwordCheck}
          placeholder='Подтвердите пароль'
          name='passwordCheck'
          label='Подтвердите пароль'
          type='password'
          optionalEyeButton={{
            visible: dirtyFields.passwordCheck && watch('passwordCheck') !== '',
          }}
        />
      </div>
      <CheckBoxForm
        name='confirmCheckbox'
        register={register}
        option={{ required: 'Обязательное поле' }}
        error={errors?.confirmCheckbox}
      >
        <p className={styles.checktext}>
          Я согласен с{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Политикой конфиденциальности
          </a>{' '}
          и{' '}
          <a href='#id' target='_blank' className={styles.documentLink}>
            Условиями использования сервиса
          </a>
        </p>
      </CheckBoxForm>
      <ButtonWithText type='submit'>Зарегистрироваться</ButtonWithText>
      <span className={styles.link}>
        Уже есть аккаунт?{' '}
        <TextUnderline type='button' onClick={() => dispatch(switchForm(Signin))}>
          Войти
        </TextUnderline>
      </span>
    </form>
  );
};

export { Signup };
