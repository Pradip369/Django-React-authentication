const authreducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_LOADING':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loader: true,
                },
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loader: false,
                    data: action.payload
                },
            };
        case 'REGISTER_ERROR':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loader: false,
                    error: action.payload
                },
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                uDetail: {
                    ...state.uDetail,
                    "isAuthenticated": true
                },
            };
        case 'AFTER_LOGIN':
            return {
                ...state,
                uDetail: {
                    ...state.uDetail,
                    "user_name": action.payload.username,
                    "user_email": action.payload.email,
                    "id": action.payload.id,
                    "isAuthenticated": true
                },
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                uDetail: {
                    ...state.uDetail,
                    "user_name": null,
                    "user_email": null,
                    "isAuthenticated": false
                },
            };
        default:
            return state
    }
}

export default authreducer;