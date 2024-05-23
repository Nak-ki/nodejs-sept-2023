import { removeOldTokens } from "./remove-old-tokens.cron";

export const runCronJob = () => {
  removeOldTokens.start();
};
