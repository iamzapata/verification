describe('<App /> interactions with clicks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/')
    cy.wait(1000)
    cy.get('.App').then($el => {
      if ($el.text().includes('Oh no, something went wrong!')) {
        cy.visit('http://localhost:4000/')
      }
    })
  })

  it('completes all checks with YES', () => {
    cy.contains('Document data is clearly visible').contains('Yes').click()

    cy.contains('Submit').should('be.disabled')

    cy.contains('Veriff supports presented document').contains('Yes').click()

    cy.contains('Submit').should('be.disabled')

    cy.contains('Face is clearly visible').contains('Yes').click()

    cy.contains('Submit').should('be.disabled')

    cy.contains('Face on the picture matches face on the document')
      .contains('Yes')
      .click()

    cy.contains('Submit').click()

    cy.get('.App').contains(/Oh no, something went wrong!|Results submitted!/g)
  })

  it('completes check with NO', () => {
    cy.contains('Document data is clearly visible').contains('Yes').click()

    cy.contains('Submit').should('be.disabled')

    cy.contains('Veriff supports presented document').contains('No').click()

    cy.contains('Submit').click()

    cy.get('.App').contains(/Oh no, something went wrong!|Results submitted!/g)
  })
})

describe('<App /> interactions with keyboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/')
    cy.wait(1000)
    cy.get('.App').then($el => {
      if ($el.text().includes('Oh no, something went wrong!')) {
        cy.visit('http://localhost:4000/')
      }
    })
  })

  it('completes all checks with YES', () => {
    cy.contains('Document data is clearly visible').contains('Yes').click()

    cy.contains('Submit').should('be.disabled')

    cy.get('body').type('1')
    cy.get('body').type('2')
    cy.contains('Submit').should('not.be.disabled')

    cy.get('body').type('1')
    cy.contains('Submit').should('be.disabled')

    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')
    cy.contains('Submit').should('not.be.disabled')

    cy.get('body').type('{upArrow}')
    cy.get('body').type('{upArrow}')
    cy.get('body').type('{upArrow}')
    cy.get('body').type('{upArrow}')
    cy.get('body').type('{2}')
    cy.contains('Submit').should('not.be.disabled')

    cy.get('body').type('{1}')
    cy.contains('Submit').should('be.disabled')

    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')
    cy.get('body').type('1')
    cy.get('body').type('{downArrow}')

    cy.contains('Submit').click()

    cy.get('.App').contains(/Oh no, something went wrong!|Results submitted!/g)
  })
})

export {}
