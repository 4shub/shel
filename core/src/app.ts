import express from 'express';
import session from 'express-session';
import lusca from 'lusca';
import bodyParser from 'body-parser';

import router from './api';

const app = express();

app.use(session({
    secret: 'abc',
    resave: true,
    saveUninitialized: true
}));

// app.use(lusca.csrf());
// app.use(lusca.csp({ data: 'hello' }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.p3p('ABCDEF'));
app.use(lusca.hsts({ maxAge: 31536000 }));
app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());
app.use(lusca.referrerPolicy('same-origin'));

app.use(bodyParser.json());

router(app);

export default app;
