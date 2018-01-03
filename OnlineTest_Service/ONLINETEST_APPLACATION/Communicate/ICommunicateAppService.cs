using System;
using System.Collections.Generic;
using System.Text;

namespace ONLINETEST_APPLICATION.Communicate
{
    public interface ICommunicateAppService
    {
        /// <summary>
        /// 创建文章
        /// </summary>
        /// <param name="uId">用户ID</param>
        /// <param name="title">文章名</param>
        /// <param name="content">文章内容</param>
        /// <param name="label">文章标签</param>
        /// isPublish: 发布：true
        /// <returns></returns>
        bool CreateArticle(int uId, string title, string content, string label);
    }
}
