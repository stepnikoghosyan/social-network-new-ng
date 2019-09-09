export enum USER_GENDER {
  GENDER_MALE = 'Male',
  GENDER_FEMALE = 'Female'
}

export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: USER_GENDER;
  isPrivate: boolean;
  profilePicture: string;
}
