import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono()
const apiApp = new Hono()
const elementsApp = new Hono()

elementsApp.get('/*', c => {
  console.log({path: c.req.path})
  return fetch('https://stripe.dev/elements-examples')
})

apiApp.get('/test', (c) => c.json({ message: 'Hello Hono!!!' }))
app.route('/api', apiApp)
app.route('/elements-examples', elementsApp)
app.get('/*', async c => {
  return c.html(`
  <!DOCTYPE html>
  <html>
      <body>
          <h1>Hell hono on Vercel</h1>
          <p>We're in the <code>${c.req.path}</code></p>
      </body>
  </html>
  `)
})

export default handle(app)
