using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private static MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");

        [HttpPost]
        public void Register(Employee employee)
        {
            Connection.Open();
            string query = "INSERT INTO employee VALUES(@id, @dept_id, @name_first, @name_last, @occupation, @email, @address, @phone_number, @date_of_birth, @date_of_hire, @date_of_dismissal)";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = Guid.NewGuid();
            cmd.Parameters.Add("@dept_id", MySqlDbType.VarChar, 36).Value = employee.DeptID;
            cmd.Parameters.Add("@name_first", MySqlDbType.VarChar, 20).Value = employee.FirstName;
            cmd.Parameters.Add("@name_last", MySqlDbType.VarChar, 20).Value = employee.LastName;
            cmd.Parameters.Add("@occupation", MySqlDbType.VarChar, 45).Value = employee.Occupation;
            cmd.Parameters.Add("@email", MySqlDbType.VarChar, 45).Value = employee.Email;
            cmd.Parameters.Add("@address", MySqlDbType.VarChar, 50).Value = employee.Address;
            cmd.Parameters.Add("@phone_number", MySqlDbType.VarChar, 10).Value = employee.PhoneNumber;
            cmd.Parameters.Add("@date_of_birth", MySqlDbType.Date, 36).Value = employee.DateOfBirth;
            cmd.Parameters.Add("@date_of_hire", MySqlDbType.Date, 36).Value = employee.DateOfHire;
            cmd.Parameters.Add("@date_of_dismissal", MySqlDbType.Date, 36).Value = null;

            cmd.ExecuteNonQuery();
            Connection.Close();
        }
    }
}
