import { Button, Frog, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'

import { backgroundStyles } from './styles'

export const app = new Frog()

app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{ ...backgroundStyles }}>
        <span>Start</span>
      </div>
    ),
    intents: [
      <Button.Transaction target={`/transaction`} action="/end">
        Send 0.00001 ETH
      </Button.Transaction>,
    ],
  })
})

app.frame('/end', (c) => {
  return c.res({
    image: (
      <div style={{ ...backgroundStyles }}>
        <span>End</span>
      </div>
    ),
  })
})

app.transaction('/transaction', (c) => {
  return c.send({
    chainId: 'eip155:8453',
    value: parseEther('0.00001'),
    to: '0x179A862703a4adfb29896552DF9e307980D19285',
  })
})

devtools(app, { serveStatic })

export default app
