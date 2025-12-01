let express = require('express');
const { enquiryDelete, enquiryInsert, enquiryList, enquiryUpdate } = require('../../controller/admin/web/userEnquiryController');
let enquiryRoutes = express.Router();
enquiryRoutes.post('/enquiry-insert',enquiryInsert)
enquiryRoutes.get("/enquiry-list",enquiryList)
enquiryRoutes.delete("/enquiry-delete/:id",enquiryDelete)
enquiryRoutes.put("/enquiry-update/:id",enquiryUpdate)
module.exports = enquiryRoutes;