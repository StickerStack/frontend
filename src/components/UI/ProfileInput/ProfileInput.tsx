import cn from 'classnames';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { IconButton } from '../IconButton/IconButton';

import styles from './ProfileInput.module.scss';

interface IProps {
  name: string;
  type: 'email' | 'text' | 'submit';
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  option?: RegisterOptions;
  iconVisible?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  onClear?: () => void;
}

const ProfileInput: React.FC<IProps> = ({
  name,
  type,
  placeholder,
  register,
  option,
  iconVisible = false,
  error,
  onClear,
}: IProps) => {
  return (
    <div className={cn(styles.input_container, { [`${styles.border_error}`]: error })}>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        {...(register && register(name, option))}
      />

      <IconButton
        className={styles.clear_icon}
        visible={iconVisible}
        icon='clear-field.svg'
        onClick={onClear}
      />
      <span className={styles.error}>{error && `${error.message}`}</span>
    </div>
  );
};

export default ProfileInput;
