using OnlineTest_Core.Users;
using OnlineTest_Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Application.Users
{
    public class UserAppService : IUserAppService
    {
        private readonly UserService _userService = new UserService();
        private OnlineTestContext _onlineTestContext = new OnlineTestContext();

        public bool CheckRegister(string account, string validataCode)
        {
            return _userService.CheckRegister(account, validataCode);
        }

        public bool CreateUser(string account, string password, string nikename, string status = "Common")
        {
            return _userService.CreateUser(account, password, nikename, status);
        }

        public User Login(string account, string password)
        {
            return _userService.Login(account, password);
        }
        public User AdminLogin(string account, string password)
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

        public bool ModifyNikeName(int uId, string nikeName)
        {
            return _userService.ModifyNikeName(uId, nikeName);
        }

        public User GetUserById(int id)
        {
            User user = _onlineTestContext.User.Find(id);
            return user ?? null;
        }

        public object GetUserListByStatus(string query, string status, int currentPage, int pageSize = 15)
        {
            return _userService.GetUserListByStatus(query,status, currentPage, pageSize);
        }
    }
}
