const addCategoryDiv = document.getElementById("addcategory");
const displayServicesDiv = document.getElementById("displayservices");
const addserviceDiv = document.getElementById("addservice");

const categoryName = document.getElementById("categoryName");
const tkn = localStorage.getItem("token");
const category = () => {
  location.href = "/categories";
};

const users = () => {
    location.href = "/users";
}

const addnewcategory = () => {
  addCategoryDiv.style.display = "block";
};

const onaddcategory = async () => {
  const res = await axios.post(
    `${window.location.origin}/api/category`,
    {
      categoryName: categoryName.value,
    },
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  if (res.data.status === "Success") {
    addCategoryDiv.style.display = "none";
    location.href = "/categories";
  } else {
    alert(res.data.message);
  }
};

const onaddservice = async (catid) => {
  const res = await axios.post(
    `${window.location.origin}/api/service/${catid}`,
    {
      serviceName: document.getElementById('servicename').value,
      servicePrice: document.getElementById('serviceprice').value,
      serviceDescription: document.getElementById('servicedescription').value,
      serviceTime:document.getElementById('servicetime').value
    },
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  if(res.data.status === "Success"){
      alert("added");
      addserviceDiv.style.display = "none";
      location.href = "/services?id=" + catid;
  }
  else{
      alert(res.data.message);
  }
};

const addservice = () => {
  addserviceDiv.style.display = "block";
};

const onselectVendor = (id) => {
    location.href = "/vendors?id=" + id;
}

const onSelectCategory = (id) => {
  location.href = "/services?id=" + id;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  location.href = "/";
};
