
document.addEventListener('DOMContentLoaded', function() {
  // Check if mobile view should be shown
  function checkMobileView() {
      if (window.innerWidth < 768) {
          document.querySelector('.resume-embed').style.display = 'none';
          document.querySelector('.mobile-view').style.display = 'block';
      } else {
          document.querySelector('.resume-embed').style.display = 'block';
          document.querySelector('.mobile-view').style.display = 'none';
      }
  }

  // Run on initial load
  checkMobileView();

  // Run on window resize
  window.addEventListener('resize', checkMobileView);

  // PDF download tracking (optional)
  document.querySelector('.download-btn').addEventListener('click', function() {
      console.log('Resume downloaded');
      // You could add analytics tracking here
  });
});
