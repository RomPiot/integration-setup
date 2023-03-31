import {homePage, serverUrl} from '../constants.js';
import {Route} from '../classes/Route.js';

export const mainNavigation = () => {
    let navMenuRoutes = [];
    let pageMenus = ['home', 'test'];

    pageMenus.forEach(pageMenu => {
        const pageUrl = pageMenu === homePage ? '' : pageMenu;
        const route = new Route(pageMenu, serverUrl + pageUrl);
        navMenuRoutes.push(route);
    });
    return navMenuRoutes;
};
