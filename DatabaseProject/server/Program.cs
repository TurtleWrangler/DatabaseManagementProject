using System;
using System.Data;

using MySql.Data;
using MySql.Data.MySqlClient;

namespace server
{
    public class MySqlConn
    {
        public static void Main()
        {
            string connStr = "server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                Console.WriteLine("Connecting to MySQL...");
                conn.Open();
                while(true)
                {

                }

                // string sql = "SELECT * FROM employee";
                // string sql = "INSERT INTO department (id, name) VALUES ('351522866665868872725195888142226895','Human Resources')";
                // MySqlCommand cmd = new MySqlCommand(sql, conn);
                // MySqlDataReader rdr = cmd.ExecuteReader();

                // while (rdr.Read())
                // {
                //     Console.WriteLine(rdr[0] + " -- " + rdr[1]);
                // }
                // rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                conn.Close();
            }

            // conn.Close();
            // Console.WriteLine("Done.");
        }
    }
}

