import '../scss/front.scss';

import home_page_data from '../../data/home_page.json'
import home_page from '../../templates/home.html'

document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML = home_page({
        page: home_page_data
    })
});

