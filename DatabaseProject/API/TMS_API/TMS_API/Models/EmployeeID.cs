using System;

namespace TMS_API
{
    public class EmployeeID
    {
        internal EmployeeID(string id)
        {
            ID = id;
        }
        public string ID { get; set; }
    }
}
