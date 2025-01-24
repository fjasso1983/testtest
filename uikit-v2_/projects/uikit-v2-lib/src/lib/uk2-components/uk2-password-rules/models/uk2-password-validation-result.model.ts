export class Uk2PasswordValidationResult {
  allRulesPassed: boolean;
  forceInputErrorState = false;
  resultErrorMessage: string | undefined = 'Password requirements not met';

  constructor(allRulesPassed: boolean = false) {
    this.allRulesPassed = allRulesPassed;
  }
}
