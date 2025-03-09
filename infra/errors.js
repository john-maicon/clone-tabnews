export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super('Um erro interno não esperado aconteceu', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Entre en contato com o suporte';
    this.statusCode = statusCode || 500;
  }

  // para deixar as props como enumeraveis.
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || 'Serviço indisponível no momento', {
      cause,
    });
    this.name = 'ServiceError';
    this.action = 'Verifique se o serviço está disponível';
    this.statusCode = 503;
  }

  // para deixar as props como enumeraveis.
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super('Método não permitido para este endpoint');
    this.name = 'MethodNotAllowedError';
    this.action =
      'Verifique se método HTTP enviado é válido para este endpoint';
    this.statusCode = 405;
  }

  // para deixar as props como enumeraveis.
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
