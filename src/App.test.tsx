import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('render', () => {
  it('renders the app', () => {
    render(<App />)
    expect(true).toBe(true)
  })
})
