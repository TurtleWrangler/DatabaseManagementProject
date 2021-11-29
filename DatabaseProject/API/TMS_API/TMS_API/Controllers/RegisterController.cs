using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;
using TMS_API.Utilities;
using TMS_API.Services;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        ConnectionService _connectionService = new ConnectionService();

        [HttpPost]
        public void Register(Employee employee)
        {
            _connectionService.Connect();

            try
            {
                MySqlTransaction myTrans;
                myTrans = _connectionService.Connection.BeginTransaction();

                employee.ID = Guid.NewGuid().ToString();

                string query = "INSERT INTO employee VALUES(@id, @dept_id, @name_first, @name_last, @occupation, @email, @address, @phone_number, @date_of_birth, @date_of_hire, @date_of_dismissal)";
                MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection, myTrans);
                cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = employee.ID;
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

                cmd.CommandText = "INSERT INTO login_information VALUES(@email, @id, @password, @is_manager)";
                cmd.Parameters.Add("@password", MySqlDbType.VarChar, 255).Value = PasswordHashing.Hash(employee.Password);
                cmd.Parameters.Add("@is_manager", MySqlDbType.Int16, 1).Value = 0;
                cmd.ExecuteNonQuery();

                myTrans.Commit();
            }
            catch (Exception ex)
            {
                Console.WriteLine("An exception of type " + ex.GetType() + " was encountered while inserting the data.");
                Console.WriteLine("Neither record was written to database.");
                Console.WriteLine(ex.Message);
            }
        }
    }
}
