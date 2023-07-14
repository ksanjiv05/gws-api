import { USER_ROLES } from "../config/enums";
import logging from "../config/logging";
import {
  addUserToFirebase,
  addUserToMongoDB,
  deleteUserFromFirebase,
} from "../controllers/authController/auth";

export const createSuperAdmin = async () => {
  try {
    const userObj: any = {
      displayName: "Mayank",
      email: "mayank@metanxt.com",
      phoneNumber: "+911111111245",
      role: USER_ROLES.EMOPLOYER,
      isAdminAccess: true,
      password: "mayank@1234",
    };
    const newUserRecord = await addUserToFirebase(userObj);
    const isAdded = await addUserToMongoDB({
      ...userObj,
      uid: newUserRecord.uid,
    });

    if (!isAdded) {
      await deleteUserFromFirebase(newUserRecord.uid);

      logging.error("USER","Unable to create super admin");
      return
    }
    logging.info("USER","Super Admin Created");
  } catch (err) {
    logging.error("USER","Unable to create super admin",err);
  }
};
