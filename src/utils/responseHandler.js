/**
 * construct response object
 *
 * @param {number} statusCode - response status code
 * @param {string} message - response message
 * @param {any} data - response data
 * @returns {Object} response data with status code, message
 */

const responseHandler = (statusCode, message, data) => {
  return {
    statusCode,
    status: 'success',
    message,
    ...(data && { data }),
  };
};

export default responseHandler;
