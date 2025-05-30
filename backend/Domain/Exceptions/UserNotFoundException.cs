﻿using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserNotFoundException : DomainException
    {
        public UserNotFoundException() : base(string.Format(Resource.ExceptionNoneUserNotFound))
        {
        }
        public UserNotFoundException(int userId) : base(string.Format(Resource.ExceptionUserNotFound, userId)) 
        {
        }
        public UserNotFoundException(string userName) : base(string.Format(Resource.ExceptionUserNameNotFound, userName))
        {
        }
    }
}
