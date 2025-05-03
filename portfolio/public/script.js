document.addEventListener("DOMContentLoaded", function () {
    function checkMobileView() {
        if (window.innerWidth < 768) {
            document.querySelector(".resume-embed").style.display = "none";
            document.querySelector(".mobile-view").style.display = "block";
        } else {
            document.querySelector(".resume-embed").style.display = "block";
            document.querySelector(".mobile-view").style.display = "none";
        }
    }

    
    checkMobileView();


    window.addEventListener("resize", checkMobileView);

    document
        .querySelector(".download-btn")
        .addEventListener("click", function () {
            console.log("Resume downloaded");
        });
});
// Contact script
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    // UI feedback
    button.disabled = true;
    button.innerHTML = '<span class="spinner">Sending...</span>';

    try {
      const formData = new FormData(form);
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message || 'Message sent successfully!');
        form.reset();
      } else {
        alert(result.error || 'Failed to send message');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
