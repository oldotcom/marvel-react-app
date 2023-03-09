import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
class CharList extends Component {
    state = {
        charlist: [],
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
    }

    onCharListLoaded = (charlist) => {
        this.setState({
            charlist,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            
            return (
                <li
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name}/>
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
        const {charlist, loading} = this.state;

        const items = this.renderItems(charlist);

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? items : null;
        console.log(loading);

        return (
            <div className="char__list">
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;