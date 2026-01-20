let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let registerbtn = document.querySelector("#register");

registerbtn.addEventListener("click", function(e) {
  e.preventDefault();

  if (firstname.value === "" || lastname.value === "" || email.value === "" || password.value === "") {
    alert("Please fill all data");
  } else {
    localStorage.setItem("firstName", firstname.value);
    localStorage.setItem("lastName", lastname.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    alert("Registration successful!");

    setTimeout(() => {
      window.location.href = "../login/login.html";
    }, 1000);
  }

});






