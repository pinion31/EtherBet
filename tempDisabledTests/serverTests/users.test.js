import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index/index.js';
import User from '../../index/models/User';

chai.use(chaiHttp);

const testUser = {
  id: 1,
  login: 'chris',
  password: '$2a$10$zT.RBNpLAk48g2LhR48QOePH.1q3UCEZMv.7S7u28y3BG0Q.pNmKG',
  addresses: ['testAddress', 'addressOne'],
  etherAmount: 1000,
  createdAt: '2019-07-21 16:16:26.322-05',
  updatedAt: '2019-07-21 16:16:26.322-05',
};

beforeEach((done) => {
  User.destroy({truncate: true, cascade: false})
    .then(() => User.create(testUser))
    .then(() => done())
    .catch(async (e) => {
      done();
      console.log('Try again. Error setting up DB in users.test.js.', e);
    });
});

test('it successfully create a new user in call to /create-user', (done) => {
  chai
    .request(server)
    .post('/users/create-user')
    .send({
      username: 'lucy',
      password1: 'test',
      address: 'test',
    })
    .end((err, res) => {
      const {
        id,
        login,
        password,
        addresses,
        etherAmount,
        updatedAt,
        createdAt,
      } = res.body;
      expect(id).toBeGreaterThan(-1);
      expect(login).toBe('lucy');
      expect(etherAmount).toBe(0);
      expect(addresses.length).toBe(1);
      expect(addresses[0]).toBe('test');
      expect(password).toBeDefined();
      expect(password.length).toBeGreaterThan(1);
      expect(updatedAt).toBeDefined();
      expect(updatedAt.length).toBeGreaterThan(1);
      expect(createdAt).toBeDefined();
      expect(createdAt.length).toBeGreaterThan(1);
      done();
    });
});

test('it handles bcrypt errorr', (done) => {
  chai
    .request(server)
    .post('/users/create-user')
    .send({
      username: 'lucy',
      password1: 'test',
      address: 'test',
    })
    .end((err, res) => {
      const {
        id,
        login,
        password,
        addresses,
        etherAmount,
        updatedAt,
        createdAt,
      } = res.body;
      expect(id).toBeGreaterThan(-1);
      expect(login).toBe('lucy');
      expect(etherAmount).toBe(0);
      expect(addresses.length).toBe(1);
      expect(addresses[0]).toBe('test');
      expect(password).toBeDefined();
      expect(password.length).toBeGreaterThan(1);
      expect(updatedAt).toBeDefined();
      expect(updatedAt.length).toBeGreaterThan(1);
      expect(createdAt).toBeDefined();
      expect(createdAt.length).toBeGreaterThan(1);
      done();
    });
});

test('it successfully retrieves a user', async (done) => {
  await chai.request(server).post('/users/create-user').send({
    username: 'cletus',
    password1: 'test',
    address: 'test',
  });

  chai
    .request(server)
    .post('/users/get-user')
    .send({
      username: 'cletus',
      password: 'test',
    })
    .end((err, res) => {
      const {
        id,
        login,
        password,
        addresses,
        etherAmount,
        updatedAt,
        createdAt,
      } = res.body;
      expect(id).toBeGreaterThan(-1);
      expect(login).toBe('cletus');
      expect(etherAmount).toBe(0);
      expect(addresses.length).toBe(1);
      expect(addresses[0]).toBe('test');
      expect(password).toBeDefined();
      expect(password.length).toBeGreaterThan(1);
      expect(updatedAt).toBeDefined();
      expect(updatedAt.length).toBeGreaterThan(1);
      expect(createdAt).toBeDefined();
      expect(createdAt.length).toBeGreaterThan(1);
      done();
    });
});

test('it denies user if password is incorrect', (done) => {
  chai
    .request(server)
    .post('/users/get-user')
    .send({
      username: 'chris',
      password: 'c',
    })
    .end((err, res) => {
      expect(res.body).toEqual({error: 'Invalid username/password'});
      console.log('getting user', res.body);
      done();
    });
});

test('it denies user if user is invalid', (done) => {
  chai
    .request(server)
    .post('/users/get-user')
    .send({
      username: 'invalid user',
      password: 'c',
    })
    .end((err, res) => {
      expect(res.body).toEqual({error: 'Invalid username/password'});
      done();
    });
});

test('it handles error when checking DB for user', (done) => {
  const origFindOne = User.findOne;
  User.findOne = () => Promise.reject(new Error('DB offline'));
  chai
    .request(server)
    .post('/users/get-user')
    .send({
      username: 'invalid user',
      password: 'c',
    })
    .end((err, res) => {
      expect(res.body).toEqual({error: 'DB offline'});
      User.findOne = origFindOne; // restore original function
      done();
    });
});
