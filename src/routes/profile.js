import express from 'express';
import {
  getProfile,
  createProfile,
  deleteProfile,
  completeProfile,
  verifyProfile,
  getAllProfiles,
} from '../controllers/profileController';
import {
  multerMiddleware,
  AuthMiddleware,
  RoleMiddleware,
} from '../middleware';
const route = express.Router();

route.post(
  '/',
  AuthMiddleware,
  multerMiddleware.single('profilePhoto'),
  createProfile
);
route.get('/', AuthMiddleware, getProfile);
route.delete('/', AuthMiddleware, deleteProfile);
route.patch(
  '/complete',
  AuthMiddleware,
  multerMiddleware.single('documentPhoto'),
  completeProfile
);
route.get('/all', AuthMiddleware, RoleMiddleware, getAllProfiles);
route.patch(
  '/verify/account/:profileId',
  AuthMiddleware,
  RoleMiddleware,
  verifyProfile
);

export default route;
