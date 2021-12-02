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
        }
    }
}