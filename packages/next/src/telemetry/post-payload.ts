import retry from 'next/dist/compiled/async-retry'
import fetch from 'next/dist/compiled/node-fetch'

export function _postPayload(endpoint: string, body: object, signal?: any) {
  return (
    retry(
      () =>
        fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'content-type': 'application/json' },
          timeout: 5000,
          signal,
        }).then((res) => {
          if (!res.ok) {
            const err = new Error(res.statusText)
            ;(err as any).response = res
            throw err
          }
        }),
      { minTimeout: 500, retries: 1, factor: 1 }
    )
      .catch(() => {
        // We swallow errors when telemetry cannot be sent
      })
      // Ensure promise is voided
      .then(
        () => {},
        () => {}
      )
  )
}
