import { Router } from "express";
import { userLogin, userList, Register, addorUpdatePreference,getUserPreference, 
    inviteFriend, updateProfilePhoto, updateBasicUser, updateUserPassword, 
    createWave,
    getMyWaves,
    getRequests,
    getLatestWaves,
    getComments,
    addComment,
    deleteComment,
    updateComment,
    getUser,
    updatePersonalUser} from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth";
import { uploadWave } from "../utils/uploadWave";
import { uploadProfile } from "../utils/uploadProfilePhoto";

const router = Router();

router.post('/login', userLogin);
router.post('/signup', Register);
router.post('/addwave', userAuthMiddleware, uploadWave.fields([{name:'photo'}, {name:'video'}]), createWave );
router.post('/invite-friend', userAuthMiddleware, inviteFriend);
router.post('/updatepreference', userAuthMiddleware, addorUpdatePreference);
router.post('/addcomment', userAuthMiddleware, addComment);
router.post('/updatepersonaldetails', userAuthMiddleware, updatePersonalUser);
router.post('/updatebasicdetails', userAuthMiddleware, updateBasicUser);
router.post('/updateprofilephoto', userAuthMiddleware, uploadProfile.single('profile_photo'), updateProfilePhoto);

router.get('/getmywave', userAuthMiddleware, getMyWaves);
router.get('/getprofile', userAuthMiddleware, getUser);
router.get('/getrequests', userAuthMiddleware, getRequests);
router.get('/getlatestwaves', userAuthMiddleware, getLatestWaves);
router.get('/getcomments/:waveId', userAuthMiddleware, getComments);
router.get('/getpreference', userAuthMiddleware, getUserPreference);
router.get('/getfriendlist', userAuthMiddleware, userList);

router.put('/updatepassword', userAuthMiddleware, updateUserPassword);
router.put('/editcomment', userAuthMiddleware, updateComment);
router.put('/deletecomment/:commentId', userAuthMiddleware, deleteComment);


export default router;