export class Messages {
  static readonly success = {
    userCreated: 'Usuário cadastrado com sucesso!',
  };

  static readonly error = {
    userAlreadyExists: 'Usuário já cadastrado!',
    invalidPhoneNumber: 'Número de telefone inválido!',
    internalError: 'Erro interno no servidor!',
  };

  static readonly warning = {
    userNotFound: 'Usuário não encontrado!',
    invalidCredentials: 'Usuário ou senha incorreto'
  };
}
