/**
 * Use this class to standardize the response of your API, use it in your controllers as the return value of your methods.
 */
export default class ApiStandardResponse {
  constructor(
    private readonly data: any,
    private readonly message: string | undefined = '',
  ) {
    this.data = data;
    this.message = this.getMessageWithCapitalizedFirstLetter(message);
  }

  getMessageWithCapitalizedFirstLetter(message: string): string {
    return message.charAt(0).toUpperCase() + message.slice(1);
  }
}
