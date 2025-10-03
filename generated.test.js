```javascript
describe('Courses Page Responsive Layout', () => {
  const viewports = [
    { name: 'mobile', preset: 'iphone-6' },
    { name: 'tablet', preset: 'ipad-2' },
    { name: 'desktop', preset: [1280, 720] } // Common desktop size
  ];

  viewports.forEach(viewport => {
    describe(`on ${viewport.name} viewport`, () => {
      beforeEach(() => {
        if (Array.isArray(viewport.preset)) {
          cy.viewport(viewport.preset[0], viewport.preset[1]);
        } else {
          cy.viewport(viewport.preset);
        }
        cy.visit('./source code/courses.html');
        // Allow time for animations to finish
        cy.wait(500);
      });

      it('should render the navigation bar correctly', () => {
        if (viewport.name === 'mobile' || viewport.name === 'tablet') {
          cy.get('.navbar-toggler').should('be.visible');
          cy.get('#navbarCollapse').should('not.be.visible');
          cy.get('.navbar-toggler').click();
          cy.get('#navbarCollapse').should('be.visible');
          cy.contains('.nav-item.nav-link', 'Courses').should('be.visible');
        } else {
          cy.get('.navbar-toggler').should('not.be.visible');
          cy.get('#navbarCollapse').should('be.visible');
          cy.contains('.nav-item.nav-link', 'Courses').should('be.visible');
          cy.get('.btn-primary.py-4.px-lg-5').contains('Join Now').should('be.visible');
        }
      });

      it('should render the page header and breadcrumbs', () => {
        cy.get('.page-header h1').contains('Courses').should('be.visible');
        cy.get('.breadcrumb').should('be.visible');
        cy.get('.breadcrumb-item.active').contains('Courses').should('be.visible');
      });

      it('should render the course categories grid', () => {
        cy.contains('h1', 'Courses Categories').should('be.visible');
        cy.get('.category .row.g-3 a').should('have.length', 4);
        cy.get('.category .row.g-3 a').each($el => {
          cy.wrap($el).should('be.visible');
        });
        cy.contains('h5', 'Web Design').should('be.visible');
        cy.contains('h5', 'Online Marketing').should('be.visible');
      });

      it('should render the popular courses grid', () => {
        cy.contains('h1', 'Popular Courses').should('be.visible');
        cy.get('.course-item').should('have.length', 3);
        cy.get('.course-item').each($el => {
          cy.wrap($el).should('be.visible');
          cy.wrap($el).find('img').should('be.visible');
          cy.wrap($el).find('h5').should('not.be.empty');
          cy.wrap($el).find('.d-flex.border-top small').should('have.length', 3);
        });
      });

      it('should render the testimonial section', () => {
        cy.contains('h1', 'Our Students Say!').should('be.visible');
        cy.get('.testimonial-carousel').should('be.visible');
        // Owl Carousel clones items, so we check for visibility of at least one original item's content
        cy.get('.testimonial-item').not('.cloned').first().should('be.visible');
      });

      it('should render the footer with all its sections', () => {
        cy.get('.footer').should('be.visible');
        cy.get('.footer h4').contains('Quick Link').should('be.visible');
        cy.get('.footer h4').contains('Contact').should('be.visible');
        cy.get('.footer h4').contains('Gallery').should('be.visible');
        cy.get('.footer h4').contains('Newsletter').should('be.visible');
        cy.get('.copyright').should('be.visible');
      });

      it('should display the "Back to Top" button after scrolling', () => {
        cy.get('.back-to-top').should('not.be.visible');
        cy.scrollTo('bottom');
        cy.get('.back-to-top').should('be.visible');
      });
    });
  });
});
```