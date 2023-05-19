$(document).ready(function() {
  $("#registerForm").submit(function(e) {
    e.preventDefault();

    // Get form data
    var fullName = $("#fullName").val();
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();

    // Create data object
    var data = {
      fullName: fullName,
      email: email,
      username: username,
      password: password,
    };

    // Make AJAX request
    $.ajax({
      url: "http://localhost:5000/register",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(response) {
        // Display success message
        $("#message").text("Registration successful!");
      },
      error: function(xhr, status, error) {
        // Display error message
        $("#message").text("Registration failed. Please try again.");
      },
    });
  });
});
