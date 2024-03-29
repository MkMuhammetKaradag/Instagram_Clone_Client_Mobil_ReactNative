import axios from "axios";
import { SignupType, userLoginRequestType, userLoginType } from "./authApiType";
import { LOCAL_URL } from "../url";


export const BASE_URL = LOCAL_URL;

export const postLogin = async (
  input: userLoginType
): Promise<userLoginRequestType> => {
  const { data } = await axios.post(`${BASE_URL}/Auth/login`, input, {
    withCredentials: true,
  });
  return data;
};
export const getMe = async (): Promise<userLoginRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Auth/me`, {
    withCredentials: true,
  });
  return data;
};
export const getLogout = async (): Promise<userLoginRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Auth/logout`, {
    withCredentials: true,
  });
  return data;
};
export const postSignup = async (input: SignupType) => {
  const { data } = await axios.post(`${BASE_URL}/Auth/signup`, input);
  return data;
};
