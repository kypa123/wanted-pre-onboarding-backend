function errorHandler(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json(
        `에러가 발생했습니다. 코드 : ${err.status}`,
    );
}

export default errorHandler;
