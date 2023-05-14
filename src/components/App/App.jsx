import React, { Component } from 'react';
import Button from '../Button/Button';
// import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
// import { ToastContainer } from 'react-toastify';
import { fetchInput } from '../../api/Api';
// import Notiflix from 'notiflix'; // all modules
import { ImSpinner } from 'react-icons/im';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { Loader } from 'components/Loader/Loader';
// import { nanoid } from 'nanoid';

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
    // showModal: false,
    // loading: false,
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, currentPage } = this.state; // pictures dim
    //визивається після кожного оновлення тут все через if щоб не зациклити запит
    // console.log('did update componentDidUpdate');

    const prevInput = prevState.value;
    const nextInput = this.state.value;

    if (prevInput !== nextInput) {
      console.log('update contacts');
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

    //   fetch(
    //     `${URL}/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
    //   `
    //   )
    //     .then(res => {
    //       if (res.ok) {
    //         return res.json();
    //       }
    //       return Promise.reject(new Error(`We have not ${nextInput}`));
    //     })
    //     .then(({ hits }) => this.setState({ hits, status: 'resolved' }))
    //     .catch(error => this.setState({ error, status: 'rejected' }));
    //   // .finally(() => {
    //   //   this.setState({ loading: false });
    //   // });

    //   // localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    // }
    // console.log(prevState); //попередній
    // console.log(this.state); //фактичний, оновлений
    // this.setState() не варто визивати, зациклить рендер, сетстейт, дідапдейт
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
    const { error, status } = this.state; // showModal,

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {status === Status.IDLE && <div>Please enter your search request</div>}
        {status === Status.PENDING && (
          <div>
            <ImSpinner size={32} className="iconSpin" />
            Loading...
            <Loader />
          </div>
        )}
        {status === Status.REJECTED && <div>{error.message}</div>}
        {/* {this.state.pictures && (
          <div>Here will be pics{this.state.hits.webformatURL}</div>
        )} */}
        <ImageGallery photos={this.state.pictures} />
        {status === Status.RESOLVED &&
          this.state.pictures.length !== this.state.totalHits &&
          this.state.pictures.length !== 0 && (
            // <Button onLoadMore={this.renderMorePic} aria-label="Load more" />
            <Button aria-label="Load more" onClick={this.renderMorePic} />
          )}

        {/* ------------------ modal ------------------ */}
        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button> */}
        {/* {showModal && (
          <Modal onClose={this.toggleModal}>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloremque, nihil!
            </p>
            <button type="button" onClick={this.toggleModal}>
              close modal
            </button>
          </Modal>
        )} */}
        {/* ------------------ modal ------------------ */}
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}
