
const page = {
  getImg(number) {
    return cy.get(`[src="./img/${number}.png"]`);
}
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

 it('should contain title of the page', () => {
    cy.getByDataCy('title')
     .should('contain', 'Carousel');
 });

 it('should contain 10 images', () => {
    cy.get('ul')
      .children()
      .should('have.length', 10)
 });

  it('should have picture size 130 px by default', () => {
    page.getImg('1')
      .invoke('attr', 'width')
      .should('eq', '130');
  });

  it ('should display 3 images by default', () => {
    page.getImg('1')
      .should('be.visible');
    page.getImg('2')
      .should('be.visible');
    page.getImg('3')
      .should('be.visible');
    page.getImg('4')
      .should('not.be.visible');
  });

  it('should scroll 3 images by default', () => {
    cy.getByDataCy('next')
      .click();
    page.getImg('4')
      .should('be.visible');
    page.getImg('5')
      .should('be.visible');
    page.getImg('6')
      .should('be.visible');
    page.getImg('7')
      .should('not.be.visible');
  });

  it('should change scroll text on 1 step', () => {
    cy.get('[for="stepId"]')
      .type('{selectall}1');
    cy.getByDataCy('next')
      .click();
    page.getImg('4')
      .should('be.visible');
    page.getImg('5')
      .should('not.be.visible');
  });

  it('should change width of image', () => {
    cy.get('[for ="itemWidthId"]')
      .type('{selectall}200');
    page.getImg('1')
      .invoke('attr', 'width')
      .should('eq', '200');
  });

  it('should change frame size', () => {
    cy.get('[for ="frameSizeId"')
      .type('{selectall}2');
    page.getImg('1')
      .should('be.visible');
    page.getImg('2')
      .should('be.visible');
    page.getImg('3')
      .should('not.be.visible');
    });
  });
