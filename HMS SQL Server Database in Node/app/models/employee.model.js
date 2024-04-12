const { poolPromise } = require('../../config/database')

exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO Employee
                VALUES (${data.employee_id},'${data.employee_name}','${data.DoB}','${data.joinning_date}','${data.emp_type}','${data.email}','${data.address}',${data.salary})`);

    return rs.rowsAffected;
}

exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT *
                FROM Employee`)

    return rs.recordset;
}

exports.getAll = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT COUNT(*) AS COUNT FROM Employee`)

    return rs.recordset;
}

exports.delete = async (employee_id) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM Employee
                WHERE employee_id = ${employee_id}`)

    return rs.rowsAffected;
}

exports.readById = async(employee_id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT * FROM Employee WHERE employee_id =${employee_id}`);
    
            return rs.recordset;
}