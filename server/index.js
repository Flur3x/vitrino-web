const config = require('./config.js');
const nuxtConfig = require('../nuxt.config.js');
const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const stagingAuth = require('./middleware/stagingAuth.js');

const isDev = (process.env.NODE_ENV === 'development');

process.env.DEBUG = 'nuxt:*';
nuxtConfig.dev = isDev;

const app = express();
const nuxt = new Nuxt(nuxtConfig);

app.set('port', config.port);

app.use(stagingAuth);
app.use(nuxt.render);

if (isDev) {
    new Builder(nuxt).build()
        .then(listen)
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
} else {
    listen();
}

function listen () {
    app.listen(app.get('port'), () => console.log('\n Server started on port', app.get('port')));
}

module.exports = app;
