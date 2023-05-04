import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../../assets/notFoundImg.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt={t('notFound.pageNotFound')}
        className="img-fluid h-25"
        src={notFoundImg}
      />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFound.text')}
        {' '}
        <a href="/">{t('notFound.toMain')}</a>
      </p>
    </div>
  );
};

export default NotFound;
