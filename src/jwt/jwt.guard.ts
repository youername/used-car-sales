import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/const';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HTTP 요청 객체를 가져옵니다.
    const request = context.switchToHttp().getRequest();
    // 헤더에서 토큰을 추출합니다.
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // 토큰이 없으면 UnauthorizedException을 발생시킵니다.
      throw new UnauthorizedException();
    }
    try {
      // 토큰을 검증하고 페이로드를 가져옵니다.
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 페이로드를 요청 객체에 할당하여 라우트 핸들러에서 접근할 수 있도록 합니다.
      request['user'] = payload;
    } catch {
      // 토큰 검증에 실패하면 UnauthorizedException을 발생시킵니다.
      throw new UnauthorizedException();
    }
    // 요청이 유효하면 true를 반환합니다.
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Authorization 헤더에서 토큰을 추출합니다.
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // 토큰 타입이 'Bearer'인 경우에만 토큰을 반환합니다.
    return type === 'Bearer' ? token : undefined;
  }
}
