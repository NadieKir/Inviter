import { Attitude, City, FamilyStatus, Gender, Interests, Language, Orientation, Role } from "models";
import { SelectOption } from "./options";

export enum LoginFormFields {
  Login = 'login',
  Password = 'password',
}

export enum RegistrationFormFields {
  Name = 'name',
  Birthday = 'birthday',
  Login = 'login',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  City = 'city',
  Gender = 'gender',
  Orientation = 'orientation',
  FamilyStatus = 'familyStatus',
  AlcoholAttitude = 'alcoholAttitude',
  SmokingAttitude = 'smokingAttitude',
  Languages = 'languages',
  Interests = 'interests',
  WelcomeMessage = 'welcomeMessage',
  ConnectionMethods = 'connectionMethods',
  PreferredAge = 'preferredAge',
  Image = 'image',
}

export type LoginFormData = {
  [LoginFormFields.Login]: string;
  [LoginFormFields.Password]: string;
}

export type RegistrationFirstStepFormData = {
  [RegistrationFormFields.Name]: string,
  [RegistrationFormFields.Login]: string,
  [RegistrationFormFields.Birthday]: string | null,
  [RegistrationFormFields.Gender]: Gender | null,
  [RegistrationFormFields.Email]: string,
  [RegistrationFormFields.Password]: string,
  [RegistrationFormFields.ConfirmPassword]?: string,
}

export type RegistrationSecondStepFormData = {
  [RegistrationFormFields.City]: City | null | SelectOption<City>,
  [RegistrationFormFields.Orientation]: Orientation | null | SelectOption<Orientation>,
  [RegistrationFormFields.FamilyStatus]: FamilyStatus | null | SelectOption<FamilyStatus>,
  [RegistrationFormFields.AlcoholAttitude]: Attitude | null | SelectOption<Attitude>,
  [RegistrationFormFields.SmokingAttitude]: Attitude | null | SelectOption<Attitude>,
  [RegistrationFormFields.Languages]: string[] | SelectOption<Language>[],
  [RegistrationFormFields.Interests]: string[] | SelectOption<Interests | string>[],
}

export type RegistrationThirdStepFormData = {
  [RegistrationFormFields.WelcomeMessage]: string,
  [RegistrationFormFields.ConnectionMethods]: string,
  [RegistrationFormFields.PreferredAge]: string,
  [RegistrationFormFields.Image]: string,
}

export type RegistrationFormData = RegistrationFirstStepFormData & RegistrationSecondStepFormData & RegistrationThirdStepFormData & {
  role: Role,
}

export enum ChangePasswordFields {
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  ConfirmNewPassword = 'confirmNewPassword',
}

export type ChangePasswordFormData = {
  [ChangePasswordFields.OldPassword]: string;
  [ChangePasswordFields.NewPassword]: string;
  [ChangePasswordFields.ConfirmNewPassword]: string;
}

export type EditProfileFormData = Pick<RegistrationFormData,
  RegistrationFormFields.Name |
  RegistrationFormFields.Login |
  RegistrationFormFields.City |
  RegistrationFormFields.Orientation |
  RegistrationFormFields.FamilyStatus |
  RegistrationFormFields.AlcoholAttitude |
  RegistrationFormFields.SmokingAttitude |
  RegistrationFormFields.Languages |
  RegistrationFormFields.Interests |
  RegistrationFormFields.WelcomeMessage |
  RegistrationFormFields.ConnectionMethods |
  RegistrationFormFields.PreferredAge |
  RegistrationFormFields.Image
>;

export type EditAdminProfileFormData = Pick<RegistrationFormData,
  RegistrationFormFields.Name |
  RegistrationFormFields.Login |
  RegistrationFormFields.Image
>;