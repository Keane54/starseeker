import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/node'

// Looks odd but needs to be set for MSW handlers to correctly read the environment variables
process.env.API_URL = process.env.API_URL

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})