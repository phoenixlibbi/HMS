const { poolPromise } = require('../../config/database')

exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO Room
                VALUES (${data.room_id},'${data.room_type}',${data.patient_id},${data.room_cost})`)

    return rs.rowsAffected;
}

exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT *
                FROM Room`)

    return rs.recordset;
}

exports.update = async (room_id,data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`UPDATE Room SET
                room_cost = '${data[0].room_cost}'                    
                WHERE room_id = ${room_id}`);

    return rs.rowsAffected;
}

exports.delete = async (room_id) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM Room
                WHERE room_id = ${room_id}`)

    return rs.rowsAffected;
}

exports.readById = async(room_id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT * FROM Room WHERE room_id =${room_id}`);
    
            return rs.recordset;
}