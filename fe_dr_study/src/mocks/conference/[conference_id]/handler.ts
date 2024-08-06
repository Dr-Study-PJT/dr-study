import { http, HttpResponse, StrictResponse } from 'msw';

export const mypageMockHandler = [
    http.post('/v1/conferences', (req) => {
        return HttpResponse.json({
            success: true,
            message: 'Request intercepted successfully!',
            data: {
                id: '1',
                title: 'Mock Conference',
            },
        });
    }),
];
