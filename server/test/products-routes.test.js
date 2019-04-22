const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');
const Product = require('../models/product');


chai.use(chaiHttp);



describe('Products', function() {

    before(function(done) {
        Product
            .deleteMany()
            .then(data => {
                done();
            })

    })


    describe('Create', function() {
        it('should return status 201 and object created product', function(done) {
            chai
                .request(app)
                .post('/products')
                .attach("image", readFileSync("file.test"), "file.test")
                .field("name", "test")
                .field("price", 1000000)
                .field("amount", 100)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(201);
                    res.body.should.have.property('name');
                    res.body.name.should.a('string')
                    res.body.should.have.property('price');
                    res.body.price.should.a('number');
                    res.body.should.have.property('amount');
                    res.body.price.should.a('string');
                    res.body.should.have.property('image');
                    res.body.price.should.a('string');
                    done()
                })
        })

        it('should return object with property that have value "harga harus dalam  angka" if price input is not number', function(done) {
            chai
                .request(app)
                .post('/products')
                .attach("image", readFileSync("file.test"), "file.test")
                .field("name", "test")
                .field("price", `1000000`)
                .field("amount", 100)
                .send({
                    name: 'test',
                    price: 1000000,
                    amount: 3
                })
                .end((err, res) => {

                    res.should.have.status(400);
                    res.body.should.equal(`Product validation failed: price: Cast to Number failed for value "testint388729ehb" at path "price"`);
                    done()
                })
        })
    })

    describe('Find', function() {
        it('should return status 200 and array of object all products', function(done) {
            chai
                .request(app)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.an('array');
                    done()
                })
        })
    })

    describe('Delete', function() {
        it('should return status 200 and deletd object data', function(done) {

            let id;
            chai
                .request(app)
                .delete(`'/products/${id}`)
                .end((err, res) => {
                    console.log(err, res);
                    res.should.have.status(200);
                    res.body.should.an('object')
                    res.body.should.have.property('name');
                    res.body.name.should.a('string')
                    res.body.should.have.property('price');
                    res.body.should.a('number');
                    done()
                })
        })
    })
})

describe('Users', function() {

    describe('Login', function() {
        it('should return status 201 and token', function(done) {
            chai
                .request(app)
                .post('/login')
                .send({
                    email: '',
                    password: ''
                })
                .end((err, res) => {
                    res.body.should.an('object');
                    res.body.should.have.property('token');
                    done()
                })
        })

        it(`should return status 403 and object err that have message 'Email tidak ditemukan'`, function(done) {
            chai
                .request(app)
                .post('/login')
                .send({
                    email: '',
                    password: ''
                })
                .end((err, res) => {
                    console.log()
                    res.should.have.status(403);
                    err.body.should.an('object');
                    err.body.should.have.property('message');
                    err.body.message.should.equal('Email tidak ditemukan');
                    done()
                })
        })
    })
})

describe('Charts', function() {

    describe('Create', function() {
        it('should return status 201 and object created charts', function(done) {
            let token;

            chai
                .request(app)
                .post('/charts')
                .set({ token })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.an('object');
                    res.body.should.have.property('userId');
                    res.body.should.have.property('cretedAt');
                    done()

                })

        })

        it(`should return status 403 and err object that have message 'User tak terauthentikasi'`, function(done) {
            let token;

            chai
                .request(app)
                .post('/charts')
                .set({ token })
                .end((err, res) => {
                    res.status.should.have.status(403);
                    res.status.body.should.an('object');
                    done()
                })
        })
    })
})