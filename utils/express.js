const express = require('express');
const cors = require('cors');
const config = require('./config');
module.exports = (app) => {
    if (process.env.NODE_ENV !== 'local') {
    }
    app.use(cors({
        origin:[
            'http://localhost:3000'
        ]
    }));
    app.use(express.json({ limit: '500mb' }));
    app.use(express.urlencoded({ limit: '500mb', extended: true }));
    // app.use(express.static('./public'));
    app.all('/', (req, res, next) => {
        // CORS headers
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        // Setting custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,Client-Key');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
    // simple route
    app.get('/', (req, res) => {
        res.json({message: `Welcome to ${config.APP_NAME} Api`});
    });
    
    app.use('/api',require('../routes'))
    
    return app;
};