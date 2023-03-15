import { Component } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
class CharList extends Component {
    state = {
        charlist: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharlist) => {
        let ended = false;
        if (newCharlist.length < 9) {
            ended = true;
        }

        this.setState(({offset, charlist}) => ({
                charlist: [...charlist, ...newCharlist],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
        }))
    }

    onError = () => {
        this.state({
            loading: false,
            error: true
        })
    }

    itemRefs = [];

    setRef = ref => {
        this.itemRefs.push(ref);
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={this.setRef}
                    onClick={() => this.props.onCharSelected(item.id)}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.props.onCharSelected(item.id)
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charlist, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charlist);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;