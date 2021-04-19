const request = require('supertest')
const app = require('../app')
const generateToken = require('../helpers/generateToken')
const destroy = require('../helpers/destroy-product')


describe('Testing /user/login', function() {


let user = {id : 1, email : 'satya@mail.com', password : "123456"}

  it('Should return reponse with status code 200', function(done) {
      let {email, password} = user

      let data = { email , password }

      request(app)
              .post('/user/login')
              .send(data)
              .end(function(err, res) {
                  if (err) done(err)
                  else {
                      expect(res.statusCode).toEqual(200)
                      expect(typeof res.body).toEqual("string")
                      done()
                  }
              })
  })

  it('Should return reponse with status code 401', function(done) {
      let {email, password} = user

      let data = {email, password : ''}

      request(app)
          .post(`/user/login`)
          .send(data)
          .end(function(err, res) {
              if (err) done(err)
              else {
                  expect(res.statusCode).toEqual(401)
                  expect(typeof res.body).toEqual("object")
                  done()
              }
          })
  })

  it('Should return reponse with status code 401', function(done) {
      let {email, password} = user
      let data = { email : "mukti@mail.com", password }

      request(app)
              .post(`/user/login`)
              .send(data)
              .end(function(err, res) {
                  if (err) done(err)
                  else {
                      expect(res.statusCode).toEqual(401)
                      expect(typeof res.body).toEqual("object")
                      done()
                  }
              })
  })

  it('Should return reponse with status code 401', function(done) {
      let data = {email : '', password : ''} 

      request(app)
              .post(`/user/login`)
              .send(data)
              .end(function(err, res) {
                  if (err) done(err)
                  else {
                      expect(res.statusCode).toEqual(401)
                      expect(typeof res.body).toEqual("object")
                      done()
                  }
              })
  })
})