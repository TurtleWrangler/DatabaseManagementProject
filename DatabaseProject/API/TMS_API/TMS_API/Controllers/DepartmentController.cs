using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using MySql.Data.MySqlClient;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private static MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");
        [HttpGet]
        public string GetDepartments()
        {
            Connection.Open();
            string query = "SELECT * FROM department";
            MySqlCommand cmd = new MySqlCommand(query, Connection);

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Department> depts = new List<Department>();

            while (rdr.Read())
            {
                Console.WriteLine(rdr.GetString(1));
                depts.Add(new Department(rdr.GetString(0), rdr.GetString(1)));
            }

            Connection.Close();
            return JsonSerializer.Serialize(depts);
        }
    }
}