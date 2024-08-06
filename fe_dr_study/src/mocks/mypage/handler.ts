import { http, HttpResponse, StrictResponse } from 'msw';
import { title } from 'process';
// import {faker} from "@faker-js/faker";

// function generateDate() {
//   const lastWeek = new Date(Date.now());
//   lastWeek.setDate(lastWeek.getDate() - 7);
//   return faker.date.between({
//     from: lastWeek,
//     to: Date.now(),
//   });
// }
const User = [{ id: 'elonmusk', nickname: 'Elon Musk', image: '' }];

export const mypageMockHandler = [
    http.post('/v1/auth/login', () => {
        console.log('로그인');
        return HttpResponse.json(User[1], {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
            },
        });
    }),
    http.post('/api/logout', () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
            },
        });
    }),

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
