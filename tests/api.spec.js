const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://restful-booker.herokuapp.com';

let bookingId;
let authToken;

test.beforeAll(async ({ request }) => {
    const authResponse = await request.post(`${BASE_URL}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    expect(authResponse.ok()).toBeTruthy();
    const authBody = await authResponse.json();
    authToken = authBody.token;
    console.log('Auth token:', authToken);
});

test('Создание бронирования (Create - POST) @api', async ({ request }) => {
    const bookingData = {
        "firstname": "Nikita",
        "lastname": "Adamon",
        "totalprice": 400,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-02-01"
        }
    };

    const response = await request.post(`${BASE_URL}/booking`, {
        data: bookingData,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('POSTstatus:', response.status());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.booking).toMatchObject(bookingData);
    expect(responseBody.bookingid).toBeDefined();

    bookingId = responseBody.bookingid;
    console.log('Id:', bookingId);
});

test('Получение информации о бронировании (Read - GET) @api', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    console.log('GETstatus:', response.status());

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.firstname).toBe('Nikita');
    expect(responseBody.lastname).toBe('Adamon');
    expect(responseBody.totalprice).toBe(400);
});

test('Обновление бронирования (Update - PUT) @api', async ({ request }) => {
    const updateData = {
        "firstname": "Nikita",
        "lastname": "Adamonis",//changed this one
        "totalprice": 400,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-02-01"
        }
    };

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        data: updateData,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }
    });

    console.log('POST update status:', response.status());
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.lastname).toBe('Adamonis');
});

test('Удаление бронирования (Delete - DELETE) @api', async ({ request }) => {
    
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }
    });

    console.log('delete status:', response.status());
    expect(response.status()).toBe(201);
});

test('Попробуйте после удаления отправить GET запрос на тот же id @api', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    console.log('GET deleted status:', response.status());

    expect(response.status()).toBe(404);
});