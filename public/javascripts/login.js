const loginBtn = document.getElementById("loginbtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errormessage = document.getElementById("errormessage")
const form = document.getElementById("form");
let y;


if(window.location.href.lastIndexOf('/') === window.location.href.length-1){ 
    y = window.location.href.substring(0,window.location.href.length-1);
}
window.location.href = y
console.log(window.location.href)   
async function login() {
    const res = await axios.put(`${window.location.href}api/user/login`, {
        userEmail: email.value,
        userPassword: password.value
    })
    errormessage.textContent = res.data.message
    if (res.data.status === "success") {
        if (res.data.data.userRole === "user") {
            alert("Login Successfully");
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('userid', res.data.data.userId);
            location.href = "../dashboard.html"
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