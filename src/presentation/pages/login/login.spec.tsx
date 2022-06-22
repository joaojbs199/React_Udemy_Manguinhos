import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  test('Should not render login loader and error message on first load', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
