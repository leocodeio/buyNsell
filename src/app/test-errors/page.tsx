'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HttpError } from '@/lib/errors'

export default function TestErrorsPage() {
  const [errorType, setErrorType] = useState<string | null>(null)

  if (errorType) {
    switch (errorType) {
      case '401':
        throw new HttpError('Unauthorized access', 401)
      case '403':
        throw new HttpError('Forbidden access', 403)
      case '404':
        throw new HttpError('Not found', 404)
      case '500':
        throw new HttpError('Internal server error', 500)
      case '503':
        throw new HttpError('Service unavailable', 503)
      default:
        throw new Error('Unknown error')
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Test Error Handling</h1>
      <p className="mb-4">Click the buttons below to trigger different error types during render:</p>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => setErrorType('401')} variant="outline">
          Throw 401 Unauthorized
        </Button>
        <Button onClick={() => setErrorType('403')} variant="outline">
          Throw 403 Forbidden
        </Button>
        <Button onClick={() => setErrorType('404')} variant="outline">
          Throw 404 Not Found
        </Button>
        <Button onClick={() => setErrorType('500')} variant="outline">
          Throw 500 Internal Error
        </Button>
        <Button onClick={() => setErrorType('503')} variant="outline">
          Throw 503 Service Unavailable
        </Button>
        <Button onClick={() => setErrorType('unknown')} variant="outline">
          Throw Unknown Error
        </Button>
      </div>
      <div className="mt-6">
        <Button onClick={() => setErrorType(null)} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  )
}