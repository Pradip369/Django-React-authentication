const MAIN_URL = 'http://127.0.0.1:8000/auth'

export const REGISTER_URL = `${MAIN_URL}/users/`
export const RESEND_ACTIVATION_URL = `${MAIN_URL}/users/resend_activation/`
export const ACCOUNT_ACTIVATION_URL = `${MAIN_URL}/users/activation/`

export const LOGIN_URL = `${MAIN_URL}/jwt/create/`

export const RESET_PASSWORD_URL = `${MAIN_URL}/users/reset_password/`
export const RESET_PASSWORD_CONFIRM_URL = `${MAIN_URL}/users/reset_password_confirm/`

export const CHANGE_PASSWORD = `${MAIN_URL}/users/set_password/`

export const CHANGE_USERNAME = `${MAIN_URL}/users/set_username/`

export const USER_DETAIL = `${MAIN_URL}/users/me/`