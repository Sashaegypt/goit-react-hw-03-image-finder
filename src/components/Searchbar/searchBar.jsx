import { Component } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';

import { Header, Form, Button, Input } from './searchBar.style'

import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
    state = {
        value: '',
    };

    handleInputChange = event => {
        this.setState({
            value: event.currentTarget.value.toLowerCase(),
        });
    };

    handleFromSubmit = event => {
        event.preventDefault();
        if (this.state.value.trim() === '') {
            return toast.error('Please, enter');
        }
        this.props.onSubmit(this.state.value.trim());
    };

    render() {
        const { value } = this.state;
        return (
            <Header>
                <Form onSubmit={this.handleFromSubmit}>
                    <Button type='submit' disabled={this.props.isSubmitting}>
                      <RxMagnifyingGlass />
                    </Button>
                    <Input
                     type="text"
                     autocomplete="off"
                     autofocus
                     placeholder="Search images and photos"
                     value={value}
                        onChange={this.handleInputChange}
                    />
                </Form>
            </Header>
        )
    }
}

Searchbar.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

