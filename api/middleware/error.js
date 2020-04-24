module.exports = (err, req, res, next) => {
    res.status(500).json({
        error: err,
        errorMessage: 'There was an error in the server'
    });
}