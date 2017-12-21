import { NAVIGATE } from "~Scripts/constants/actions";

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const navigate = pathname => action(NAVIGATE.PUSH, { pathname });
