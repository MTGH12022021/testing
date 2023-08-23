import uuid
import random
import faker
import os

# Initialize faker
fake = faker.Faker()

# Generate data for department
department_data = []
department_id = 99
employee_quantity = 10000
employee_id = 1
employee_data = []

for i in range(20):
    data = {
        "id" : department_id,
        "name": fake.job(),
        "unit_id": str(uuid.uuid4()),
        "description": fake.paragraph(nb_sentences=1),
        "lft": random.randint(0, 100),
        "rgt": random.randint(0, 100),
        "level": random.randint(1, 10) 
    }
    department_data.append(data)

    department_id += 1
sql_statements = [
    f"INSERT INTO ohrm_subunit (id, name, unit_id, description, lft, rgt, level) VALUES ({department['id']}, '{department['name']}', '{department['unit_id']}', '{department['description']}', {department['lft']}, {department['rgt']}, {department['level']});"
    for department in department_data
]

with open("department.sql", "w") as file:
    file.write("USE orangehrm_mysql;\n\n")
    file.write('\n'.join(sql_statements))
print("Success")
# Generate data for employee table
for department in department_data:
    for _ in range(100):
        lastname = fake.last_name()
        firstname = fake.first_name()
        address = fake.address()
        data = {
            "employee_id": employee_id,
            "emp_number": employee_id,
            "emp_firstname": firstname,
            "emp_lastname": lastname,
            "work_station": department["id"],
            "emp_street": address,
            "emp_work_email": f"{lastname.lower()}.{firstname.lower()}@gmail.com"
        }  
        employee_data.append(
            data
        )

        employee_id+= 1

sql_statements = [
    f"INSERT INTO hs_hr_employee (emp_number, employee_id, emp_lastname, emp_firstname, work_station, emp_street1, emp_work_email) VALUES ({employee['emp_number']}, {employee['employee_id']}, '{employee['emp_lastname']}', '{employee['emp_firstname']}', '{employee['work_station']}', '{employee['emp_street']}', '{employee['emp_work_email']}');"
    for employee in employee_data
]

with open("employee.sql", "w") as file:
    file.write("USE orangehrm_mysql;\n\n")
    file.write('\n'.join(sql_statements))



print("Generate data successfully!")
