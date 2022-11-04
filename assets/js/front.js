import '../scss/front.scss';

import cards from '../../data/home_cards.json';
import home from '../../templates/home.html'

document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML = home({
        cards: cards
    })
});
