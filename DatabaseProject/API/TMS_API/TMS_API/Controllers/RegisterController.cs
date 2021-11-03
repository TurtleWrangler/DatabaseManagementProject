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
        public void Register()
        {
            Connection.Open();
            string sql = "INSERT INTO department (id,name) VALUES('111111111111111111111111111111111111','Humans')";
            MySqlCommand cmd = new MySqlCommand(sql, Connection);
            cmd.ExecuteNonQuery();
        }
    }
}
