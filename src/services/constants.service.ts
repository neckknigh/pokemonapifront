// TODO: Refactorizar esto a una clase

// Constantes de alertas
export enum AlertConstats {
    ALERT_SUCCESS,
    ALERT_ERROR,
    ALERT_CLEAR
};

// Constantes de usuario
export enum UserConstants {
    FACEBOOK_LOGIN_REQUEST = "FACEBOOK_LOGIN_REQUEST",
    FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS",
    LOGIN_FAILURE = "LOGIN_FAILURE",
    SAVE_FACEBOOK_USER = "SAVE_FACEBOOK_USER",
    FACEBOOK_USER_REGISTER_REQUEST = "FACEBOOK_USER_REGISTER_REQUEST",
    ACCOUNT_KIT_LOGIN_REQUEST = "ACCOUNT_KIT_LOGIN_REQUEST"
};

// Constantes del sistema
export enum SystemConstants {
    ACCOUNT_KIT_API_ID = "accountkitapi",
    POST_METHOD = "post"
};

// Constantes de Autorización
export enum AuthConstants {
    ACCOUNT_KIT_SDK_DONE_LOADING = "ACCOUNT_KIT_SDK_DONE_LOADING",
    ACCOUNT_KIT_LOGIN_REQUEST = "ACCOUNT_KIT_LOGIN_REQUEST",
    ACCOUNT_KIT_LOGIN_DONE = "ACCOUNT_KIT_LOGIN_DONE",
    ACCOUNT_KIT_FORM_ACTION = "https://www.accountkit.com/v1.0/basic/dialog/sms_login/",
    ACCOUT_KIT_PARTIALLY_AUTH_STATUS = "PARTIALLY_AUTHENTICATED",
    ACCOUNT_KIT_USER_API = "https://graph.accountkit.com/v1.3/me/?access_token="
}