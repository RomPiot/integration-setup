# Integration Setup

A simple boilerplate to create a new website integration.

When the server is started, it automatically builds the JS and CSS files whenever the asset files change, and
automatically reloads the site in the browser when a file is modified and saved.

In this example project, the chosen template file extension is ".html.twig" (to be easily integrated in a Symfony
project). But you are free to choose the desired file extension (html, njk, etc)

In the "templates" folder, the loaded pages are the files at the root of this folder.

To provide data that can be used as variables in the template files, create a new json file in the "data" folder, named
exactly the same as the template file.
For example, in this project, we have 2 pages ("home.html.twig" and "test.html.twig"). In data, we have 2 json files
named
"home.json" and "test.json".

## Requirements

Tip: use nvm for better flexibility of node version

- NodeJS
- NPM (or Yarn)

## Installation

You can replace "yarn" with "npm" if you wish. I chose Yarn, simply by personal preference

```
yarn install
```

## Configuration

To override the configuration, copy and paste the .env.example file and rename it to .env, and edit the values.

## Start the server

```
yarn start
```

By default, without custom configuration, go to: `http://localhost:3001`



