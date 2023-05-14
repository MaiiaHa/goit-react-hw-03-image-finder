// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos }) => {
  // console.log(photos); // (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {

  return (
    <ul className={css.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {photos.map(({ id, ...otherData }) => {
        return <ImageGalleryItem key={id} {...otherData} />;
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
};

