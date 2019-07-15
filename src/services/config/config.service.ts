export class ConfigProvider {
    static readonly BASE_URL: string = "BASE_URL";
    static readonly ACCOUNT_KIT_APP_SECRET: string = "ACCOUNT_KIT_APP_SECRET";
    static readonly FACEBOOK_APP_ID: string = "FACEBOOK_APP_ID";
    static readonly ACCOUT_KIT_PARTIALLY_AUTH_STATUS: string = "ACCOUT_KIT_PARTIALLY_AUTH_STATUS";
    static readonly ACCOUNT_KIT_WINDOW_PROPERTY: string = "ACCOUNT_KIT_WINDOW_PROPERTY";
    static readonly ACCOUNT_KIT: string = "ACCOUNT_KIT";
    static readonly ACCOUNT_KIT_VERSION: string = "ACCOUNT_KIT_VERSION";
    static readonly ACCOUNT_KIT_DEBUG_MODE: string = "ACCOUNT_KIT_DEBUG_MODE";
    static readonly ACCOUNT_KIT_STATE: string = "ACCOUNT_KIT_STATE";
    static readonly ACCOUNT_KIT_ENABLE_FACEBOOK_EVENTS: string = "ACCOUNT_KIT_ENABLE_FACEBOOK_EVENTS";
    static readonly ACCOUNT_KIT_SDK_SRC: string = "ACCOUNT_KIT_SDK_SRC";
    static readonly ACCOUNT_KIT_LOGIN_IN_DISPLAY: string = "ACCOUNT_KIT_LOGIN_IN_DISPLAY";
    static readonly FACEBOOK_USER_REQUESTED_FIELDS: string = "FACEBOOK_USER_REQUESTED_FIELDS";
    static readonly FACEBOOK_LOGIN_IN_DISPLAY: string = "FACEBOOK_LOGIN_IN_DISPLAY";
    static readonly FACEBOOK_COLOR: string = "FACEBOOK_COLOR";
    static readonly LOADING_TEXT_DISPLAY: string = "LOADING_TEXT_DISPLAY";


    private static configs: any;


    static _constructor() {
        ConfigProvider.configs = {};
        ConfigProvider.configs[ConfigProvider.BASE_URL] = "http://www.comunidadesdoo.com/admon/ws/";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_APP_SECRET] = "451561d911947080fb697fcc53eef74f";
        ConfigProvider.configs[ConfigProvider.FACEBOOK_APP_ID] = "368256876708367";
        ConfigProvider.configs[ConfigProvider.ACCOUT_KIT_PARTIALLY_AUTH_STATUS] = "PARTIALLY_AUTHENTICATED";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_WINDOW_PROPERTY] = "AccountKit_OnInteractive";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT] = "AccountKit";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_VERSION] = "v1.1";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_DEBUG_MODE] = true;
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_STATE] = "31e2a963ada08b93e2667243805407c3";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_ENABLE_FACEBOOK_EVENTS] = true;
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_SDK_SRC] = "https://sdk.accountkit.com/es_LA/sdk.js";
        ConfigProvider.configs[ConfigProvider.ACCOUNT_KIT_LOGIN_IN_DISPLAY] = "Ingresar con tu celular";

        ConfigProvider.configs[ConfigProvider.FACEBOOK_USER_REQUESTED_FIELDS] = "first_name,last_name,email,birthday,gender,picture";
        ConfigProvider.configs[ConfigProvider.FACEBOOK_LOGIN_IN_DISPLAY] = "Ingresar con Facebook";
        ConfigProvider.configs[ConfigProvider.FACEBOOK_COLOR] = "#3b5998";
        ConfigProvider.configs[ConfigProvider.LOADING_TEXT_DISPLAY] = "Cargando...";

    }

    public static get(key: string, defaultValue?: string): any {
        if (ConfigProvider.configs.hasOwnProperty(key)) {
            return ConfigProvider.configs[key];
        }
        defaultValue += "";
        throw new Error("Configuration '" + key + "' not found in the config error. This is a fatal error.");
    }


}

// Inicialización de la clase
ConfigProvider._constructor();

