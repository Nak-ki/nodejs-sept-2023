import { ApiError } from "../api-error";
import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { IForgot, ISetForgot } from "../interfaces/action-token.interface";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IToken, ITokenResponse } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { sendGridService } from "./send-grid.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenResponse }> {
    await this.isEmailExist(dto.email);
    const hashedPassword = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.createUser({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });
    await sendGridService.sendByType(user.email, EmailTypeEnum.WELCOME, {
      name: user.name,
      actionToken: "actionToken",
      frontUrl: config.FRONT_URL,
    });
    return { user, tokens };
  }
  public async signIn(
    dto: Partial<{ email: string; password: string }>,
  ): Promise<{ user: IUser; tokens: ITokenResponse }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Wrong email or password", 401);
    }
    const isCompare = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isCompare) {
      throw new ApiError("Wrong email or password", 401);
    }
    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.createUser({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });
    return { user, tokens };
  }
  public async refresh(
    jwtPayload: IJwtPayload,
    oldPair: IToken,
  ): Promise<ITokenResponse> {
    const newPair = tokenService.generatePair({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });
    await tokenRepository.deleteById(oldPair._id);
    await tokenRepository.createUser({
      ...newPair,
      _userId: jwtPayload.userId,
    });
    return newPair;
  }
  public async forgotPassword(dto: IForgot): Promise<void> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) return;

    const actionToken = tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.FORGOT,
    );
    await actionTokenRepository.create({
      tokenType: ActionTokenTypeEnum.FORGOT,
      actionToken,
      _userId: user._id,
    });

    await sendGridService.sendByType(user.email, EmailTypeEnum.RESET_PASSWORD, {
      frontUrl: config.FRONT_URL,
      actionToken,
    });
  }
  public async setForgotPassword(
    dto: ISetForgot,
    jwtPayload: IJwtPayload,
  ): Promise<void> {
    const user = await userRepository.getUser(jwtPayload.userId);
    const hashedPassword = await passwordService.hashPassword(dto.password);

    await userRepository.updateUser(user._id, { password: hashedPassword });
    await actionTokenRepository.deleteByParams({
      tokenType: ActionTokenTypeEnum.FORGOT,
    });
    await tokenRepository.findByParams({ _userId: user._id });
  }

  private async isEmailExist(email: string) {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exist", 404);
    }
  }
}

export const authService = new AuthService();
