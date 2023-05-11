import { BadRequestException, Injectable } from '@nestjs/common';
import { OwnerRepository } from './repositories/owner.repository';
import { OwnerDTO } from './dtos/owner.dto';
import { Validator } from 'src/shared/utils/validator';
import { createSigner } from 'fast-jwt';
import { Owner } from './entities/Owner';

@Injectable()
export class OwnerService {
  constructor(private ownerRepository: OwnerRepository) {}
  async signInWithGoogle(dto: OwnerDTO): Promise<{ access_token: string }> {
    // Validate the input with class validator
    const { success, errors } = await Validator.validate(OwnerDTO, dto);

    if (!success) throw new BadRequestException(errors);

    // Check if the user is registered
    const { email } = dto;

    const owner = await this.ownerRepository.getByEmail(email);

    // Create a new owner if not exists
    if (!owner) await this.createOwner(dto);

    // Create and access_token to the owner
    const access_token = this.createAccessToken({ owner_id: dto.id, email: dto.email });

    return { access_token };
  }

  async createOwner(dto: OwnerDTO) {
    const { id, email, first_name, image, last_name, phone } = dto;

    const newOwner: Owner = {
      id,
      email,
      first_name: first_name ?? null,
      last_name: last_name ?? null,
      image: image ?? null,
      phone: phone ?? null,
      welcome_flow_finished: false,
    };
    await this.ownerRepository.create(newOwner);
  }

  createAccessToken({ email, owner_id }: { owner_id: string; email: string }): string {
    const expiresIn = 1000 * 60 * 60 * 24; // 24 hours
    const signer = createSigner({ key: process.env.JWT_SECRET, expiresIn, sub: owner_id });
    return signer({ email });
  }
}
