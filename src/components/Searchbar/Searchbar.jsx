import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import Notiflix from 'notiflix'; // all modules

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  formChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
    //.trim()
  };

  formSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return Notiflix.Notify.info('Please enter your search');
      // return toast('Enter your search');
    }
    this.props.onSubmit(this.state.value);
    // в консоль при кліку на сабміт при тому, коли в App.User CL(data):
    // console.log(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.formSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FaSistrix fill="blue" width={40} height={40} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.formChange}
            name="search"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
