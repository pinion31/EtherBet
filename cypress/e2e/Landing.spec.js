
// const usernameNode = getByTestId('username-signup');
// const passwordNode = getByTestId('password-signup');
// const confirmPasswordNode = getByTestId('confirm-signup');
// const addressNode = getByTestId('address-signup');
import uuid from 'uuid';

describe('Landing page', () => {
  // it should not allow duplicate user sign up
  // it should verify input

  it('can navigate to sign up from landing page and sign up', () => {
    cy
      .visit('/')
      .findByText('Sign Up')
      .click()
      .assertRoute('/sign-up')
      .findByTestId('username-signup')
      .type(uuid())
      .findByTestId('complete-signup')
      .click()
      .queryByText('Please complete all fields.')
      .should('exist')
      .findByTestId('password-signup')
      .type('c')
      .queryByText('Please complete all fields.')
      .should('not.exist')
      .findByTestId('complete-signup')
      .click()
      .queryByText('Please complete all fields.')
      .should('exist')
      .findByTestId('confirm-signup')
      .type('c')
      .queryByText('Please complete all fields.')
      .should('not.exist')
      .findByTestId('complete-signup')
      .click()
      .queryByText('Please complete all fields.')
      .should('exist')
      .findByTestId('address-signup')
      .type('c')
      .queryByText('Please complete all fields.')
      .should('not.exist')
      .findByTestId('complete-signup')
      .click()
      .assertRoute('/todays-events')
      .findByTestId('wide-logout')
      .click()
      .assertRoute('/');
  });

  it('should verify passwords match', () => {
    cy
      .visit('/')
      .findByText('Sign Up')
      .click()
      .assertRoute('/sign-up')
      .findByTestId('username-signup')
      .type('chris')
      .findByTestId('password-signup')
      .type('c')
      .findByTestId('confirm-signup')
      .type('ca')
      .findByTestId('address-signup')
      .type('c')
      .findByTestId('complete-signup')
      .click()
      .queryByText('Passwords do not match.')
      .should('exist');
  });
});
