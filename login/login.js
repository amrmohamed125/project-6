let email = document.querySelector("#email");
let password = document.querySelector("#password");
let login = document.querySelector("#login");

let getemail = localStorage.getItem("email");
let getpassword = localStorage.getItem("password");

login.addEventListener("click", function(e) {
    e.preventDefault();

    if (!getemail || !getpassword) {
        alert("No account found. Please register first.");
        return;
    }

    if (getemail.trim() === email.value.trim() && getpassword.trim() === password.value.trim()) {
        setTimeout(() => {
            window.location.href = "/project-6/index.html";
        }, 1000);
    } else {
        alert("Incorrect email or password!");
    }

});








