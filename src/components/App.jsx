import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/searchBar';
import { Loader } from './Loader/loader';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Button } from './Button/button';

import { GlodalStyle } from './GlobalStyle';
import { DivApp } from './App.style';

import { searchImage } from './Api';

export class App extends Component{
    state = {
        value: '',
        images: [],
        page: 1,
        isLoading: false,
        isLoadMore: false,
    };

    handleForm = event => {
        if (this.state.vaule !== event) {
            this.setState({
                value: event,
                images: [],
                page: 1,
                isLoadMore: false,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState) {
        const { value, page } = this.state;
        if (prevState.value !== value || prevState.page !== page) {
            this.fetchImages();
        }
    }

    async fetchImages() {
        const { value, page } = this.state;
        this.setState({ isLoading: true });

        try {
            const response = await searchImage(value, page);
            this.setState(prevState => ({
                images: [...prevState.images, ...response.hits],
                isLoadMore: true,
            }));
            this.responseFetch(response);
        } catch (error) {
            toast.error('Error occurred. Please reload the page');
        } finally {
            this.setState({ isLoading: false });
        }
    }

    responseFetch = ({ totalHits, hits }) => {
        const PER_PAGE = 12;
        if (this.state.page === 1 && totalHits !== 0) {
            toast.success(`Hooray!! We found ${totalHits} images`);
            this.setState({ isLoadMore: true });
        }
        if (totalHits === 0) {
            toast.warn('Sorry, there a no images. Please try again');
            this.setState({ isLoadMore: false });
        } else if (hits.length < PER_PAGE) {
            toast.info('There are all pictures. We can try else');
            this.setState({ isLoadMore: false });
        }
    };

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            isLoadMore: false,
        }));
    };

    render() {
        const { isLoading, images, isLoadMore } = this.state;
        return (
            <DivApp>
                <GlodalStyle />
                <Searchbar onSubmit={this.handleForm} isSubmitting={isLoading} />
                {images.length !== 0 && <ImageGallery items={images} />}
                {isLoading && <Loader />}
                {isLoadMore && <Button onClick={this.loadMore} />}
                <ToastContainer autoClose={2000} />
            </DivApp>
        )
    }
}