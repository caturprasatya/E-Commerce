const request = require('supertest')
const app = require('../app')
const generateToken = require('../helpers/generateToken')
const destroy = require('../helpers/destroy-product')


// * variabel global
let user = {id : 4, email : 'satya@mail.com', password : "123456"}

describe('Testing /products', function() {
    let body = {
        name : 'Sepatu Payung',
        image_url : 'https://id-test-11.slatic.net/p/70f71fafacf9dfcc4f60d25e3be3c994.jpg_720x720q80.jpg_.webp',
        category: 'shoes',
        price : 100000,
        stock : 2
    }

    let id
    
    let access_token
    
    beforeAll(function() {
        access_token = generateToken(user)
    })

    afterAll(function(){
        destroy()
    })

    //* ============================= POST PRODUCT ================================//

    describe('Testing POST /products', function() {

        it('Should return response with status code 201', function(done) {

            request(app)
                .post('/products')
                .send(body)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(201)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body).toHaveProperty("id")
                        expect(res.body).toHaveProperty("name")
                        expect(res.body).toHaveProperty("image_url")
                        expect(res.body).toHaveProperty("category")
                        expect(res.body).toHaveProperty("price")
                        expect(res.body).toHaveProperty("stock")
                        id = res.body.id

                        done()
                    }
                })
        })

        it('Should return response with status code 401', function(done) {
            let token = generateToken({id : 100, email : 'wibawa@mail.com'})

            request(app)
                .post('/products')
                .send(body)
                .set('access_token', token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(401)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.message).toEqual('Unauthorized')
                        done()
                    }
                })
        })

        it('Should return response with status code 400', function(done) {
            let badReqBody = {
                name : '',
                image_url : '',
                price : '',
                stock : ''}

            request(app)
                .post('/products')
                .send(badReqBody)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(400)
                        expect(Array.isArray(res.body)).toEqual(true)
                        expect(res.body).toEqual(expect.arrayContaining(['Name product cannot empty',
                        'Image product must be available',
                        'Price product cannot empty',
                        'Stock product cannot empty' ]))
                        done()
                    }
                })
        })

        it('Should return response with status code 400', function(done) {
            let {name, image_url, price, stock} = body
            let badReqBody = {
                name,
                image_url,
                price : -1,
                stock : -2}

            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send(badReqBody)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body).toEqual(expect.arrayContaining(['Price product must be more than 1',
                        'Stock product must be more than 1']))
                        done()
                    }
                })
        })

        it('Should return response with status code 500', function(done) {
            let {name, image_url, price, stock} = body
            let badReqBody = {
                name,
                image_url,
                price ,
                stock : 'Invinity'}

            request(app)
                .post('/products')
                .send(badReqBody)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(500)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body.message).toEqual('Internal Server Error')
                
                        done()
                    }
                })
        })
    })


    //* ============================= GET PRODUCT ================================//

    describe('Testing GET /products', function() {

        it('Should return response with status code 200', function(done) {

            request(app)
                .get('/products')
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(200)
                        expect(Array.isArray(res.body)).toEqual(true)
                        expect(res.body[0]).toHaveProperty("id")
                        expect(res.body[0]).toHaveProperty("name")
                        expect(res.body[0]).toHaveProperty("image_url")
                        expect(res.body[0]).toHaveProperty("category")
                        expect(res.body[0]).toHaveProperty("price")
                        expect(res.body[0]).toHaveProperty("stock")

                        done()
                    }
                })
        })

        it('Should return response with status code 401', function(done) {
            let token = generateToken({id : 100, email : 'wibawa@mail.com'})

            request(app)
                .get('/products')
                .set('access_token', token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(401)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.message).toEqual('Unauthorized')
                        done()
                    }
                })
        })
    })
    

    //* ============================= PUT PRODUCT ================================//

    describe('Testing PUT /products/:id', function() {
        it('Should return reponse with status code 200', function(done) {
            let {name, image_url, price, stock} = body
            let changeBody = {
                name,
                image_url,
                price,
                stock : 4}

            request(app)
                .put(`/products/${id}`)
                .send(changeBody)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        console.log(res.body);
                        expect(res.statusCode).toEqual(200)
                        expect(Array.isArray(res.body)).toEqual(true)
                        done()
                    }
                })
        })

        it('Should return reponse with status code 401', function(done) {
            let token = generateToken({id : 100, email : 'wibawa@mail.com'})

            let {name, image_url, price, stock} = body
            let changeBody = {
                name,
                image_url,
                price,
                stock : 2}

            request(app)
                .put(`/products/${id}`)
                .send(changeBody)
                .set('access_token', token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(401)
                        expect(typeof res.body).toEqual("object")
                        expect(res.body.message).toEqual('Unauthorized')
                        done()
                    }
                })
        })

        it('Should return reponse with status code 400', function(done) {
            let {name, image_url, price, stock} = body
            let changeBody = {
                name,
                image_url,
                price : -3,
                stock : -1}

            request(app)
                .put(`/products/${id}`)
                .send(changeBody)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body).toEqual(expect.arrayContaining(['Price product must be more than 1',
                        'Stock product must be more than 1']))
                        done()
                    }
                })
        })

        it('Should return response with status code 500', function(done) {
            let {name, image_url ,price, stock} = body
            let badReqBody = {
                name,
                image_url,
                price ,
                stock : 'Invinity'}

            request(app)
                .post('/products')
                .send(badReqBody)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(500)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body.message).toEqual('Internal Server Error')
                        done()
                    }
                })
        })
    })


    //* ============================= DELETE PRODUCT ================================//
    describe('Testing DELETE /products/:id', function() {

        it('Should return reponse with status code 200', function(done) {

            request(app)
                .delete(`/products/${id}`)
                .set('access_token', access_token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        console.log(res.body);
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual("string")
                        done()
                    }
                })
        })

        it('Should return reponse with status code 401', function(done) {
            let token = generateToken({id : 100, email : 'wibawa@mail.com'})

            request(app)
                .delete(`/products/${id}`)
                .set('access_token', token)
                .end(function(err, res) {
                    if (err) done(err)
                    else {
                        expect(res.statusCode).toEqual(401)
                        expect(res.body.message).toEqual('Unauthorized')
                        done()
                    }
                })
        })
    })
})