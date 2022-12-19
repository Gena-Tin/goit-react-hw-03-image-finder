import React, { Component } from 'react';

import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    key: '31354744-e6340b12404bc1f4908fb1f36',

    page: 1,
    images: [],
  };

  async componentDidUpdate(prevState) {
   //
      console.log(prevState);
      console.log(this.state);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`
      );
      //console.log(response);
      this.setState({ images: response.data.hits });
    //}
  }

  loadMoreHandler = () => {
    this.setState(prevState => {
      return {page: ++prevState.page}
    })
  }

  formSubmitHandler = searchQuery => {
    console.log(searchQuery);
    this.setState(searchQuery);
  };

  render() {
    const { images } = this.state;
    return (
      <div className = {css.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        <Loader />
        <Button onClick={this.loadMoreHandler}/>
       
      </div>
    );
  }
}
