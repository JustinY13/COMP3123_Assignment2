const express = require("express")
const EmployeeModel = require("../modules/employee")
const routes = express.Router()


//Get Employee By ID
routes.get("/emp/employees/:employeeid", (req, res) => {
    
    EmployeeModel.findById(req.params.employeeid).then((employee) => {
        if (employee) {
            res.send(employee)
        } else {
            res.status(404).send({message: "Employee not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
})

//Get All Employees
routes.get("/emp/employees", (req, res) => {
    EmployeeModel.find().then((employee) => {
        res.send(employee)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
})

//Add NEW Employees
routes.post("/emp/employees", async (req, res) => {
    const employeeData = req.body
    try {
        const Employee = new EmployeeModel(employeeData)
        const newEmployees = await Employee.save()
        res.send({message: "Employee created successfully.",employeeData})
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})


//Update existing employee By Id
routes.put("/emp/employees/:employeeid", (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.params.employeeid, req.body, {new: true}).
        then((employee) => {
            if(employee) {
                res.send({message: "Employee details updated successfully.", employee})
            } else {
                res.status(404).send({message: "Update Failed - Employee not found"})
            }
        }).catch((err) => {
            res.status(500).send({message: err.message})
        })
})


//Delete Book By ID
routes.delete("/emp/employees/:employeeid", (req, res) => {
    EmployeeModel.findByIdAndDelete(req.params.employeeid).then((employee) => {
        if(employee) {
            res.send({message: "Employee deleted successfully.", employee})
        } else {
            res.status(404).send({message: "Delete Failed - Employee not found"})
        }
    }).catch ((err) => {
        res.status(500).send({message: err.message})
    })
})

module.exports = routes