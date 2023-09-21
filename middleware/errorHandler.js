const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "VALIDATION ERROR",
                statusCode: statusCode,
                messgae: err.message,
                stack: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                statusCode: statusCode,
                messgae: err.message,
                stack: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "SERVER ERROR",
                statusCode: statusCode,
                messgae: err.message,
                stack: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                statusCode: statusCode,
                messgae: err.message,
                stack: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                statusCode: statusCode,
                messgae: err.message,
                stack: err.stack,
            });
            break;

        default:
            // res.json({
            //     statusCode: statusCode,
            //     messgae: err.message,
            //     stack: err.stack,
            // });
            console.log("No error");
            break;
    }

    // res.json({
    //     messgae: err.message,
    //     statusCode: statusCode,
    //     stack: err.stack,
    // });
};

module.exports = errorHandler;
