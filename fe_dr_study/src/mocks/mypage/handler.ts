import { http, HttpResponse, StrictResponse } from 'msw';
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
  http.post('/api/login', () => {
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
];
