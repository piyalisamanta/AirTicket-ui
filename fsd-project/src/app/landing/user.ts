export interface User {
    emailAddress: string,
    password: string,
    confirmPassword: string;
    userError?: string;
    passCount: number;
}