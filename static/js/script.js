/**
 * Scripts for trek books.
 */
(function() {

  var app = {};

  /**
   * Easter eggs that console log out.
   */
  app.easterEggs = function(timeout) {
    console.log('Q: How do you stop from falling out of a Bird of Prey?');
    console.log('A: You just have to Klingon!');

    setTimeout(function() {
      console.warn('Hey man, are you checking out my logs!?');
    }, timeout);
  }

  /**
   * Toggles the mobile menu.
   */
  app.mobileMenu = function() {
    var menuToggle = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var menuClose = document.getElementById('menu-close');

    menuToggle.onclick = function() {
      toggleMenu();
    }

    menuClose.onclick = function() {
      toggleMenu();
    }

    function toggleMenu() {
      mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
    }
  }

  // Call the methods.
  app.easterEggs(30000);
  app.mobileMenu();

})();
