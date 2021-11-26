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
    public class HoursController : ControllerBase
    {
        private static MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");

        [HttpPost]
        public void Hours(TimeEntry timeEntry)
        {
            Connection.Open();
            string query = "INSERT INTO time_entry VALUES(@employee_id, @date, @hours_worked, @comments, @submission_time, @week_start_date)";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.Parameters.Add("@employee_id", MySqlDbType.VarChar, 36).Value = timeEntry.EmployeeID;
            cmd.Parameters.Add("@date", MySqlDbType.Date).Value = timeEntry.Date;
            cmd.Parameters.Add("@hours_worked", MySqlDbType.Decimal).Value = timeEntry.HoursWorked;
            cmd.Parameters.Add("@comments", MySqlDbType.Text).Value = timeEntry.Comments;
            cmd.Parameters.Add("@submission_time", MySqlDbType.DateTime).Value = timeEntry.SubmissionTime;
            cmd.Parameters.Add("@week_start_date", MySqlDbType.DateTime).Value = "2021-11-01";

            cmd.ExecuteNonQuery();
            Connection.Close();
        }

        [HttpPut]
        public TimeEntry HoursUpdate(TimeEntry timeEntry)
        {
            Connection.Open();
            string query = "UPDATE time_entry SET hours_worked=" + timeEntry.HoursWorked + ", comments='" + timeEntry.Comments + "' WHERE employee_id='" + timeEntry.EmployeeID + "'";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.ExecuteNonQuery();
            Connection.Close();
            return timeEntry;
        }

        [HttpDelete]
        public void HoursDelete(TimeEntry timeEntry)
        {
            Connection.Open();
            string query = "DELETE FROM time_entry WHERE employee_id='" + timeEntry.EmployeeID + "'";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.ExecuteNonQuery();
            Connection.Close();
        }
    }
}
