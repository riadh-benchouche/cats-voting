import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class UserOwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = request.params.id;

        return user.id === userId || user.role === 'admin';
    }
}