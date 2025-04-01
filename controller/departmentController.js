import Department from "../models/Department.js";
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get departent server error" });
  }
};
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new Department({
      dep_name,
      description,
    });
    await newDepartment.save();
    return res.status(200).json({ success: true, department: newDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error while fetching department" });
  }
};
const updateDepartement=async(req,res)=>{
try{
  const {id}=req.params
  const {dep_name,description}=req.body
  const updateDep=await Department.findByIdAndUpdate({_id:id},{
    dep_name,
    description
  })
  
  return res.status(200).json({ success: true, updateDepartement });
} catch (error) {
  return res.status(500).json({ success: false, error: "edit department Server error " });
}
}
const deleteDepartement=async(req,res)=>{
  try{
    const {id}=req.params
    const deletedep=await Department.findById({_id:id})
    await deletedep.deleteOne()
    
    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "delete department Server error " });
  }
}

export { addDepartment, getDepartments, getDepartment,updateDepartement,deleteDepartement };

