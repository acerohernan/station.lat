import { BadRequestException, Injectable } from '@nestjs/common';
import { Validator } from 'src/shared/utils/validator.util';
import { MemberRepository } from './repositories/member.repository';
import { Member } from './entities/member.entity';
import { UuidDTO } from 'src/shared/dtos/uuid.dto';

@Injectable()
export class CompanyService {
  constructor(private memberRepository: MemberRepository) {}

  async getMembershipsFromUser(user_id: string): Promise<Member[]> {
    // Validate the input
    const { success, errors } = await Validator.validate(UuidDTO, { uuid: user_id });

    if (!success) throw new BadRequestException(errors);

    // Return the memberships of the user
    return await this.memberRepository.getByUserId(user_id);
  }
}
