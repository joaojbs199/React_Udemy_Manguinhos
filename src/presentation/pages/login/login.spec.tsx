import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory()
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const simulateStatusField = (
  sut: RenderResult,
  field: string,
  validationError?: string): void => {
  const emailStatus = sut.getByTestId(field)
  expect(emailStatus.innerHTML).toBe(validationError || '')
}

describe('Login component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('emailError')
    expect(emailStatus.innerHTML).toBe(validationError)
    const passwordStatus = sut.getByTestId('passwordError')
    expect(passwordStatus.innerHTML).toBe(validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusField(sut, 'emailError', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusField(sut, 'emailError', validationError)
  })

  test('Should show valit email state if Validation succeed', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusField(sut, 'emailError')
  })

  test('Should show valit password state if Validation succeed', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusField(sut, 'passwordError')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show loader on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const loader = sut.getByTestId('loader')
    expect(loader).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    const loginForm = sut.getByTestId('loginForm')
    fireEvent.submit(loginForm)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authenticaation fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValue(Promise.reject(error))
    simulateValidSubmit(sut)
    await waitFor(() => {
      const mainError = sut.getByTestId('mainError')
      expect(mainError.innerHTML).toBe(error.message)
    })
    const errorWrap = sut.getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    const loginForm = sut.getByTestId('loginForm')
    await waitFor(() => loginForm)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('Should go to signup page', async () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
