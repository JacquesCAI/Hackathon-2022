import 'core-js/stable';
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../app';
import {afterAll, beforeAll} from "@jest/globals";
const bdd = require("../bin/bdd.js");
const {scoreTest} = require('./scoreCrud.test')

afterAll(async() => {
    await bdd.disconnect()
});

beforeAll(async() => {
    await bdd.connect()
});

describe('core Crud', () => {
    scoreTest(app, request)
})
