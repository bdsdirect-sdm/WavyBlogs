interface config{
    BASE_URL: string;
    CREATE_USER: string;
    AUTH_USER: string;
    CREATE_WAVE: string;
    GET_MY_WAVES: string;
    GET_REQUESTS: string;
    INVITE_FRIEND: string;
    SECRET_KEY: string;
    GET_LATEST_WAVES: string;
    GET_COMMENTS: string;
    GET_PREFERENCE: string;
    UPDATE_PREFERENCE: string;
    EDIT_PASSWORD: string;
    GET_FRIENDS: string;
    ADD_COMMENT: string;
    EDIT_COMMENT: string;
    DELETE_COMMENT: string;
    GET_PROFILE: string;
    UPDATE_PERSONAL_USER_DETAIL: string;
    UPDATE_BASIC_USER_DETAIL: string;
    UPDATE_PROFILE_PHOTO: string;
    AUTH_ADMIN: string;
    REGISTER_ADMIN: string;
    USER_LOGOUT: string;
}
// console.log("--------->", import.meta.env.VITE_BASE_URL)
const Local:config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_USER: import.meta.env.VITE_CREATE_USER,
    AUTH_USER: import.meta.env.VITE_AUTH_USER,
    CREATE_WAVE: import.meta.env.VITE_CREATE_WAVE,
    GET_MY_WAVES: import.meta.env.VITE_GET_MY_WAVES,
    GET_REQUESTS: import.meta.env.VITE_GET_REQUESTS,
    INVITE_FRIEND: import.meta.env.VITE_INVITE_FRIEND,
    SECRET_KEY: import.meta.env.VITE_CRYPTO_SECRET_KEY,
    GET_LATEST_WAVES: import.meta.env.VITE_GET_LATEST_WAVES,
    GET_COMMENTS: import.meta.env.VITE_GET_COMMENTS,
    GET_PREFERENCE: import.meta.env.VITE_GET_PREFERENCE,
    UPDATE_PREFERENCE: import.meta.env.VITE_UPDATE_PREFERENCE,
    EDIT_PASSWORD: import.meta.env.VITE_EDIT_PASSWORD,
    GET_FRIENDS: import.meta.env.VITE_GET_FRIENDS,
    ADD_COMMENT: import.meta.env.VITE_ADD_COMMENT,
    EDIT_COMMENT: import.meta.env.VITE_EDIT_COMMENT,
    DELETE_COMMENT: import.meta.env.VITE_DELETE_COMMENT,
    GET_PROFILE: import.meta.env.VITE_GET_PROFILE,
    UPDATE_PERSONAL_USER_DETAIL: import.meta.env.VITE_UPDATE_PERSONAL_USER_DETAIL,
    UPDATE_BASIC_USER_DETAIL: import.meta.env.VITE_UPDATE_BASIC_USER_DETAIL,
    UPDATE_PROFILE_PHOTO: import.meta.env.VITE_UPDATE_PROFILE_PHOTO,
    AUTH_ADMIN: import.meta.env.VITE_AUTH_ADMIN,
    REGISTER_ADMIN: import.meta.env.VITE_REGISTER_ADMIN,
    USER_LOGOUT: import.meta.env.VITE_USER_LOGOUT
}

export default Local