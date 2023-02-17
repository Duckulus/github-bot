import { GithubUser } from "./types";
import axios from "axios";
import { routes } from "./routes";

export const getUser = async (username: string): Promise<GithubUser | null> => {
  try {
    const resp = await axios.get(routes.user(username));
    return resp.data ?? null;
  } catch (e) {
    return null;
  }
};
