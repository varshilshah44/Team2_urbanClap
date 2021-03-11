
const getPeople = document.getElementById('getUsers');
const createCategory = document.getElementById('createCat');
const createService = document.getElementById('service');
const getUser = document.getElementById('getUsers');
const getAllBooking = document.getElementById('getAllBooking');


// const bookDiv = document.getElementById("bookDiv");


// const catService = require('./services/category');

const newCategory = async () => {
    console.log('CREATE CAT!!')
    serviceData.innerHTML = "";
    categorydata.innerHTML = "";
    vendorData.innerHTML = "";
    profDiv.hidden = true;
    bookDiv.hidden = true;
    serviceData.hidden = false;
    categorydata.hidden = false;
    const node = template.cloneNode(true);
    node.innerHTML = `     
    Create Category: <input id="new" class="form-control" type="text" />
    <button type="button" id="add" >Add Category</button>
    <select name="cars" id="allCat" hidden></select>
    `;
    categorydata.append(node.content);
    const catName = document.getElementById('new');
    const push = document.getElementById('add');
    const select = document.getElementById('allCat');
    push.addEventListener('click', async () => {
        const res = await axios.post(`${window.location.origin}/api/category`, {
            categoryName: catName.value
        }, {
            headers: {
                Authorization: tkn,
            }
        })
        alert(`${catName.value} added!`);
    })
}

const addService = async (catName, id) => {
    try {
        console.log('CREATE CAT!!')
        serviceData.innerHTML = "";
        categorydata.innerHTML = "";
        vendorData.innerHTML = "";
        profDiv.hidden = true;
        bookDiv.hidden = true;
        serviceData.hidden = false;
        categorydata.hidden = false;
        const node = template.cloneNode(true);
        node.innerHTML = `     
            Create Service: <input id="new" class="form-control" type="text" />
            servicePrice: <input id="servicePrice" class="form-control" type="text" />
            serviceDescription: <input id="serviceDescription" class="form-control" type="text" />
            serviceTime: <input id="serviceTime" class="form-control" type="text" />
            <button type="button" id="add" >Add Service</button>
            <select name="cars" id="allCat" hidden></select>
        `;
        categorydata.append(node.content);
        const catName = document.getElementById('new');
        const servicePrice = document.getElementById('servicePrice');
        const serviceDescription = document.getElementById('serviceDescription');
        const serviceTime = document.getElementById('serviceTime');
        const push = document.getElementById('add');
        const select = document.getElementById('allCat');
        console.log('SERVICE START')
        select.hidden = false;
        const c = await axios.get(`${window.location.origin}/api/category/`, {      // GET ALL CATEGORIES
            headers: {
                Authorization: tkn,
            },
        })
        c.data.data.forEach(el => {
            const option = document.createElement('option');
            option.text = el.categoryName;
            option.value = el._id;
            select.add(option);
        })
        push.addEventListener('click', async () => {
            const id = select.options[select.selectedIndex].value;
            console.log(servicePrice.value,
                serviceDescription.value,
                serviceTime.value);
            const res = await axios.post(`${window.location.origin}/api/service/${id}`, {
                serviceName: catName.value,
                servicePrice: servicePrice.value,
                serviceDescription: serviceDescription.value,
                serviceTime: serviceTime.value
            }, {
                headers: {
                    // Stactic token, replace with 'tkn'
                    Authorization: tkn,
                }
            })
            alert(`${catName.value} added with it's details!`);
        })
    } catch (err) {
        console.log(err);
    }
}
const getAllUsers = async () => {
    try {
        const res = await axios.get(`${window.location.origin}/api/user`, {
            headers: {
                Authorization: tkn,
            },
        });
        bookDiv.innerHTML = "";
        const node = template.cloneNode(true);
        node.innerHTML = `<table id="customers">
    <tr>
      <th>createdAt</th>
      <th>isActive</th>
      <th>isBelongToService</th>
      <th>updatedAt</th> 
      <th>userAddress</th>
      <th>userEmail</th>
      <th>userMobile</th>
      <th>userName</th>
      <th>userRole</th>
    </tr> 
  </table>`
        bookDiv.append(node.content);
        res.data.data.users.forEach((el) => {
            if (!el.isBelongToService) {
                el.isBelongToService = false;
                if (!el.updatedAt) {
                    el.updatedAt = false;
                }
            }
            console.log(el)
            const node1 = template.cloneNode(true);
            node1.innerHTML = `<tr>
        <td>${el.createdAt}</td>
        <td>${el.isActive}</td>
        <td>${el.isBelongToService}</td>
        <td>${el.updatedAt}</td>
        <td>${el.userAddress}</td>
        <td>${el.userEmail}</td>
        <td>${el.userMobile}</td>
        <td>${el.userName}</td>
        <td>${el.userRole}</td>
      </tr>`;
            document.querySelector("#customers").appendChild(node1.content);
        });
    } catch (err) {
        console.log(err)
    }
}

const getAllBookings = async () => {
    const res = await axios.get(`${window.location.origin}/api/booking`, {
        headers: {
            Authorization: tkn,
        },
    });
    if (res.data.status === "success") {
        bookDiv.innerHTML = "";
        const node = template.cloneNode(true);
        node.innerHTML = `<table id="customers">
        <tr>
          <th>bookingStatus</th>
          <th>createdAt</th>
          <th>service</th> 
          <th>vendor</th>
          <th>user</th>
          <th>bookingDate</th>
          <th>bookingTime</th>
          <th>qty</th>
          <th>totalPrice</th>
        </tr> 
      </table>`
        bookDiv.append(node.content);
        res.data.Bookings.forEach((el) => {
            if (!el.serviceId) {
                el.serviceId.serviceName = 'deleted';
                el.totalPrice = 0;
            }
            console.log(el.userId.userName)
            const node1 = template.cloneNode(true);
            node1.innerHTML = `<tr>
            <td>${el.bookingStatus}</td>
            <td>${el.createdAt}</td>
            <td>${el.serviceId.serviceName}</td>
            <td>${el.vendorId.userName}</td>
            <td>${el.userId.userName}</td>
            <td>${el.bookingDate}</td>
            <td>${el.bookingTime}</td>
            <td>${el.qty}</td>
            <td>${el.totalPrice}</td>
          </tr>`;
            document.querySelector("#customers").appendChild(node1.content);
        });
    } else {
        alert(res.data.message);
    }
}

// EVENT LISTENERS

createCategory.addEventListener('click', newCategory);
createService.addEventListener('click', addService);
getUser.addEventListener('click', () => {
    bookDiv.hidden = false;
    getAllUsers()
});
getAllBooking.addEventListener('click', () => {
    bookDiv.hidden = false;

    getAllBookings()
})