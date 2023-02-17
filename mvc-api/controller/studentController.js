const studentModel = require("../model/studentModel");

function getStudentData(){

    let JsonResponse = {};

    JsonResponse.code = 201;
    JsonResponse.status = true;
    JsonResponse.message = "Student Records Found";
    JsonResponse.error = false;
    JsonResponse.data = studentModel.students;

    return JsonResponse;
}

module.exports = {
    getStudentData : getStudentData
}