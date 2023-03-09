import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
class CharList extends Component {
    state = {
        charlist: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
    }

    onCharListLoaded = (charlist) => {
        this.setState({charlist})
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
        const {charlist} = this.state;
        const items = this.renderItems(charlist)

        return (
            <div className="char__list">
                {items}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;