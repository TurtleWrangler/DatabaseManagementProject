using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using MySql.Data.MySqlClient;
using TMS_API.Services;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private ConnectionService _connectionService = new ConnectionService();

        [HttpGet]
        public IEnumerable<Department> GetDepartments()
        {
            _connectionService.Connect();
            string query = "SELECT * FROM department";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Department> depts = new List<Department>();

            while (rdr.Read())
            {
                depts.Add(new Department(rdr.GetString(0), rdr.GetString(1)));
            }

            return depts;
        }
    }
}