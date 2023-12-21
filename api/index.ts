import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))
app.get('/test/*', async c => {
  const path = c.req.path
  console.log({path})
  const data = await fetch(`https://github.com/hideokamoto/practice-vercel-json${path}`)
  return data
})

export default handle(app)
