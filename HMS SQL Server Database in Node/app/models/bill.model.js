const { poolPromise } = require("../../config/database");

exports.create = async (data) => {
  const pool = await poolPromise;

  const rs = await pool.request().query(`INSERT INTO Bill
                VALUES (${data.payment_id},'${data.date}',${data.room_cost},${data.othercharge},${data.mecost},${data.Total},${data.patient_id})`);

  return rs.rowsAffected;
};

exports.createById = async (payment_id) => {
  const pool = await poolPromise;
  const rs = await pool.request()
    .query(`INSERT INTO Bill(payment_id, date, room_cost, othercharge, mcost, Total, patient_id)
            SELECT 
                (SELECT COALESCE(MAX(payment_id)+1,0) FROM Bill) as payment_id, -- generate new payment_id
                GETDATE() as date,
                SUM(Room.room_cost) as room_cost, 
                SUM(Test.test_cost) as othercharge, 
                SUM(Medicine.medicine_cost) as mcost, 
                SUM(Room.room_cost) + SUM(Medicine.medicine_cost) + SUM(Test.test_cost) as Total, -- sum all costs
                Patient.patient_id
            FROM 
                Patient 
                LEFT JOIN Medicine ON Patient.patient_id = Medicine.patient_id
                LEFT JOIN Room ON Patient.patient_id = Room.patient_id
                LEFT JOIN Test ON Patient.patient_id = Test.patient_id
                LEFT JOIN Doctor ON Patient.patient_id = Doctor.patient_id
                LEFT JOIN Nurse ON Patient.patient_id = Nurse.patient_id
                LEFT JOIN Employee ON (Doctor.employee_id = Employee.employee_id OR Nurse.employee_id = Employee.employee_id)
            WHERE
                Patient.patient_id = ${payment_id} 
            GROUP BY
                Patient.patient_id;`);

  return rs.rowsAffected;
};

exports.read = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`SELECT B.*, P.patient_name
        FROM Bill B
        INNER JOIN Patient P ON B.patient_id = P.patient_id`);

  return rs.recordset;
};

exports.delete = async (payment_id) => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`DELETE FROM Bill
                WHERE payment_id = ${payment_id}`);

  return rs.rowsAffected;
};

exports.readById = async (payment_id) => {
  const pool = await poolPromise;
  const rs = await pool.request().query(`SELECT B.*, P.patient_name
            FROM Bill B
            INNER JOIN Patient P ON B.patient_id = P.patient_id WHERE payment_id =${payment_id}`);

  return rs.recordset;
};
