import '../scss/front.scss';

import cards from '../../data/home_cards.json';
import home from '../../templates/pages/home.html'

document.addEventListener('DOMContentLoaded', function () {
    console.log(home);
    document.body.innerHTML = home({
        cards: cards
    })
});
