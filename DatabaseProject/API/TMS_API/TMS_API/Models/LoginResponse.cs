namespace TMS_API.Models
{
    public class LoginResponse
    {
        public LoginResponse() { }
        public LoginResponse(string result, string username, string employeeID, bool isManager, string token)
        {
            Result = result;
            Username = username;
            EmployeeID = employeeID;
            IsManager = isManager;
            Token = token;
        }
        public string Result { get; set; }
        public string Username { get; set; }

        public string EmployeeID { get; set; }

        public bool IsManager { get; set; }
        
        public string Token { get; set; }
    }
}
