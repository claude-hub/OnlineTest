
using ONLINETEST_CORE.Users;
using ONLINETEST_ENTITY.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ONLINETEST_APPLICATION.Users
{
    public class UserAppService : IUserAppService
    {
        private readonly UserService _userService = new UserService();

        public bool CheckRegister(string account, string validataCode)
        {
            return _userService.CheckRegister(account, validataCode);
        }

        public bool CreateUser(string account, string password, string nikename)
        {
            return _userService.CreateUser(account, password, nikename);
        }

        public User Login(string account, string password)
        {
            return _userService.Login(account, password);
        }
        public User AdminLogin(string account,string password)
        {
            return _userService.AdminLogin(account, password);
        }
        public string Md5Encrypt(string password)
        {
            return _userService.Md5Encrypt(password);
        }

        public bool ModifyPassword(int userId, string nPassword)
        {
            return _userService.ModifyPassword(userId, nPassword);
        }
    }
}
