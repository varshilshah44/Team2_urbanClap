const loginBtn = document.getElementById("loginbtn");

const email = document.getElementById("email");
const password = document.getElementById("password");
const errormessage = document.getElementById("errormessage")
const form = document.getElementById("form");

const adminBtn = document.getElementById('adminBtnSubmit');

const adminUsername = document.getElementById('username');
const adminPassword = document.getElementById('paswd');
const admform = document.getElementById("form");


async function login() {
    const res = await axios.put(`${window.location.origin}/api/user/login`, {
        userEmail: email.value || adminUsername.value,
        userPassword: password.value || adminPassword.value
    })
    errormessage.textContent = res.data.message
    if (res.data.status === "success") {
        if (res.data.data.userRole === "user") {
            alert("Login Successfully");
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('userid', res.data.data.userId);
            location.href = "/dashboard"
        } else if (res.data.data.userRole === 'admin') {
            alert("Login Successfully");
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('userid', res.data.data.userId);
            location.href = "/adminDashboard"
        }
        else {
            alert("you are not user")
        }
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();
})

loginBtn.addEventListener('click', login);

admform.addEventListener("submit", (event) => {
    event.preventDefault();
})

adminBtn.addEventListener('click', login);