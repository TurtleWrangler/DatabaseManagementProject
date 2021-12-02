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
        private ConnectionService _connectionService = new ConnectionService();
        [Authorization]
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
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
            var names = fullName.Split(' ');
            string firstName = names[0];
            string lastName = names[1];

            _connectionService.Connect();
            string query1 = "SELECT id FROM employee WHERE name_first = @firstName AND name_last = @lastName";
            MySqlCommand cmd1 = new MySqlCommand(query1, _connectionService.Connection);

            cmd1.Parameters.Add("@firstName", MySqlDbType.VarChar, 20).Value = firstName;
            cmd1.Parameters.Add("@lastName", MySqlDbType.VarChar, 20).Value = lastName;

            using MySqlDataReader rdr1 = cmd1.ExecuteReader();

            List<EmployeeID> id = new List<EmployeeID>();

            while (rdr1.Read())
            {
                id.Add(new EmployeeID(rdr1.GetString(0)));
            }

            string query2 = "DELETE FROM login_information WHERE eId = @id";
            MySqlCommand cmd2 = new MySqlCommand(query2, _connectionService.Connection);

            cmd2.Parameters.Add("@id", MySqlDbType.VarChar, 20).Value = id[0].ID;

            using MySqlDataReader rdr2 = cmd2.ExecuteReader();

            string query3 = "DELETE FROM time_entry WHERE employee_id = @id";
            MySqlCommand cmd3 = new MySqlCommand(query3, _connectionService.Connection);

            cmd3.Parameters.Add("@id", MySqlDbType.VarChar, 20).Value = id[0].ID;

            using MySqlDataReader rdr3 = cmd3.ExecuteReader();

            string query4 = "DELETE FROM timesheet WHERE employee_id = @id";
            MySqlCommand cmd4 = new MySqlCommand(query4, _connectionService.Connection);

            cmd4.Parameters.Add("@id", MySqlDbType.VarChar, 20).Value = id[0].ID;

            using MySqlDataReader rdr4 = cmd4.ExecuteReader();
        }
    }
}