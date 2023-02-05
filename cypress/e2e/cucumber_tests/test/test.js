import { Given } from '@badeball/cypress-cucumber-preprocessor'

beforeEach(() => {
  cy.viewport('macbook-15')
})

Given('I click on something to fail', () => {
	cy.get('#test').click()
});
