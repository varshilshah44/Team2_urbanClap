const service = require("../models/serviceModel");
const category = require("../models/categoryModel");

exports.checkCategory = (categoryid) => {
  return category.findById(categoryid);
};

exports.create = (body) => {
  return service.create(body);
};

exports.update = (id, body) => {
  return service.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
};

exports.getAll = (categoryid) => {
  return service
    .find(
      { categoryId: categoryid },
      "serviceName servicePrice serviceDescription serviceTime vendorId"
    )
    .populate("vendorId", "userName -_id");
};

exports.getVendors = (id) => {
  return service
    .findById(id, "vendorId")
    .select("-_id")
    .populate("vendorId", "userName userMobile userAddress _id");
};

exports.findServiceByVendor = (vendorid) => {
  return service.find({ vendorId: vendorid});
}

exports.removeVendorIntoService = (serviceid,vendorid) => {
    return service.findByIdAndUpdate(      
      serviceid,
      { $pull: { vendorId:vendorid } },
      { new: true, runValidators: false }
    );
}

exports.addVendorIntoService = (serviceid,vendorid) => {
  return service.findByIdAndUpdate(
    serviceid,
    { $push: { vendorId:vendorid} },
    {
      new: true,
      runValidators: false,
    }
  );
}


exports.remove = (id) => {
    return service.findByIdAndDelete(id);
}