using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS_API.Services
{
    public class AuthService
    {
        private ConnectionService _connectionService = new ConnectionService();
        public bool IsAdmin(string id)
        {
            _connectionService.Connect();
            string query = "SELECT employee_id, is_manager FROM login_information WHERE employee_id = @id LIMIT 1;";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);
            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = id;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            LoginInformation info = new LoginInformation();

            while (rdr.Read())
            {
                info.EmployeeID = rdr.GetString(0);
                info.IsManager = rdr.GetString(1) == "1" ? true : false;
            }

            return info.IsManager;
        }
    }
}
