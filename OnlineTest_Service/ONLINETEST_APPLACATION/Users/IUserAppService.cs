﻿
using ONLINETEST_ENTITY.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ONLINETEST_APPLICATION.Users
{
    public interface IUserAppService
    {
        /// <summary>
        /// 加密密码
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        string Md5Encrypt(string password);
        /// <summary>
        /// 添加用户至数据库
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <param name="nikename"></param>
        /// <returns></returns>
        bool CreateUser(string account, string password, string nikename, string status = "Common");
        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="nPassword"></param>
        /// <returns></returns>
        bool ModifyPassword(int userId, string nPassword);
        /// <summary>
        /// 注册验证邮箱
        /// </summary>
        /// <param name="account">邮箱</param>
        /// <param name="validataCode">验证码</param>
        /// <returns></returns>
        bool CheckRegister(string account, string validataCode);

        User Login(string account, string password);
        User AdminLogin(string account, string password);
        User GetUserById(int id);
        List<User> GetUserListByStatus(string status);
        List<User> SearchUser(string content);
    }
}
