const category = document.getElementById("cat");
const logout = document.getElementById("logout");

const categorydata = document.getElementById("categoryData");
const serviceData = document.getElementById("serviceData");

const tkn = localStorage.getItem("token");
const email = localStorage.getItem("userid");
const template = document.getElementById("template");

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
      node.content.querySelector('button').addEventListener('click',()=>{
          alert(el._id)
      })  
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

logout.addEventListener('click',()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    location.href="../index.html"
})