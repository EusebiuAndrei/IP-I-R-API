const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    /**
     * Health-check endpoints.
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(cors());
    app.use(express.json());
};
