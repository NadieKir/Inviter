import { FamilyStatus, Gender, Interests, Language, Orientation } from "models";
import { SelectOption } from "./other";

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
  PreferredAge = 'preferredAge'
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
  [RegistrationFormFields.ConfirmPassword]: string,
}

export type RegistrationSecondStepFormData = {
  [RegistrationFormFields.City]: string,
  [RegistrationFormFields.Orientation]: Orientation | null | SelectOption<Orientation>,
  [RegistrationFormFields.FamilyStatus]: FamilyStatus | null | SelectOption<FamilyStatus>,
  [RegistrationFormFields.AlcoholAttitude]: boolean | null,
  [RegistrationFormFields.SmokingAttitude]: boolean | null,
  [RegistrationFormFields.Languages]: string[] | SelectOption<Language>[],
  [RegistrationFormFields.Interests]: string[] | SelectOption<Interests>[],
}

export type RegistrationThirdStepFormData = {
  [RegistrationFormFields.WelcomeMessage]: string,
  [RegistrationFormFields.ConnectionMethods]: string,
  [RegistrationFormFields.PreferredAge]: string,
}

export type RegistrationFormData = RegistrationFirstStepFormData & RegistrationSecondStepFormData & RegistrationThirdStepFormData