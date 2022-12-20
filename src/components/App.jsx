import React, { Component } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './Services/apiPixaby';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    totalHits: 0,
    isLoading: false,
    loadMore: false,
    showModal: false,
    notFound: false,
    targetImage: null,
    error: null,
  };

  searchImages() {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(searchQuery, page)
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ loadMore: false });
        } else {
          this.setState({ loadMore: true });
        }
        if (page === 1) {
          this.setState({
            totalHits: data.totalHits,
            images: data.hits,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        isLoading: true,
        page: 1,
        images: [],
      });
      this.searchImages();
    }
    if (prevState.page !== this.state.page) {
      this.searchImages();
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  formSubmitHandler = searchQuery => {
    this.setState(searchQuery);
  };

  toggleModal = ({ status, src, alt }) => {
    if (status) {
      this.setState({
        targetImage: { src, alt },
        showModal: true,
      });
    } else {
      this.setState({
        targetImage: null,
        showModal: false,
      });
    }
  };

  render() {
    const { images, targetImage, showModal, isLoading, loadMore } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {images.length > 0 && (
          <ImageGallery toggleModal={this.toggleModal}>
            <ImageGalleryItem images={images} />
          </ImageGallery>
        )}
        {showModal && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )}
        {isLoading && <Loader />}
        {loadMore && (
          <Button onClick={this.loadMoreHandler} massage={'Load more'} />
        )}
      </div>
    );
  }
}
