const { poolPromise } = require('../../config/database')

exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO Patient
                VALUES (${data.patient_id},'${data.patient_name}','${data.phone_no}','${data.blood_group}','${data.email}','${data.gender}','${data.address}','${data.disease}','${data.arrival_date}','${data.discharge_date}')`);

    return rs.rowsAffected;
}

exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT *
                FROM Patient`)

    return rs.recordset;
}

exports.getAll = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT COUNT(*) AS COUNT FROM Patient`)

    return rs.recordset;
}

exports.delete = async (patient_id) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM Patient
                WHERE patient_id = ${patient_id}`)

    return rs.rowsAffected;
}

exports.readById = async(patient_id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT * FROM Patient WHERE patient_id =${patient_id}`);
    
            return rs.recordset;
}

exports.readByName = async (patient_name) => {
    const pool = await poolPromise;
    console.log(patient_name);
    const rs = await pool
        .request()
        .query(`SELECT * FROM Patient WHERE patient_name ='${patient_name}'`);

    return rs.recordset;
}