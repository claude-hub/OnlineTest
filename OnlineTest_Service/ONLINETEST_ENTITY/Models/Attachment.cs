using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class Attachment
    {
        public int Id { get; set; }
        public string Avatar { get; set; }
        public int AvatarType { get; set; }
        public int OwnerId { get; set; }
    }
}
