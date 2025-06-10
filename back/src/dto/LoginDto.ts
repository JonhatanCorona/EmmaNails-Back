
import { UserResponseDto } from "./UserResponseDto";

export interface Logindto {
    login: boolean;
    user: UserResponseDto | null;
}
