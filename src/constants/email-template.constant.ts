import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
  [EmailTypeEnum.WELCOME]: {
    templateId: " d-fdc8b7083b7b480984ababb0cac017ce",
  },
  [EmailTypeEnum.RESET_PASSWORD]: {
    templateId: " d-277dadc9e2cf44d0a337a83e41ca36c8",
  },
  [EmailTypeEnum.DELETE_ACCOUNT]: {
    templateId: "",
  },
  [EmailTypeEnum.LOGOUT]: {
    templateId: "",
  },
};
