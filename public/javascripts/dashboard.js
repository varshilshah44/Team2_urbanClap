const category = document.getElementById("cat");
const logout = document.getElementById("logout");

const categorydata = document.getElementById("categoryData");
const serviceData = document.getElementById("serviceData");
const vendorData = document.getElementById("vendorData");
const book = document.getElementById("book");
const addbooking = document.getElementById("bookingbtn");
const bookform = document.getElementById("bookform")

const tkn = localStorage.getItem("token");
const userid = localStorage.getItem("userid");

const template = document.getElementById("template");
let serviceid;
let vendorid;

function booking(vendorid,userName,serviceid,servicePrice){
    serviceid = serviceid;
    vendorid = vendorid;
    book.style.display = "block";
    document.querySelector("#vendorname").value = userName;

    addbooking.addEventListener('click',async () => {
      const date = document.querySelector("#date").value;
      const time = document.querySelector("#time").value;
      const qty = document.querySelector("#qty").value;
      const res =await axios.post('http://localhost:3000/api/booking',{
        serviceId:serviceid,
        vendorId:vendorid,
        userId:userid,
        bookingDate:date,
        bookingTime:time,
        qty:qty,
        totalPrice:servicePrice * qty
      },{
        headers:{
          Authorization: tkn
        }
      })
      if(res.data.status === "success"){
        alert("booking done");
        serviceData.innerHTML = "";
        categoryData.innerHTML = "";
        vendorData.innerHTML = "";
        book.style.display = "none";
      }
      else{
        alert(res.data.message);
      } 
    })
}

async function getVendors(serviceid,servicePrice) {
  const res = await axios.get(
    `http://localhost:3000/api/service/vendor/${serviceid}`,
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
        booking(el._id,el.userName,serviceid,servicePrice);
      });
      vendorData.append(node.content);
    });
  } else {
    alert(res.data.message);
  }
}

async function getServices(categoryid) {
  const res = await axios.get(
    `http://localhost:3000/api/service/${categoryid}`,
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
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
        getVendors(el._id,el.servicePrice);
      });
      serviceData.append(node.content);
    });
  } else {
    console.log(res.data.message);
  }
}

category.addEventListener("click", async () => {
  const res = await axios.get("http://localhost:3000/api/category/", {
    headers: {
      Authorization: tkn,
    },
  });
  if (res.data.status === "Success") {
    categorydata.innerHTML = "";
    serviceData.innerHTML = "";
    vendorData.innerHTML = "";
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

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  location.href = "../index.html";
});

bookform.addEventListener("submit",(e)=>{
  e.preventDefault();
})