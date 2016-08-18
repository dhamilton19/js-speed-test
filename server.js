const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

require('./routes')(app, path);

app.listen(8080, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://0.0.0.0:8080');
});