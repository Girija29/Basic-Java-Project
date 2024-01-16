function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Connect-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
}
  
module.exports.buildResponse = buildResponse;