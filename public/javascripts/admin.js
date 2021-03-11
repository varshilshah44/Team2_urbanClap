const addCategoryDiv = document.getElementById("addcategory");
const displayServicesDiv = document.getElementById("displayservices");
const addserviceDiv = document.getElementById("addservice");

const categoryName = document.getElementById("categoryName");
const tkn = localStorage.getItem("token");
const category = () => {
  location.href = "/categories";
};

const profile = () => {
  location.href = `/profile?userid=${localStorage.getItem('userid')}`;
}

const users = () => {
  location.href = "/users";
};

const bookings = (userid) => {
    if(!userid){
    location.href = '/bookings';
    }
    else{
    location.href = `/bookings?userid=${userid}`;       
    }
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
      serviceName: document.getElementById("servicename").value,
      servicePrice: document.getElementById("serviceprice").value,
      serviceDescription: document.getElementById("servicedescription").value,
      serviceTime: document.getElementById("servicetime").value,
    },
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  if (res.data.status === "Success") {
    alert("added");
    addserviceDiv.style.display = "none";
    location.href = "/services?id=" + catid;
  } else {
    alert(res.data.message);
  }
};

const onBlockUnblock = async (userid,active) => {
  const res = await axios.put(
    `${window.location.origin}/api/user/${userid}`,
    {
      isActive:active,
    },
    {
      headers: {
        Authorization: tkn,
      },
    }
  );
  console.log(res.data)
  if(res.data.status === "success"){
  location.href = "/users";
  }
  else{
      alert(res.data.message);
  }
};

const onupdateprofile = async () => {
   if(!document.getElementById('username').value || !document.getElementById('useraddress').value || !document.getElementById('usermobile').value){
    alert("not allowed");
   }
   else{
   const res =  await axios.put(`${window.location.origin}/api/user/${localStorage.getItem('userid')}`,{
      userName:document.getElementById('username').value,
      userAddress:document.getElementById('useraddress').value,
      userMobile:document.getElementById('usermobile').value
   },{
     headers:{
      Authorization: tkn
     }
   })
   if(res.data.status === "success"){ 
    location.href = `/profile?userid=${localStorage.getItem('userid')}`;
   }  
   else{
     alert(res.data.message);
   }
  }
}

const oncategorydelete = async (catid) => {
  const res = await axios.delete(`${window.location.origin}/api/category/${catid}`,{
    headers:{
      Authorization: tkn
    }
  })
  if(res.data.status === "Success"){
    location.href = "/categories";
  }
  else{
    alert(res.data.message);
  }
}

const onservicedelete = async (serviceid,catid) => {
  const res = await axios.delete(`${window.location.origin}/api/service/${serviceid}`,{
    headers:{
      Authorization: tkn
    }
  })
  if(res.data.status === "Success"){
    location.href = "/services?id=" + catid;
  }
  else{
    alert(res.data.message);
  }
}

const onbookingstatus = (status,userid) => {
  if(!userid){
    location.href = `/bookings?status=${status}`;
  }
  else{
    location.href = `/bookings?status=${status}?userid=${userid}`;
  }
}

const addservice = () => {
  addserviceDiv.style.display = "block";
};

const onselectVendor = (id) => {
  location.href = "/vendors?id=" + id;
};

const onSelectCategory = (id) => {
  location.href = "/services?id=" + id;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  location.href = "/";
};
