const configData = {
    // User's APIs
    BASE_URL: "http://localhost:4000/", // Base URL for the API
    CREATE_USER: "signup", // API endpoint for creating a new user
    AUTH_USER: "login", // API endpoint for user login
    CREATE_WAVE: "addwave", // API endpoint for creating a new wave
    GET_MY_WAVES: "getmywave", // API endpoint to get user's waves
    GET_REQUESTS: "getrequests", // API endpoint to get user requests
    INVITE_FRIEND: "invite-friend", // API endpoint to invite a friend
    SECRET_KEY: "dK2JG6hi7ghH7HfuiytbkU7578PmbhJGJok3r43", // Secret key for encryption
    GET_LATEST_WAVES: "getlatestwaves", // API endpoint to get the latest waves
    GET_COMMENTS: "getcomments", // API endpoint to get comments
    GET_PREFERENCE: "getpreference", // API endpoint to get user preferences
    UPDATE_PREFERENCE: "updatepreference", // API endpoint to update user preferences
    EDIT_PASSWORD: "updatepassword", // API endpoint to update user password
    GET_FRIENDS: "getfriendlist", // API endpoint to get user friends
    ADD_COMMENT: "addcomment", // API endpoint to add a new comment
    EDIT_COMMENT: "editcomment", // API endpoint to edit a comment
    DELETE_COMMENT: "deletecomment", // API endpoint to delete a comment
    GET_PROFILE: "getprofile", // API endpoint to get user profile
    UPDATE_PERSONAL_USER_DETAIL: "updatepersonaldetails", // API endpoint to update personal user details
    UPDATE_BASIC_USER_DETAIL: "updatebasicdetails", // API endpoint to update basic user details
    UPDATE_PROFILE_PHOTO: "updateprofilephoto", // API endpoint to update user profile photo
    USER_LOGOUT: "userlogout", // API endpoint for user logout
  
    // Admin's APIs
    AUTH_ADMIN: "adminauth", // API endpoint for admin authentication
    REGISTER_ADMIN: "adminregister", // API endpoint for registering an admin
    ADMIN_LOGOUT: "adminlogout", // API endpoint for admin logout
    UPDATE_WAVE_STATUS: "editwavestatus", // API endpoint to update wave status
    UPDATE_USER_STATUS: "edituserstatus", // API endpoint to update user status
    UPDATE_USER: "edituser", // API endpoint to update user details
    GET_ALL_USERS: "allusers", // API endpoint to get all users
    GET_ALL_WAVES: "allwaves", // API endpoint to get all waves
    GET_VALUES: "getdata", // API endpoint to get various data
    PERSONAL_UPDATE_USER: "editadminpersonaluser", // API endpoint for admin to update personal user details
    BASIC_UPDATE_USER: "editadminbasicuser", // API endpoint for admin to update basic user details
    DELETE_USER: "deleteuser", // API endpoint to delete a user
    DELETE_WAVE: "deletewave" // API endpoint to delete a wave
  };
  
  export default configData;
  