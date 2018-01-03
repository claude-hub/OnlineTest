﻿using OnlineTest_Core.Communicate;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Application.Communicate
{
    public class CommunicateAppService : ICommunicateAppService
    {
        private readonly CommunicateService _communicateService = new CommunicateService();
        public bool CreateArticle(int uId, string title, string content, string label)
        {
            return _communicateService.CreateArticle(uId, title, content, label);
        }
    }
}
