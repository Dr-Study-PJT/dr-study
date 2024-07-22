import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';

import { mypageMockHandler } from './mypage/handler';

const app = express();
const port = 9090; // 서버 포트

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());

const mockHandlers = [...mypageMockHandler];

app.use(createMiddleware(...mockHandlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
