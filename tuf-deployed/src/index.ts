import { Hono } from 'hono'
import { getAllSubmissions }from '../../backend/src/Functions/submissionFunction'

const app = new Hono()

app.get('/api/submissions',async (c) => {
  const data = await getAllSubmissions();
  return c.json({data: "data"});
})

export default app
