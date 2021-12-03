using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;
using TMS_API.Attributes;
using TMS_API.Services;
namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private AuthService _authService = new AuthService();
        private ConnectionService _connectionService = new ConnectionService();
        [Authorization]
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            string userId = (string)HttpContext.Items["User"];
            if (!_authService.IsAdmin(userId))
            {
                return new List<Employee>();
            }

            _connectionService.Connect();
            string query = "SELECT name_first, name_last, occupation, email, address, phone_number, date_of_birth, date_of_hire FROM employee";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Employee> employee = new List<Employee>();

            while (rdr.Read())
            {
                employee.Add(new Employee(rdr.GetString(0), rdr.GetString(1), rdr.GetString(2), rdr.GetString(3), rdr.GetString(4), rdr.GetString(5), rdr.GetDateTime(6), rdr.GetDateTime(7)));
            }

            return employee;
        }

        [Route("delete/{fullName}")]
        [Authorization]
        [HttpDelete]
        public void DeleteEmployee(string fullName)
        {
            string userId = (string)HttpContext.Items["User"];
            if (!_authService.IsAdmin(userId))
            {
                return;
            }

            var names = fullName.Split(' ');
            string firstName = names[0];
            string lastName = names[1];

            _connectionService.Connect();

            MySqlTransaction myTrans;
            myTrans = _connectionService.Connection.BeginTransaction();

            string query1 = "DELETE FROM time_entry WHERE employee_id=(SELECT id FROM employee WHERE name_first=@firstNameEntry AND name_last=@lastNameEntry)";
            string query2 = "DELETE FROM timesheet WHERE employee_id=(SELECT id FROM employee WHERE name_first=@firstNameTimesheet AND name_last=@lastNameTimesheet)";
            string query3 = "DELETE FROM login_information WHERE employee_id=(SELECT id FROM employee WHERE name_first=@firstNameLogin AND name_last=@lastNameLogin)";
            string query4 = "DELETE FROM employee WHERE name_first=@firstNameEmployee AND name_last=@lastNameEmployee";

            MySqlCommand cmd1 = new MySqlCommand(query1, _connectionService.Connection, myTrans);
            cmd1.Parameters.Add("@firstNameEntry", MySqlDbType.VarChar, 20).Value = firstName;
            cmd1.Parameters.Add("@lastNameEntry", MySqlDbType.VarChar, 20).Value = lastName;

            cmd1.ExecuteNonQuery();

            MySqlCommand cmd2 = new MySqlCommand(query2, _connectionService.Connection, myTrans);
            cmd2.Parameters.Add("@firstNameTimesheet", MySqlDbType.VarChar, 20).Value = firstName;
            cmd2.Parameters.Add("@lastNameTimesheet", MySqlDbType.VarChar, 20).Value = lastName;

            cmd2.ExecuteNonQuery();

            MySqlCommand cmd3 = new MySqlCommand(query3, _connectionService.Connection, myTrans);
            cmd3.Parameters.Add("@firstNameLogin", MySqlDbType.VarChar, 20).Value = firstName;
            cmd3.Parameters.Add("@lastNameLogin", MySqlDbType.VarChar, 20).Value = lastName;

            cmd3.ExecuteNonQuery();

            MySqlCommand cmd4 = new MySqlCommand(query4, _connectionService.Connection, myTrans);
            cmd4.Parameters.Add("@firstNameEmployee", MySqlDbType.VarChar, 20).Value = firstName;
            cmd4.Parameters.Add("@lastNameEmployee", MySqlDbType.VarChar, 20).Value = lastName;

            cmd4.ExecuteNonQuery();

            myTrans.Commit();
        }
    }
    
   
}