import { setupWorker } from 'msw/browser';

import { mypageMockHandler } from './mypage/handler';

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...mypageMockHandler);

export default worker;
