const { poolPromise } = require("../../config/database");

exports.create = async (data) => {
  const pool = await poolPromise;

  const rs = await pool.request().query(`INSERT INTO Test
                VALUES (${data.test_id},'${data.test_name}',${data.test_cost},'${data.date}',${data.patient_id})`);

  return rs.rowsAffected;
};

exports.read = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`SELECT *
                FROM Test`);

  return rs.recordset;
};

exports.update = async (test_id, data) => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`UPDATE Test SET
                test_cost = '${data[0].test_cost}'                    
                WHERE test_id = ${test_id}`);

  return rs.rowsAffected;
};

exports.delete = async (test_id,data) => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`DELETE FROM Test
                WHERE test_id = ${test_id} AND patient_id=${data.patient_id}`);

  return rs.rowsAffected;
};

exports.readById = async (test_id) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .query(`SELECT * FROM Test WHERE test_id =${test_id}`);

  return rs.recordset;
};
