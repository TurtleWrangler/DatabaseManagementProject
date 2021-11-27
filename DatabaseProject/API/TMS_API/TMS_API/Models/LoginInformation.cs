using System;

namespace TMS_API
{
    public class LoginInformation
    {
        public LoginInformation() { }
        public LoginInformation(string username, string employeeID, string password, bool isManager)
        {
            Username = username;
            EmployeeID = employeeID;
            Password = password;
            IsManager = isManager;
        }
        public string Username { get; set; }

        public string EmployeeID { get; set; }

        public string Password { get; set; }

        public bool IsManager { get; set; }
    }
}
