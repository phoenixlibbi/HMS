const { poolPromise } = require('../../config/database')

exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO Nurse
                VALUES (${data.nurse_id},${data.patient_id},${data.employee_id})`);

    return rs.rowsAffected;
}

exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT nurse_id,Nurse.employee_id,employee_name,patient_id From Employee INNER JOIN  Nurse ON Employee.employee_id=Nurse.employee_id`)

    return rs.recordset;
}

exports.getAll = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT COUNT(*) AS COUNT From Nurse`)

    return rs.recordset;
}

exports.getNurseFromEmp = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT Employee.employee_id,employee_name,emp_type From Employee Where Employee.emp_type='Nurse'`)

    return rs.recordset;
}

exports.delete = async (nurse_id,data) => {
    console.log(nurse_id,data)
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM Nurse WHERE nurse_id = ${nurse_id} AND patient_id=${data.patient_id}`)

    return rs.rowsAffected;
}

exports.readById = async(nurse_id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT * FROM Nurse WHERE nurse_id =${nurse_id}`);
    
            return rs.recordset;
}