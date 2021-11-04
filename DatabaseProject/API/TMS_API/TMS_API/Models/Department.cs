using System;

namespace TMS_API
{
    public class Department
    {
        internal Department(string id, string name)
        {
            ID = id;
            Name = name;
        }

        public string ID { get; set; }

        public string Name { get; set; }
    }
}
