CREATE TABLE Employee
([employee_id] [int] NOT NULL PRIMARY KEY,
[employee_name] [varchar](max) NOT NULL,
[DoB] [date] NOT NULL,
[joinning_date] [date] NOT NULL,
[emp_type] [varchar](max) NOT NULL,
[email] [varchar](max) NOT NULL,
[address] [varchar](max) NOT NULL,
[salary] [int] NOT NULL
);

CREATE OR ALTER PROCEDURE InsertEmployee
    @employee_id int,
    @employee_name varchar(max),
    @DoB date,
    @joinning_date date,
    @emp_type varchar(max),
    @email varchar(max),
    @address varchar(max),
    @salary int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Employee
    VALUES (@employee_id, @employee_name, @DoB, @joinning_date, @emp_type, @email, @address, @salary);
END

EXEC InsertEmployee 
    @employee_id = 764,
    @employee_name = 'Nouman',
    @DoB = '1990-01-01',
    @joinning_date = '2021-01-01',
    @emp_type = 'Doctor',
    @email = 'nouman@gmail.com.com',
    @address = 'Lahore',
    @salary = 50000;


CREATE PROCEDURE get_employee_by_id
    @employee_id INT
AS
BEGIN
    SELECT * FROM Employee WHERE employee_id = @employee_id
END

EXEC get_employee_by_id @employee_id = 123

CREATE PROCEDURE delete_employee
    @employee_id INT
AS
BEGIN
    DELETE FROM Employee WHERE employee_id = @employee_id;
END

EXEC delete_employee @employee_id = 12345;

CREATE TABLE Patient
([patient_id] [int] NOT NULL PRIMARY KEY,
[patient_name] [varchar](max) NOT NULL,
[phone_no] [varchar](max) NOT NULL,
[blood_group] [varchar](max) NOT NULL,
[email] [varchar](max) NOT NULL,
[gender] [varchar](max) NOT NULL,
[address] [varchar](max) NOT NULL,
[disease] [varchar](max) NOT NULL,
[arrival_date] [date] NOT NULL,
[discharge_date] [date] NOT NULL
);

CREATE PROCEDURE InsertPatient
    @patient_id INT,
    @patient_name VARCHAR(50),
    @phone_no VARCHAR(20),
    @blood_group VARCHAR(10),
    @email VARCHAR(50),
    @gender VARCHAR(10),
    @address VARCHAR(100),
    @disease VARCHAR(50),
    @arrival_date DATE,
    @discharge_date DATE
AS
BEGIN
    INSERT INTO Patient (patient_id, patient_name, phone_no, blood_group, email, gender, address, disease, arrival_date, discharge_date)
    VALUES (@patient_id, @patient_name, @phone_no, @blood_group, @email, @gender, @address, @disease, @arrival_date, @discharge_date)
END

EXEC InsertPatient 123, 'John Smith', '1234567890', 'O+', 'john.smith@example.com', 'Male', '123 Main St, Anytown USA', 'Flu', '2021-01-01', '2021-01-05'

CREATE PROCEDURE DeletePatient
    @patient_id INT
AS
BEGIN
    DELETE FROM Patient
    WHERE patient_id = @patient_id
END

EXEC DeletePatient 123

CREATE PROCEDURE SelectPatient
    @patient_id INT
AS
BEGIN
    SELECT * FROM Patient WHERE patient_id = @patient_id
END

EXEC SelectPatient 123

CREATE TABLE Medicine
([medicine_id] [int] NOT NULL,
[medicine_name] [varchar](max) NOT NULL,
[quantity] [int] NOT NULL,[date] [date] NOT NULL,
[medicine_cost] [nchar](10) NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient],
CONSTRAINT CompKey_ID_M_P PRIMARY KEY (medicine_id,patient_id)
);



CREATE table Bill
([payment_id] [int] NOT NULL PRIMARY KEY,
[date] [date] NOT NULL,
[room_cost] [int] NOT NULL,
[othercharge] [int] NULL,
[mcost] [int] NOT NULL,
[Total] [int] NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient]
);

CREATE PROCEDURE sp_CalculateBill
    @patient_id int
AS
BEGIN
    INSERT INTO Bill(payment_id, date, room_cost, othercharge, mcost, Total, patient_id)
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
        Patient.patient_id = @patient_id
    GROUP BY
        Patient.patient_id
END

EXEC sp_CalculateBill @patient_id = ${patient_id}

CREATE PROCEDURE InsertBill
    @payment_id INT,
    @date DATE,
    @room_cost FLOAT,
    @othercharge FLOAT,
    @mecost FLOAT,
    @Total FLOAT,
    @patient_id INT
AS
BEGIN
    INSERT INTO Bill VALUES (@payment_id, @date, @room_cost, @othercharge, @mecost, @Total, @patient_id)
