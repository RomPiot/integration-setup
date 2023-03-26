import * as dotenv from "dotenv";
import path from "path";
import {App} from "./classes/App.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

export const projectRoot = path.resolve(__dirname, '..') + '/';
export const appRoot = path.resolve(__dirname) + '/';
export const templateExtension = '.' + process.env.TEMPLATE_EXTENSION || '.html.twig';
export const templatePath = process.env.TEMPLATE_PATH || 'templates';
export const dataPath = process.env.DATA_PATH || 'data';
export const publicPath = process.env.PUBLIC_PATH || 'public';
export const serverProtocol = 'http://';
export const serverHost = process.env.SERVER_HOST || 'localhost';
export const serverPort = process.env.SERVER_PORT || 3001;
export const serverUrl = serverProtocol + serverHost + ':' + serverPort + '/';
export const homePage = process.env.HOME_PAGE || 'home';
export const app = new App();
