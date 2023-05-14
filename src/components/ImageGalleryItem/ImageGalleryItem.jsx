import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { id, tags, webformatURL, largeImageURL } = this.props;
    // console.dir(this.props);
    // console.log(this.props.tags);
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {showModal && <Modal src={largeImageURL} onClose={this.toggleModal} />}
      </li>
    );
  }
}
//ALT = TAGS INCL IN PROPS
ImageGalleryItem.propTypes = {
  // tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
