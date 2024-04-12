const { poolPromise } = require('../../config/database')

exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO Medicine
                VALUES (${data.medicine_id},'${data.medicine_name}',${data.quantity},'${data.date}','${data.medicine_cost}',${data.patient_id})`);

    return rs.rowsAffected;
}

exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT *
                FROM Medicine`)

    return rs.recordset;
}

exports.delete = async (medicine_id,data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM Medicine
                WHERE medicine_id = ${medicine_id} AND patient_id = ${data.patient_id}`)

    return rs.rowsAffected;
}

exports.readById = async(medicine_id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT * FROM Medicine WHERE medicine_id =${medicine_id}`);
    
            return rs.recordset;
}