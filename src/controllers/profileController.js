import model from '../database/models';
import { ProfileValidator, verificationValidator } from '../validator';
import { imageUpload } from '../utils';
const Profile = model.Profile;
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.userId },
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: ['email'],
        },
      ],
    });
    if (profile) {
      profile.userId = undefined;
      return res.status(200).json({
        message: 'Profile found',
        profile,
      });
    } else {
      return res.status(404).json({
        message: 'Profile not found',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const createProfile = async (req, res) => {
  const { error } = ProfileValidator(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.userId },
    });
    if (profile) {
      return res.status(400).json({
        message: 'Profile already exists',
      });
    }
    req.body.profilePhoto = await imageUpload(req);
    const newProfile = await new Profile({
      userId: req.user.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      age: req.body.age,
      dateOfBirth: req.body.dateOfBirth,
      martualStatus: req.body.martualStatus,
      nationality: req.body.nationality,
      profilePhoto: req.body.profilePhoto,
    });
    await newProfile.save();
    newProfile.userId = undefined;
    newProfile.profileId = undefined;
    return res.status(201).json({
      message: 'Profile created successfully',
      profile: newProfile,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateProfile = async (req, res) => {
  const { error } = ProfileValidator(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.userId },
    });
    if (profile) {
      await profile.update({
        ...req.body,
      });
      return res.status(200).json({
        message: 'Profile updated successfully',
      });
    } else {
      const newProfile = await new Profile({
        ...req.body,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.userId },
    });
    if (profile) {
      await profile.destroy();
      return res.status(200).json({
        message: 'Profile deleted successfully',
      });
    } else {
      return res.status(404).json({
        message: 'Profile not found',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const completeProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.userId },
    });
    if (profile) {
      const { error } = verificationValidator(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      req.body.documentPhoto = await imageUpload(req);
      await profile.update({
        documentPhoto: req.body.documentPhoto,
        nationalIdNumber: req.body.nationalIdNumber,
        passportNumber: req.body.passportNumber,
        verified: 'PENDING',
        updatedAt: new Date(),
      });
      return res.status(200).json({
        message: 'Profile verified successfully',
        profile,
      });
    } else {
      return res.status(404).json({
        message: 'Profile not found',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const verifyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { profileId: req.params.profileId },
    });
    if (profile) {
      await profile.update({
        verified: 'VERIFIED',
        updatedAt: new Date(),
      });
      return res.status(200).json({
        message: 'Profile verified successfully',
        profile,
      });
    } else {
      return res.status(404).json({
        message: 'Profile not found',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  completeProfile,
  verifyProfile,
};
