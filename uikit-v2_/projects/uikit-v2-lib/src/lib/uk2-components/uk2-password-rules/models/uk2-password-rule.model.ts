import { uk2PasswordRulesConstants } from '../constants/constants';

export class Uk2PasswordRuleModel {
  svgIconName;
  ruleName: string | undefined = undefined;
  ruleRegex: RegExp | undefined;
  ruleIsMet: Boolean;

  constructor(uk2PasswordRule?: any) {
    uk2PasswordRule = uk2PasswordRule || {};
    this.svgIconName = uk2PasswordRule.svgIconName || uk2PasswordRulesConstants.defaultIconName;
    this.ruleName = uk2PasswordRule.ruleName || undefined;
    this.ruleRegex = uk2PasswordRule.ruleRegex || undefined;
    this.ruleIsMet = uk2PasswordRule.ruleIsMet || false;
  }
}
