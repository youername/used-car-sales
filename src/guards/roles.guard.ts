import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// RolesGuard는 Reflector를 사용해 엔드포인트에 설정된 'roles' 메타데이터를 가져옵니다.
// 만약 메타데이터가 없다면 모든 사용자에게 접근을 허용합니다.
// 설정된 역할이 있다면, req.user의 roles 배열과 비교하여 사용자가 해당 역할을 가지고 있으면 true를 반환합니다.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // 권한 설정이 없으면 접근 허용
    }
    const { user } = context.switchToHttp().getRequest();
    // 수정: requiredRoles의 각 role이 user.roles 배열에 포함되어 있는지 확인
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
