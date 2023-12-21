import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono()//.basePath('/api')

app.get('/test', (c) => c.json({ message: 'Hello Hono!!!' }))
app.get('/api/test', (c) => c.json({ message: 'Hello Hono!' }))
app.get('/*', async c => {
  const path = c.req.path.replace(/^\/api/, '')
  console.log({path,d: `https://github.com/hideokamoto/practice-vercel-json${path}`})
  const data = await fetch(`https://github.com/hideokamoto/practice-vercel-json${path}`)
  return data
})

export default handle(app)
