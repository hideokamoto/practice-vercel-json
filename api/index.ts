import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono()
const elementsApp = new Hono()

elementsApp.get('/*', c => {
  const path = c.req.path.replace(/^\/elements-examples/, '')
  return fetch(`https://stripe.dev/elements-examples${path}`)
})

app.route('/elements-examples', elementsApp)

export default handle(app)
