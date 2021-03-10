const loginBtn = document.getElementById("loginbtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errormessage = document.getElementById("errormessage")
const form = document.getElementById("form");
 

async function login() {
    const res = await axios.put(`${window.location.origin}/api/user/login`, {
        userEmail: email.value,
        userPassword: password.value
    })
    errormessage.textContent = res.data.message
    if (res.data.status === "success") {
        alert("Login Successfully");
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userid', res.data.data.userId);
        if (res.data.data.userRole === "user") {
            location.href = "/dashboard"
        }
        else if(res.data.data.userRole === "admin"){
            location.href = "/admindashboard"
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