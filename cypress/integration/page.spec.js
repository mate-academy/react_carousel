// WRITE TESTS HERE

describe('Page', () => {
  before(() => {
    cy.visit('/');
  });
  
 it('should contain title of the page', () => {
   cy.getByDataCy('title')
     .should('contain', 'Carousel');
 });

 it('have length 10', () => {
   cy.getByDataCy('carousel')
   .children()
   .should('have.length', 10)
 });

  it('should have picture size 130 px by default', () => {
  
    cy.get('[src="./img/1.png"]')
    .invoke('attr', 'width')
    .should('eq', '130');
  });

  it ('should display 3 images by default', () => {
    cy.get('[src="./img/1.png"]').should('be.visible')
    cy.get('[src="./img/2.png"]').should('be.visible')
    cy.get('[src="./img/3.png"]').should('be.visible')
    cy.get('[src="./img/4.png"]').should('not.be.visible')
  });

  it('should scroll 3 images by default', () => {
    cy.getByDataCy('next').click();
    cy.get('[src="./img/4.png"]').should('be.visible')
    cy.get('[src="./img/5.png"]').should('be.visible')
    cy.get('[src="./img/6.png"]').should('be.visible')
    cy.get('[src="./img/7.png"]').should('not.be.visible')
  });
   
  it('should change scroll text on 1 step', () => {
    cy.reload()
    cy.getByDataCy('step').type('{selectall}1');
    cy.getByDataCy('next').click();
    cy.get('[src="./img/4.png"]').should('be.visible')
    cy.get('[src="./img/5.png"]').should('not.be.visible')
  });

  it('should change width of image', () => {
    cy.reload()
    cy.getByDataCy('width').type('{selectall}200');
    cy.get('[src="./img/1.png"]')
    .invoke('attr', 'width')
    .should('eq', '200');

  });
    
    it('should change frame size', () => {
      cy.reload()
      cy.getByDataCy('frame').type('{selectall}2');
      cy.get('[src="./img/1.png"]').should('be.visible')
      cy.get('[src="./img/2.png"]').should('be.visible')
      cy.get('[src="./img/3.png"]').should('not.be.visible')
    });
  });
  