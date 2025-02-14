// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { IS_PUBLIC_KEY } from 'src/decorators/setMetaData.decorator';

// @Injectable()
// // ...existing code...
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   // 인증을 우회할 수 있는 메타데이터(IS_PUBLIC_KEY)를 확인합니다.
//   canActivate(context: ExecutionContext) {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     return super.canActivate(context);
//   }
// }
// // ...existing code...
