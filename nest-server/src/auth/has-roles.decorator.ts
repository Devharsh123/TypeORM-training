import { SetMetadata } from "@nestjs/common";
import { userRole } from "src/users/entities/user.entity";

export const HasRoles = (...roles:userRole[]) => SetMetadata('role',roles);