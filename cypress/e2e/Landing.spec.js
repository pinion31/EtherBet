
describe('Landing page', () => {
  // it should not allow duplicate user sign up
  // it should verify input
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed');
  });

  it('can navigate to sign up from landing page and sign up', () => {
    cy
      .visit('/')
      .findByText('Sign Up')
      .click()
      .assertRoute('/sign-up')
      .findByTestId('username-signup')
      .type('chris')
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

  it('should create prompt to login if not logged in and attempting to create a bet and user should create bet', () => {
    cy
      .visit('/')
      .queryAllByText('Bet Now')
      .first()
      .click()
      .findByTestId('username')
      .type('Nicole')
      .findByTestId('password-login-modal')
      .type('c')
      .findByTestId('submit-login-modal')
      .click()
      .findByTestId('wager')
      .type(10)
      .findByTestId('friend-bet-modal')
      .type('Lucy')
      .findByTestId('submit-bet-modal')
      .click()
      .queryByText('Bet Successfully Created!')
      .should('exist')
      .queryAllByText('Ok')
      .first()
      .click()
      .findByText('Your Bets')
      .click()
      .queryByText('Portland Trail Blazers vs Denver Nuggets')
      .should('exist')
      .queryByText('Wager: 10 eth')
      .should('exist')
      .queryByText('Betting Against: Lucy')
      .should('exist')
      .queryByText('Bet: to win by 10pts')
      .should('exist')
      .queryByText('Status: OFFER PENDING')
      .should('exist')
      .findByTestId('wide-logout')
      .click()
      .assertRoute('/');
  });

  it('should handle error if user tries to a create bet with a non-existent user', () => {
    cy
      .visit('/')
      .queryAllByText('Bet Now')
      .first()
      .click()
      .findByTestId('username')
      .type('Nicole')
      .findByTestId('password-login-modal')
      .type('c')
      .findByTestId('submit-login-modal')
      .click()
      .findByTestId('wager')
      .type(10)
      .findByTestId('friend-bet-modal')
      .type('Mini')
      .findByTestId('submit-bet-modal')
      .click()
      .queryByText('User not found')
      .should('exist')
      .findByTestId('cancel-bet-modal')
      .click()
      .findByTestId('wide-logout')
      .click()
      .assertRoute('/');
  });

  it('should create prompt to login if not logged in and user should not be able to login with wrong password', () => {
    cy
      .visit('/')
      .queryAllByText('Bet Now')
      .first()
      .click()
      .findByTestId('username')
      .type('Nicole')
      .findByTestId('password-login-modal')
      .type('invalid')
      .findByTestId('submit-login-modal')
      .click()
      .findByTestId('error-title-modal')
      .should('exist')
      .findByTestId('error-content-modal')
      .should('exist')
      .findByTestId('error-ok-modal')
      .click()
      .findByTestId('cancel-login-modal')
      .click();
  });

  it('should create prompt to login if not logged in and user should not be able to close modal with cancel button', () => {
    cy
      .visit('/')
      .queryAllByText('Bet Now')
      .first()
      .click()
      .findByTestId('cancel-login-modal')
      .click()
      .findByTestId('username')
      .should('not.exist');
  });
});
