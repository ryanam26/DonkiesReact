import { API_ROOT_URL } from "~Scripts/store/configureStore";

export const ACCOUNTS_URL = `${API_ROOT_URL}v1/accounts`;
export const ACCOUNTS_SET_ACTIVE_URL = `${API_ROOT_URL}v1/accounts/set_active`;
export const ACCOUNTS_SET_NUMBER_URL = `${API_ROOT_URL}v1/accounts/set_account_number`;
export const ACCOUNTS_EDIT_SHARE_URL = `${API_ROOT_URL}v1/accounts/edit_share`;
export const ACCOUNTS_SET_FUNDING_SOURCE_URL = `${API_ROOT_URL}v1/accounts/set_funding_source`;
export const ACCOUNTS_SET_PRIMARY_URL = `${API_ROOT_URL}v1/accounts/set_primary`;
export const CHANGE_EMAIL_URL = `${API_ROOT_URL}v1/user/change/email`;
export const CHANGE_EMAIL_CONFIRM_URL = `${API_ROOT_URL}v1/user/change/email/confirm`;
export const CHANGE_PASSWORD_URL = `${API_ROOT_URL}v1/user/change/password`;
export const CLOSE_DONKIES_ACCOUNT_URL = `${API_ROOT_URL}v1/user_close_account`;
export const CREATE_FUNDING_SOURCE_BY_IAV_URL = `${API_ROOT_URL}v1/create_funding_source_by_iav`;
export const DEBT_INSTITUTIONS_URL = `${API_ROOT_URL}v1/debt_institutions`;
export const GET_IAV_TOKEN_URL = `${API_ROOT_URL}v1/get_iav_token`;
export const INSTITUTIONS_URL = `${API_ROOT_URL}v1/institutions`;
export const INSTITUTIONS_SUGGEST_URL = `${API_ROOT_URL}v1/institutions_suggest`;
export const ITEMS_URL = `${API_ROOT_URL}v1/items`;
export const LENDERS_URL = `${API_ROOT_URL}v1/lenders`;
export const USER_LENDERS_URL = `${API_ROOT_URL}v1/user_lenders`;
export const LOGIN_URL = `${API_ROOT_URL}v1/auth/login`;
export const LOGOUT_URL = `${API_ROOT_URL}v1/auth/logout`;
export const LOGIN_FACEBOOK_URL = `${API_ROOT_URL}v1/auth/facebook`;

export const REGISTRATION_URL = `${API_ROOT_URL}v1/auth/signup`;
export const REGISTRATION_STEP1_URL = `${API_ROOT_URL}v1/auth/signup`;
export const REGISTRATION_STEP2_URL = `${API_ROOT_URL}v1/auth/signup/2`;
export const REGISTRATION_STEP3_URL = `${API_ROOT_URL}v1/auth/signup/3`;
export const REGISTRATION_STEP4_URL = `${API_ROOT_URL}v1/auth/signup/4`;

export const REGISTRATION_PARENT_URL = `${API_ROOT_URL}v1/auth/signup_parent`;

export const REGISTRATION_CONFIRM_URL = `${API_ROOT_URL}v1/auth/signup/confirm`;
export const RESEND_REG_CONFIRMATION_URL = `${API_ROOT_URL}v1/user/resend_reg_confirmation_link`;
export const RESET_PASSWORD_REQUEST_URL = `${API_ROOT_URL}v1/password/reset/request`;
export const RESET_PASSWORD_URL = `${API_ROOT_URL}v1/password/reset`;
export const SETTINGS_URL = `${API_ROOT_URL}v1/settings`;
export const SETTINGS_LOGIN_URL = `${API_ROOT_URL}v1/settings/login`;
export const STAT_URL = `${API_ROOT_URL}v1/stat`;
export const TRANSACTIONS_URL = `${API_ROOT_URL}v1/transactions`;
export const TRANSFERS_PREPARE_URL = `${API_ROOT_URL}v1/transfers_prepare`;
export const TRANSFERS_DONKIES_URL = `${API_ROOT_URL}v1/transfers_donkies`;
export const TRANSFERS_STRIPE_URL = `${API_ROOT_URL}v1/transfers_stripe`;
export const TRANSFERS_DEBT_URL = `${API_ROOT_URL}v1/transfers_debt`;
export const USER_URL = `${API_ROOT_URL}v1/user`;
export const USER_SETTINGS_URL = `${API_ROOT_URL}v1/user_settings`;
