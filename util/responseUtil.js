const responseBuilder = function (success, payload) {
    const response = { success };
    if (success) {
        response.data = payload;
    } else {
        response.error = payload;
    }
    return response;
};

module.exports = {
    responseBuilder,
};
