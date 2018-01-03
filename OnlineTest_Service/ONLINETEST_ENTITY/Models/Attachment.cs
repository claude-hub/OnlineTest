using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class Attachment
    {
        public int Id { get; set; }
        public string Avatar { get; set; }
        public int AvatarType { get; set; }
        public int OwnerId { get; set; }
    }
}
