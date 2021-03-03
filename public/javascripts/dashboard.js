// const { default: axios } = require("axios");

const category = document.getElementById("cat");
const logout = document.getElementById("logout");
const profile = document.getElementById("profile");

const categorydata = document.getElementById("categoryData");
const serviceData = document.getElementById("serviceData");

const tkn = localStorage.getItem("token");
const uid = localStorage.getItem("userid");
const template = document.getElementById("template");

//PRofile FOrm
// const profileTemp = document.getElementById("profileTemp");
const alertDiv = document.getElementById("alertDiv");
const alertMsg = document.getElementById("alertMessage");
const email = document.getElementById("email");
const name = document.getElementById("name");
const mobile = document.getElementById("mobile");
const address = document.getElementById("address");
const profDiv = document.getElementById("profileDiv");
const profSubmitBtn = document.getElementById("profileSubmitBtn");

//////////////FUNCTIONS
async function getServices(id) {
  const res = await axios.get(`http://localhost:3000/api/service/${id}`, {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "Success") {
    serviceData.innerHTML = "";
    res.data.data.forEach((el) => {
      const node = template.cloneNode(true);
      node.innerHTML = `<div style="float:left;" class="card1">
          <h1>${el.serviceName}</h1>
          <p>${el.serviceDescription}</p>
          <p>price : ${el.servicePrice}</p>
          <p>time : ${el.serviceTime}</p>
          <p><button>Vendors</button></p>
          </div>`;
      node.content.querySelector('button').addEventListener('click', () => {
        alert(el._id)
      })
      serviceData.append(node.content);
    });
  } else {
    console.log(res.data.message);
  }
}

const profileUpdate = async (id, tkn, name, mobile, addr, email) => {
  const updateData = await axios.put(`http://localhost:3000/api/user/${id}`, {
    userName: name,
    userMobile: mobile,
    userAddress: addr,
    isActive: true
  },
    {
      headers: {
        Authorization: tkn,
      }
    })
  alertDiv.hidden = false;
  alertMessage.innerHTML = 'Profile <strong>Updated</strong> successuflly'
}

////////////EVENT LISTNERS
category.addEventListener("click", async () => {
  serviceData.innerHTML = '';
  categorydata.innerHTML = '';
  vendorData.innerHTML = '';
  profDiv.hidden = true;
  serviceData.hidden = false;
  categorydata.hidden = false;
  const res = await axios.get("http://localhost:3000/api/category/", {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "Success") {
    categorydata.innerHTML = "";
    serviceData.innerHTML = "";
    res.data.data.forEach((el) => {
      const node = template.cloneNode(true);
      node.innerHTML = ` <div class="card"s>
      <h1>${el.categoryName}</h1>
      </div> `;
      node.content.querySelector("div").addEventListener("click", () => {
        getServices(el._id);
      });
      categorydata.append(node.content);
    });
  } else {
    console.log(res.data.message);
  }
});

profile.addEventListener('click', async () => {
  profDiv.hidden = false;
  alertDiv.hidden = true;
  categorydata.hidden = true;
  serviceData.hidden = true;
  console.log(uid)
  const data = await axios.get(`http://localhost:3000/api/user/${uid}`, {
    headers: {
      Authorization: tkn,
    }
  });
  const res = data.data;
  // console.log(res)
  const { userName, userMobile, userAddress, isActive, userEmail } = res.data.User;
  console.log(userEmail)
  name.value = userName;
  mobile.value = userMobile;
  address.value = userAddress;
  email.innerHTML = 'Email: ' + userEmail;
  profSubmitBtn.addEventListener('click', () => {
    profileUpdate(uid, tkn, name.value, mobile.value, address.value, email.value);
  })
})

logout.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  location.href = "../index.html"
})