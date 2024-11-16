import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('render', () => {
  it('renders the app', () => {
    render(<App />)
    expect(true).toBe(true)
  })
})
