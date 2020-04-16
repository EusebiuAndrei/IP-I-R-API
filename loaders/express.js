const express = require('express');
const cors = require('cors');
const { isCelebrate } = require('celebrate');

const apiRouter = require('../api');
const config = require('../config');
const { responseBuilder } = require('../util/responseUtil');

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

    app.use(config.api.prefix, apiRouter);

    // next is required for express middleware, even if unused
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        if (isCelebrate(err)) {
            return res.status(400).json(
                responseBuilder(false, {
                    message: err.joi.message,
                    meta: err.meta,
                }),
            );
        }
        return res.status(500).json(
            responseBuilder(false, {
                message: err.message,
            }),
        );
    });
};
