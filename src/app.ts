import express from 'express'
import routes from './routes';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', routes.user)

export default app