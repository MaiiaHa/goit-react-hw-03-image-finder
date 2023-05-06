// import React from 'react';
import PropTypes from 'prop-types';
import css from './Container.module.css';

const Container = ({ title, children }) => {
  return (
    <section className={css.section}>
      {title && <h2 className={css.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
};

export default Container;

Container.propTypes = { title: PropTypes.string.isRequired };
