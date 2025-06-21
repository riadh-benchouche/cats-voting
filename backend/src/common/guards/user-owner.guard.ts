import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class UserOwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const targetUserId = request.params.userId;

        return user.id === targetUserId || user.role === 'admin';
    }
}