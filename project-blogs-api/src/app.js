const express = require('express');
require('express-async-errors');

const errorMiddleware = require('./middlewares/error.middleware');
const { loginRouter, userRouter, postRouter, categoryRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/categories', categoryRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
