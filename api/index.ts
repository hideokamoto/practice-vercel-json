import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono()//.basePath('/api')

app.get('/test', (c) => c.json({ message: 'Hello Hono!!!' }))
app.get('/api/test', (c) => c.json({ message: 'Hello Hono!' }))
app.get('/*', async c => {
  return c.html(`
  <!DOCTYPE html>
  <html>
      <body>
          <h1>Hell hono on Vercel</h1>
          <pre><code>${JSON.stringify(c.req.header())}</code></pre>
      </body>
  </html>
  `)
})

export default handle(app)
