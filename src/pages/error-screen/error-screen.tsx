import { Link, useNavigate } from 'react-router-dom';
import styles from './error-screen.module.scss';
import { FaSadTear } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../consts/enums';

type ErrorScreenProps = {
  variant: '404' | 'error';
}

const errorData = {
  title: 'Ошибка загрузки данных',
  text: 'Попробывать снова',
};

const notFoundData = {
  title: 'Страница не найдена',
  text: 'Вернуться на главную',
};

function ErrorScreen({ variant }: ErrorScreenProps) {
  const navigate = useNavigate();
  const data = variant === 'error' ? errorData : notFoundData;

  return (
    <main className={styles.container}>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <FaSadTear className={styles.sadFace}/>
      <h1>{data.title}</h1>
      {variant === 'error' && <button onClick={() => navigate(0)} className={styles.button}>{data.text}</button>}
      {variant === '404' && <Link className={styles.link} to={AppRoute.Root}>{data.text}</Link>}
    </main>
  );
}

export default ErrorScreen;
