import * as request from 'supertest';
import 'dotenv/config';

const port = process.env.PORT || 6000;

const host = `${process.env.DB_HOST}:${port}`;
const _request = request(host);

export default _request;
