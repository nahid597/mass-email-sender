import { IsNotEmpty, IsString, Validate } from 'class-validator';

function isValidEmail(email: string): boolean {
  // a@a.com
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidEmails(emails: string): boolean {
  const emailArray = emails.split(',');

  for (const email of emailArray) {
    if (!isValidEmail(email.trim())) {
      return false;
    }
  }

  return true;
}

export class EmailSenderDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(isValidEmails)
  emails: string;
}
