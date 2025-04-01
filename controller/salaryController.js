// import Salary from "../models/Salary.js"
// const addSalary =async (req,res)=>{

//     try{
//         const {employeeId,basicSalary,allowances,deductions,payDate}=req.body

//         const totalSalary =parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions)
//         const newSalary = new Salary({
//             employeeId,
//             basicSalary,
//             allowances,
//             deductions,
//             netSalary:totalSalary,
//             payDate
//         })
//         await newSalary.save()
//         return res.status(200)/json({success:true})
//     }
//     catch(erroe){
//         return res.status(500).json({success:false,error:"salary add server error"})
//     }
// }

// export {addSalary}

import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    // Validate request body
    if (!employeeId || !basicSalary || !allowances || !deductions || !payDate) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Ensure numerical values are correctly parsed
    const salary = parseFloat(basicSalary);
    const allow = parseFloat(allowances);
    const deduct = parseFloat(deductions);

    if (isNaN(salary) || isNaN(allow) || isNaN(deduct)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid numeric values" });
    }

    const totalSalary = salary + allow - deduct;

    const newSalary = new Salary({
      employeeId,
      basicSalary: salary,
      allowances: allow,
      deductions: deduct,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res
      .status(200)
      .json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error adding salary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Salary add server error" });
  }
};
const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    // console.log(role)
    let salary
    if(role === "admin"){

      salary = await Salary.find({ employeeId: id }).populate(
       "employeeId",
       "employeeId"
     );
    }
   else {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Salary get server error" });
  }
};

export { addSalary, getSalary };
