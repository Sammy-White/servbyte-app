const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const Customer = require('../src/models/customer')

const customerOneId = new mongoose.Types.ObjectId()

const customerOne = {
    _id:customerOneId,
    name:'Ugwu Samson',
    email:'samson@example.com',  
    password:'123What!!!',
    tokens:[{
        token: jwt.sign({ _id: customerOneId }, process.env.JWT_SECRET_KEY)
    }]
}

beforeEach( async () => {
    await Customer.deleteMany()
    await new Customer(customerOne).save()
})

test('Should sign up a new customer', async () => {
    await request(app).post('/create/customer').send({
        name: 'Ugwu Ekene',
        email: 'me@example.com',
        password: '1234567'
    }).expect(201)
})  

test('Should login existing customer', async () => {
    await request(app).post('/customer/login').send({
        email:customerOne.email,
        password:customerOne.password      
    }).expect(200)
})

test('Should not login notexisting customer', async () => {
    await request(app).post('/customer/login').send({
        email:'sam@example.com',
        password:'123455677'
    }).expect(400)
})

test('Should get customer profile', async () => {
    await request(app)
        .get('/customer/me')
        .set('Authorization', `Bearer ${customerOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get unauthenticated customer', async () => {
    await request(app).get('/customer/me').send().expect(401)
})