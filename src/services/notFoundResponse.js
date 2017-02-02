import { NotFound } from 'feathers-errors'

export default function notFoundResponse () {
  return Promise.reject(new NotFound('Invalid path'))
}
