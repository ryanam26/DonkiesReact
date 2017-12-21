import { createRequestType } from "~Scripts/utils";

export const USER = createRequestType("USER", []);
export const NAVIGATE = createRequestType("NAVIGATE", ["push"]);
