import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { Validator } from 'src/shared/utils/validator.util';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { createSigner } from 'fast-jwt';
import { WelcomeFlowDTO } from './dtos/welcome-flow.dto';
import { pick } from 'lodash';
import { CompanyService } from 'src/company/company.service';
import { UuidDTO } from 'src/shared/dtos/uuid.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private companyService: CompanyService) {}

  async signInWithGoogle(dto: CreateUserDTO): Promise<{ access_token: string }> {
    // Validate the input
    const { success, errors } = await Validator.validate(CreateUserDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Verify if the user exists and create the account if not exists
    let user: User | null = await this.userRepository.getByEmail(dto.email);

    if (!user) user = await this.createUser(dto);

    // Create the access_token
    const access_token = this.createAccessToken({ user_id: user.id, email: user.email });
    return { access_token };
  }

  async welcomeFlow(dto: WelcomeFlowDTO): Promise<void> {
    // Validate the input
    const { success, errors } = await Validator.validate(WelcomeFlowDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Validate if the user has already completed the welcome flow
    const user = await this.userRepository.getById(dto.id);

    if (!user) throw new BadRequestException(`The user with id <${dto.id}> not exists`);

    if (user.welcome_flow_completed) throw new BadRequestException(`The user has already completed the welcome flow`);

    // Update the user information and set the welcome_flow_completed to true
    const { first_name, last_name, image_url, phone } = dto;

    await this.updateUser(user.id, { first_name, last_name, image_url, phone, welcome_flow_completed: true });
  }

  async getMemberships(user_id: string) {
    // Validate the input
    const { success } = await Validator.validate(UuidDTO, { uuid: user_id });

    if (!success) throw new BadRequestException(`The user_id <${user_id}> is not a valid uuid`);

    // Get the memberships
    return this.companyService.getMembershipsFromUser(user_id);
  }

  private async createUser(dto: CreateUserDTO): Promise<User> {
    const { id, email, first_name, image_url, last_name, phone } = dto;

    const newUser: User = {
      id,
      email,
      first_name: first_name ?? null,
      last_name: last_name ?? null,
      image_url: image_url ?? null,
      phone: phone ?? null,
      welcome_flow_completed: false,
    };

    return await this.userRepository.create(newUser);
  }

  private async updateUser(user_id: string, data: Partial<User>): Promise<User> {
    const editableFields: Array<keyof User> = [
      'first_name',
      'image_url',
      'last_name',
      'welcome_flow_completed',
      'phone',
    ];

    const dataToUpdate: Partial<User> = pick(data, editableFields);

    return await this.userRepository.update(user_id, dataToUpdate);
  }

  private createAccessToken({ user_id, email }: { user_id: string; email: string }): string {
    const expiresIn = 1000 * 60 * 60 * 24; // 24 hours
    const signer = createSigner({ key: process.env.JWT_USER_SECRET, expiresIn, sub: user_id });
    return signer({ email });
  }
}
