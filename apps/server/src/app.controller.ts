import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('root')
  @ApiResponse({ status: 200, description: 'The server is running' })
  @ApiResponse({ status: 500, description: 'The server is down' })
  @Get('/health')
  getHealth() {
    return 'OK';
  }
}
