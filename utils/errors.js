const { errorCode } = require("./message");

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

class qwqwqw extends Error {
    constructor(message) {
        super(message);
        this.name = 'qwqwqw';
        this.status = 200;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}

class UnprocessableEntity extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableEntity';
        this.status = 422;
    }
}

const handleCustomError =(res, error) => {
    if (
        error instanceof NotFoundError || 
        error instanceof UnauthorizedError || 
        error instanceof UnprocessableEntity
        ) {
        return res.status(error.status).send({
            message: error.message,
            statusCode: errorCode
        });
    } else {
        return res.status(500).send({
            message: error.message,
            statusCode: errorCode
        });
    }
}

module.exports = {
    NotFoundError,
    UnauthorizedError,
    UnprocessableEntity,
    handleCustomError
};