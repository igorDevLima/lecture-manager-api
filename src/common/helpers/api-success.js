class SuccessResponse {
  constructor(message, status, resData) {
    this.message = message;
    this.status = status;
    this.resData = resData;
  }

  send(res) {
    return res.status(this.status).json({
      message: this.message,
      data: this.resData,
    });
  }
}

class OKResponse extends SuccessResponse {
  constructor(message, resData) {
    super(message, 200, resData);
  }
}

class CreatedResponse extends SuccessResponse {
  constructor(message, resData) {
    super(message, 201, resData);
  }
}

module.exports = {
  OKResponse,
  CreatedResponse,
};
