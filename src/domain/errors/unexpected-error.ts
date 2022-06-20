export class UnexpectedError extends Error {
  constructor () {
    super('Erro inesperado. tente novamente em alguns instantes.')
    this.name = 'UnexpectedError'
  }
}
