import { FaSpinner } from 'react-icons/fa';
import styles from './spinner.module.scss';
import clsx from 'clsx';
import { CSSProperties } from 'react';

type SpinnerProps = {
  isActive: boolean;
  children?: JSX.Element;
  variant?: 'small' | 'primary' | 'secondary';
  style?: CSSProperties;
}

const Spinner = ({ children, style, variant = 'primary', isActive = false }: SpinnerProps) => (
  isActive
    ?
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: variant === 'primary' ? '100vh' : '100%',
      width: '100%',
      ...style
    }}
    >
      <FaSpinner role="presentation" className={clsx(styles.spinner, styles[variant])}/>
    </div>
    : children || null
);

export default Spinner;
