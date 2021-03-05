const category = document.getElementById("cat");
const logout = document.getElementById("logout");
const profile = document.getElementById("profile");

const categorydata = document.getElementById("categoryData");
const serviceData = document.getElementById("serviceData");
const vendorData = document.getElementById("vendorData");
const book = document.getElementById("book");
const addbooking = document.getElementById("bookingbtn");
const bookform = document.getElementById("bookform");
const getBooking = document.getElementById("getBooking");

const alertDiv = document.getElementById("alertDiv");
const alertMsg = document.getElementById("alertMessage");
const email = document.getElementById("email");
const name = document.getElementById("name");
const mobile = document.getElementById("mobile");
const address = document.getElementById("address");
const profDiv = document.getElementById("profileDiv");
const profSubmitBtn = document.getElementById("profileSubmitBtn");
const bookDiv = document.getElementById("bookDiv");

const tkn = localStorage.getItem("token");
const userid = localStorage.getItem("userid");

const uid = localStorage.getItem("userid");
const template = document.getElementById("template");
let serviceid;
let vendorid;

function booking(vendorid, userName, serviceid, servicePrice) {
  serviceid = serviceid;
  vendorid = vendorid;
  book.style.display = "block";
  document.querySelector("#vendorname").value = userName;

  addbooking.addEventListener("click", async () => {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const qty = document.querySelector("#qty").value;
    const res = await axios.post(
      `${window.location.href}/api/booking`,
      {
        serviceId: serviceid,
        vendorId: vendorid,
        userId: userid,
        bookingDate: date,
        bookingTime: time,
        qty: qty,
        totalPrice: servicePrice * qty,
      },
      {
        headers: {
          Authorization: tkn,
        },
      }
    );
    if (res.data.status === "success") {
      alert("booking done");
      serviceData.innerHTML = "";
      categoryData.innerHTML = "";
      vendorData.innerHTML = "";
      book.style.display = "none";
    } else {
      alert(res.data.message);
    }
  });
}

async function getVendors(serviceid, servicePrice) {
  const res = await axios.get(
    `${window.location.href}/api/service/vendor/${serviceid}`,
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  if (res.data.status === "Success") {
    vendorData.innerHTML = "";
    res.data.vendors.forEach((el) => {
      const node = template.cloneNode(true);
      node.innerHTML = `<div class="vendorcard">
          <img
            src="./images/user.png"
            alt="Avatar"
            style="width: 40%; margin-left: 30%"
          />
          <div class="container">
            <h4 style="text-align:center;"><b>${el.userName}</b></h4>
            <p style="text-align:center;">${el.userMobile}</p>
            <p style="text-align:center;">${el.userAddress}</p>
            <p style="text-align:center;"><button>Choose</button></p>
          </div>
        </div>`;
      node.content.querySelector("button").addEventListener("click", () => {
        book.hidden = false;
        booking(el._id, el.userName, serviceid, servicePrice);
      });
      vendorData.append(node.content);
    });
  } else {
    alert(res.data.message);
  }
}

//PRofile FOrm
// const profileTemp = document.getElementById("profileTemp");

//////////////FUNCTIONS
async function getServices(id) {
  const res = await axios.get(`${window.location.href}/api/service/${id}`, {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "Success") {
    serviceData.innerHTML = "";
    const node = template.cloneNode(true);
    res.data.data.forEach((el) => {
      node.innerHTML = `<div style="float:left;" class="card1">
          <h1>${el.serviceName}</h1>
          <p>${el.serviceDescription}</p>
          <p>price : ${el.servicePrice}</p>
          <p>time : ${el.serviceTime}</p>
          <p><button>Vendors</button></p>
        </div>`;
      node.content.querySelector("button").addEventListener("click", () => {
        vendorData.hidden = false;
        getVendors(el._id, el.servicePrice);
      });
      serviceData.append(node.content);
    });
  } else {
    console.log(res.data.message);
  }
}

const profileUpdate = async (id, tkn, name, mobile, addr, email) => {
  const updateData = await axios.put(
    `${window.location.href}/api/user/${id}`,
    {
      userName: name,
      userMobile: mobile,
      userAddress: addr,
      isActive: true,
    },
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  alertDiv.hidden = false;
  alertMessage.innerHTML = "Profile <strong>Updated</strong> successuflly";
};

////////////EVENT LISTNERS
category.addEventListener("click", async () => {
  serviceData.innerHTML = "";
  categorydata.innerHTML = "";
  vendorData.innerHTML = "";
  profDiv.hidden = true;
  bookDiv.hidden = true;
  serviceData.hidden = false;
  categorydata.hidden = false;
  const res = await axios.get(`${window.location.href}/api/category/`, {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "Success") {
    const node = template.cloneNode(true);
    res.data.data.forEach((el) => {
      node.innerHTML = ` <div class="card"s>
            <h3>${el.categoryName}</h3>
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

bookform.addEventListener("submit", (e) => {
  e.preventDefault();
});
profile.addEventListener("click", async () => {
  profDiv.hidden = false;
  alertDiv.hidden = true;
  categorydata.hidden = true;
  serviceData.hidden = true;
  vendorData.hidden = true;
  book.hidden = true;
  bookDiv.hidden = true;
  //console.log(uid)
  const data = await axios.get(`${window.location.href}/api/user/${uid}`, {
    headers: {
      Authorization: tkn,
    },
  });
  const res = data.data;
  // console.log(res)
  const {
    userName,
    userMobile,
    userAddress,
    isActive,
    userEmail,
  } = res.data.User;
  console.log(userEmail);
  name.value = userName;
  mobile.value = userMobile;
  address.value = userAddress;
  email.innerHTML = "Email: " + userEmail;
  profSubmitBtn.addEventListener("click", () => {
    profileUpdate(
      uid,
      tkn,
      name.value,
      mobile.value,
      address.value,
      email.value
    );
  });
});

async function getBookings(){
  const res = await axios.get(`${window.location.href}/api/booking/${userid}`, {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "success") {
    bookDiv.innerHTML = "";
    const node = template.cloneNode(true);
    node.innerHTML = `<table id="customers">
    <tr>
      <th>serviceName</th>
      <th>servicePrice</th>
      <th>qty</th>
      <th>vendorName</th> 
      <th>vendorMobile</th>
      <th>bookingDate</th>
      <th>bookingTime</th>
      <th>bookingStatus</th>
      <th>totalPrice</th>
    </tr> 
  </table>`
  bookDiv.append(node.content);
    res.data.Bookings.forEach((el) => {
      const node1 = template.cloneNode(true);
      node1.innerHTML = `<tr>
        <td>${el.serviceId.serviceName}</td>
        <td>${el.serviceId.servicePrice}</td>
        <td>${el.qty}</td>
        <td>${el.vendorId.userName}</td>
        <td>${el.vendorId.userEmail}</td>
        <td>${el.bookingDate}</td>
        <td>${el.bookingTime}</td>
        <td>${el.bookingStatus}</td>
        <td>${el.totalPrice}</td>
      </tr>`;
      document.querySelector("#customers").appendChild(node1.content);
    });
  } else {
    alert(res.data.message);
  }
}
getBooking.addEventListener("click",  () => {
  profDiv.hidden = true;
  alertDiv.hidden = true;
  categorydata.hidden = true;
  serviceData.hidden = true;
  vendorData.hidden = true;
  book.hidden = true;
  bookDiv.hidden = false; 
  getBookings();
});

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  location.href = "../index.html";
});
