import { User } from '../../src/types';

let createdUser: User;
createdUser = {
  username: 'test23',
  email: 'test58@gmail.com',
  password: '11111',
};

context('User and Cleaner setup', async () => {
  afterEach(() => {
    cy.task('clearUser', createdUser);
  });

  it('sign up an user', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[name="username"]').type(createdUser.username);
    cy.get('input[name="email"]').type(createdUser.email);
    cy.get('input[name="password"]').type(createdUser.password as string);
    cy.get('button').contains('Sign Up').click();
    cy.location('pathname').should('eq', '/logedin');
  });
});

context('app functionalirt', async () => {
  beforeEach(() => {
    cy.task('seedDatabase', createdUser);
  });
  afterEach(() => {
    cy.task('clearUser', createdUser);
  });

  it('loggs in the user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(createdUser.email);
    cy.get('input[name="password"]').type(createdUser.password as string);
    cy.get('button').contains('Login').click();
    cy.location('pathname').should('eq', '/logedin');
  });

  it('loggs in and loggs out the user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(createdUser.email);
    cy.get('input[name="password"]').type(createdUser.password as string);
    cy.get('button').contains('Login').click();
    cy.location('pathname').should('eq', '/logedin');
    cy.get('button').contains('Log Out').click();
    cy.location('pathname').should('eq', '/');
  });

  it('loggs in and creates and order', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(createdUser.email);
    cy.get('input[name="password"]').type(createdUser.password as string);
    cy.get('button').contains('Login').click();
    cy.location('pathname').should('eq', '/logedin');
    cy.get('select[name="measures"]').select('80*150 cm');
    cy.get('input[name="condition"]').type('xcgood');
    cy.get('input[name="material"]').type('xzcsilk');
    cy.get('button[name="addtolist1"').contains('Add to List').click();
    cy.get('select[name="seats"]').select('1 seat');
    cy.get('select[name="condition"]').select('Stained');
    cy.get('button[name="addtolist2"').contains('Add to List').click();
    cy.get('select[name="servicetable"]').select('Polish');
    cy.get('button[name="addtolist3"').contains('Add to List').click();
    cy.get('input[name="address"').type('TESTBerlin Potsdamer Platz');
    cy.get('button[name="sendtocleaner"]').click();
    cy.task('clearBooking');
  });
});
