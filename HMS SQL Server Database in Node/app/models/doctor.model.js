const { poolPromise } = require("../../config/database");

exports.create = async (data) => {
  const pool = await poolPromise;

  const rs = await pool.request().query(`INSERT INTO Doctor
                VALUES (${data.doctor_id},'${data.qualification}',${data.patient_id},${data.employee_id})`);

  return rs.rowsAffected;
};

exports.read = async () => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .query(
      `SELECT doctor_id,Doctor.employee_id,employee_name,qualification,patient_id From Employee INNER JOIN  Doctor ON Employee.employee_id=Doctor.employee_id`
    );

  return rs.recordset;
};

exports.getAll = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`SELECT COUNT(*) AS COUNT From Doctor`);

  return rs.recordset;
};

exports.getDoctorFromEmp = async () => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .query(
      `SELECT Employee.employee_id,employee_name,emp_type From Employee Where Employee.emp_type='Doctor'`
    );

  return rs.recordset;
};

exports.delete = async (doctor_id, data) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .query(
      `DELETE FROM Doctor WHERE doctor_id = ${doctor_id} AND patient_id = ${data.patient_id}`
    );

  return rs.rowsAffected;
};

exports.readById = async (doctor_id) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .query(`SELECT * FROM Doctor WHERE doctor_id =${doctor_id}`);

  return rs.recordset;
};
