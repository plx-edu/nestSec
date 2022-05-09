import { SetMetadata } from "@nestjs/common";

// Enable authentication globally (2)
// note to self: custom decorator
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);