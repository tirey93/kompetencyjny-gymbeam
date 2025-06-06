﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GymBeam.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "17.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Resource {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resource() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("GymBeam.Properties.Resource", typeof(Resource).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Bad Request: {0}.
        /// </summary>
        public static string ControllerBadRequest {
            get {
                return ResourceManager.GetString("ControllerBadRequest", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Forbidden: {0}.
        /// </summary>
        public static string ControllerForbidden {
            get {
                return ResourceManager.GetString("ControllerForbidden", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Internal Server Error: {0}.
        /// </summary>
        public static string ControllerInternalError {
            get {
                return ResourceManager.GetString("ControllerInternalError", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Method Not Allowed: {0}.
        /// </summary>
        public static string ControllerMethodNotAllowed {
            get {
                return ResourceManager.GetString("ControllerMethodNotAllowed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Not Found: {0}.
        /// </summary>
        public static string ControllerNotFound {
            get {
                return ResourceManager.GetString("ControllerNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Failed to exchange authorization code for token..
        /// </summary>
        public static string ExceptionAuthCodeExchangeFailed {
            get {
                return ResourceManager.GetString("ExceptionAuthCodeExchangeFailed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cookie {0} was not found..
        /// </summary>
        public static string ExceptionCookieIsInvalid {
            get {
                return ResourceManager.GetString("ExceptionCookieIsInvalid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Failed to fetch user information..
        /// </summary>
        public static string ExceptionFailedToFetchUserInfo {
            get {
                return ResourceManager.GetString("ExceptionFailedToFetchUserInfo", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Google OAuth secret is not set in environment variables..
        /// </summary>
        public static string ExceptionNoOAuthSecretInEnvVariables {
            get {
                return ResourceManager.GetString("ExceptionNoOAuthSecretInEnvVariables", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to JWT signing key is missing..
        /// </summary>
        public static string ExceptionSigningKeyIsMissing {
            get {
                return ResourceManager.GetString("ExceptionSigningKeyIsMissing", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to User id is invalid..
        /// </summary>
        public static string ExceptionUserIdIsInvalid {
            get {
                return ResourceManager.GetString("ExceptionUserIdIsInvalid", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to User is not allowed to perform this operation..
        /// </summary>
        public static string ExceptionUserNotAllowed {
            get {
                return ResourceManager.GetString("ExceptionUserNotAllowed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Failed to read user role..
        /// </summary>
        public static string ExceptionUserRoleNotFound {
            get {
                return ResourceManager.GetString("ExceptionUserRoleNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to ActivityId is required..
        /// </summary>
        public static string ValidatorActivityIdRequired {
            get {
                return ResourceManager.GetString("ValidatorActivityIdRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Authorization code not provided..
        /// </summary>
        public static string ValidatorAuthorizationCodeNotProvided {
            get {
                return ResourceManager.GetString("ValidatorAuthorizationCodeNotProvided", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cron field is required..
        /// </summary>
        public static string ValidatorCronRequired {
            get {
                return ResourceManager.GetString("ValidatorCronRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cron must not exceed 255 characters..
        /// </summary>
        public static string ValidatorCronShorter {
            get {
                return ResourceManager.GetString("ValidatorCronShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Display name must be at least 5 characters long..
        /// </summary>
        public static string ValidatorDisplayNameLonger {
            get {
                return ResourceManager.GetString("ValidatorDisplayNameLonger", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Display name is required..
        /// </summary>
        public static string ValidatorDisplayNameRequired {
            get {
                return ResourceManager.GetString("ValidatorDisplayNameRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Display name must not exceed 20 characters..
        /// </summary>
        public static string ValidatorDisplayNameShorter {
            get {
                return ResourceManager.GetString("ValidatorDisplayNameShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Duration must be greater than zero..
        /// </summary>
        public static string ValidatorDurationGreaterThanZero {
            get {
                return ResourceManager.GetString("ValidatorDurationGreaterThanZero", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to End time must be after start time..
        /// </summary>
        public static string ValidatorEndTimeAfterStartTime {
            get {
                return ResourceManager.GetString("ValidatorEndTimeAfterStartTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Enrollments range must be less then 7 days..
        /// </summary>
        public static string ValidatorEnrollmentRangeExceeded {
            get {
                return ResourceManager.GetString("ValidatorEnrollmentRangeExceeded", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Long description must not exceed 4000 characters..
        /// </summary>
        public static string ValidatorLongDescriptionShorter {
            get {
                return ResourceManager.GetString("ValidatorLongDescriptionShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Name field is required..
        /// </summary>
        public static string ValidatorNameRequired {
            get {
                return ResourceManager.GetString("ValidatorNameRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Name must not exceed 255 characters..
        /// </summary>
        public static string ValidatorNameShorter {
            get {
                return ResourceManager.GetString("ValidatorNameShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Password must be at least 5 characters long..
        /// </summary>
        public static string ValidatorPasswordLonger {
            get {
                return ResourceManager.GetString("ValidatorPasswordLonger", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Password is required..
        /// </summary>
        public static string ValidatorPasswordRequired {
            get {
                return ResourceManager.GetString("ValidatorPasswordRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Password must not exceed 255 characters..
        /// </summary>
        public static string ValidatorPasswordShorter {
            get {
                return ResourceManager.GetString("ValidatorPasswordShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Role must be one of: {0}.
        /// </summary>
        public static string ValidatorRoleFromRolesList {
            get {
                return ResourceManager.GetString("ValidatorRoleFromRolesList", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Short description must not exceed 1000 characters..
        /// </summary>
        public static string ValidatorShortDescriptionShorter {
            get {
                return ResourceManager.GetString("ValidatorShortDescriptionShorter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Start time must be before end time..
        /// </summary>
        public static string ValidatorStartTimeBeforeEndTime {
            get {
                return ResourceManager.GetString("ValidatorStartTimeBeforeEndTime", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Start time is required..
        /// </summary>
        public static string ValidatorStartTimeRequired {
            get {
                return ResourceManager.GetString("ValidatorStartTimeRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Total capacity must be greater than zero..
        /// </summary>
        public static string ValidatorTotalCapacityGreaterThanZero {
            get {
                return ResourceManager.GetString("ValidatorTotalCapacityGreaterThanZero", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to User id is required..
        /// </summary>
        public static string ValidatorUserIdRequired {
            get {
                return ResourceManager.GetString("ValidatorUserIdRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Username must be at least 5 characters long..
        /// </summary>
        public static string ValidatorUsernameLonger {
            get {
                return ResourceManager.GetString("ValidatorUsernameLonger", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Username is required..
        /// </summary>
        public static string ValidatorUsernameRequired {
            get {
                return ResourceManager.GetString("ValidatorUsernameRequired", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Username must not exceed 20 characters..
        /// </summary>
        public static string ValidatorUsernameShorter {
            get {
                return ResourceManager.GetString("ValidatorUsernameShorter", resourceCulture);
            }
        }
    }
}
