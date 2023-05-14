import React, { Component } from 'react';
import Notiflix from 'notiflix'; // all modules
import { fetchInput } from '../../api/Api';
import css from './App.module.css';
import { ImSpinner } from 'react-icons/im';

import Button from '../Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
// import { ToastContainer } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    status: Status.IDLE,
    currentPage: 1,
    value: '',
    pictures: [],
    error: null,
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, currentPage } = this.state; // pictures dim
    //визивається після кожного оновлення тут все через if щоб не зациклити запит
    // console.log('did update componentDidUpdate');

    const prevInput = prevState.value;
    const nextInput = this.state.value;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevInput !== nextInput || prevPage !== nextPage) {
      // console.log('update contacts');
      this.setState({ status: Status.PENDING });
      //loading: true,  pictures: null

      try {
        const { hits, totalHits } = await fetchInput(value, currentPage);

        this.setState(state => ({
          pictures: [...state.pictures, ...hits],
          status: Status.RESOLVED,
          error: null,
          totalHits,
        }));
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
        Notiflix.Notify.failure(error.message);
      }
    }
  }

  onFormSubmit = value => {
    // записуємо інпут в стейт APP з Searchbar formSubmit
    if (this.state.value !== value) {
      this.setState({ value, pictures: [], currentPage: 1 });
    }
  };

  renderMorePic = () => {
    this.setState(prevState => {
      console.log(prevState);
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    const { error, status, pictures, totalHits } = this.state; // showModal,

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {status === Status.IDLE && <div>Please enter your search request</div>}
        {status === Status.PENDING && (
          <div className={css.spinner}>
            {/* <ImSpinner size={32} className="iconSpin" />  */}
            {/* Loading... */}
            <Loader />
          </div>
        )}
        {status === Status.REJECTED && <div>{error.message}</div>}
        <ImageGallery photos={this.state.pictures} />
        {status === Status.RESOLVED &&
          pictures.length !== totalHits &&
          pictures.length !== 0 && (
            <Button aria-label="Load more" onClick={this.renderMorePic} />
          )}
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}
