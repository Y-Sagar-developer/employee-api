import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";  // Import the Salary model
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
    try {
        // Get the total number of employees
        const totalEmployees = await Employee.countDocuments();

        // Get the total number of departments
        const totalDepartments = await Department.countDocuments();

        // Calculate total salary from Salary collection (not Employee)
        const totalSalaries = await Salary.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$netSalary" } } }
        ]);

        // Get the total leave information
        const employeeAppliedForLeave = await Leave.distinct("employeeId");
        const leaveStatus = await Leave.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approvedCount: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejectedCount: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pendingCount: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        };

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,  // Make sure to send the correct total salary
            leaveSummary
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "dashboard summary error" });
    }
};

export { getSummary };
