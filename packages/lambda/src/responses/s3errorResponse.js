const s3errorResponse = async (error) => {

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: `Unable to store experience on S3. error: ${error}`,
      input: event,
    })
  };
};

export default s3errorResponse;