END

EXEC InsertBill 
    @payment_id = 12345,
    @date = '2020-10-01',
    @room_cost = 1000.00,
    @othercharge = 250.00,
    @mecost = 500.00,
    @Total = 1750.00,
    @patient_id = 67890

CREATE PROCEDURE get_bill_info()
BEGIN
    SELECT B.*, P.patient_name
    FROM Bill B
    INNER JOIN Patient P ON B.patient_id = P.patient_id;
END;

EXEC get_bill_info();

CREATE PROCEDURE delete_bill_by_payment_id(IN payment_id INT)
BEGIN
    DELETE FROM Bill
    WHERE payment_id = payment_id;
END;

EXEC delete_bill_by_payment_id(12345);

CREATE PROCEDURE get_bill_info_by_payment_id(IN payment_id INT)
BEGIN
    SELECT B.*, P.patient_name
    FROM Bill B
    INNER JOIN Patient P ON B.patient_id = P.patient_id
    WHERE payment_id = payment_id;
END;

EXEC get_bill_info_by_payment_id(12345);

CREATE TABLE Doctor
([doctor_id] [int] NOT NULL,
[qualification] [varchar](max) NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient],
[employee_id] [int] NOT NULL foreign key references [Employee],
CONSTRAINT CompKey_ID_D_P PRIMARY KEY (doctor_id,patient_id)
);

CREATE PROCEDURE InsertDoctor(@doctor_id INT, @qualification VARCHAR(50), @patient_id INT, @employee_id INT)
AS
BEGIN
    INSERT INTO Doctor VALUES (@doctor_id, @qualification, @patient_id, @employee_id)
END

EXEC InsertDoctor 1234, 'MBBS', 5678, 9012

CREATE PROCEDURE GetDoctorDetails
AS
BEGIN
    SELECT doctor_id, Doctor.employee_id, employee_name, qualification, patient_id 
    FROM Employee 
    INNER JOIN Doctor ON Employee.employee_id = Doctor.employee_id
END

EXEC GetDoctorDetails

CREATE PROCEDURE DeleteDoctor(@doctor_id INT, @patient_id INT)
AS
BEGIN
    DELETE FROM Doctor WHERE doctor_id = @doctor_id AND patient_id = @patient_id
END

EXEC DeleteDoctor 1234, 5678

CREATE PROCEDURE GetDoctorByID(@doctor_id INT)
AS
BEGIN
    SELECT * FROM Doctor WHERE doctor_id = @doctor_id
END

EXEC GetDoctorByID 1234

CREATE TABLE Nurse
([nurse_id] [int] NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient],
[employee_id] [int] NOT NULL foreign key references [Employee],
CONSTRAINT CompKey_ID_N_P PRIMARY KEY (nurse_id,patient_id)
);

CREATE TABLE Room
([room_id] [int] NOT NULL,
[room_type] [varchar](max) NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient],
[room_cost] [int] NOT NULL,
CONSTRAINT CompKey_ID_R_P PRIMARY KEY (room_id,patient_id)
);

CREATE TABLE Test([test_id] [int] NOT NULL PRIMARY KEY,
[test_name] [varchar](max) NOT NULL,
[test_cost] [int] NOT NULL,
[date] [date] NOT NULL,
[patient_id] [int] NOT NULL foreign key references [Patient]
);




INSERT INTO Bill(payment_id, date, room_cost, othercharge, mcost, Total, patient_id)
SELECT 
    (SELECT COALESCE(MAX(payment_id)+1,0) FROM Bill) as payment_id, -- generate new payment_id
    GETDATE() as date, -- get current date
    SUM(Room.room_cost) as room_cost, -- sum room costs
    SUM(Test.test_cost) as othercharge, -- sum test costs
    SUM(Medicine.medicine_cost) as mcost, -- sum medicine costs
    SUM(Room.room_cost) + SUM(Medicine.medicine_cost) + SUM(Test.test_cost) as Total, -- sum all costs
    Patient.patient_id -- select patient_id from Patient table
FROM 
    Patient 
    LEFT JOIN Medicine ON Patient.patient_id = Medicine.patient_id
    LEFT JOIN Room ON Patient.patient_id = Room.patient_id
    LEFT JOIN Test ON Patient.patient_id = Test.patient_id
    LEFT JOIN Doctor ON Patient.patient_id = Doctor.patient_id
    LEFT JOIN Nurse ON Patient.patient_id = Nurse.patient_id
    LEFT JOIN Employee ON (Doctor.employee_id = Employee.employee_id OR Nurse.employee_id = Employee.employee_id)
WHERE
    Patient.patient_id = 2 -- specify patient_id to insert the record for
GROUP BY
    Patient.patient_id;