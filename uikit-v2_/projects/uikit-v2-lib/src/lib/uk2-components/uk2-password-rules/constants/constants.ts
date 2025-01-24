export const uk2PasswordRulesConstants = {
  defaultIconName: 'uk2-check-circle',
  resultErrorMessage: 'Password requirements not met',
  resultErrorMessageSymbol: 'Invalid symbol',
  resultErrorLeadingOrTrailingSpaces: 'Leading or trailing spaces not allowed',
  errorRuleNameUndefined: "Please provide a ruleName to passwordRules, ruleName can't be undefined",
  errorRuleRegexUndefined: "Please provide a ruleRegex to passwordRules, ruleRegex can't be undefined",
  ruleName: [
    'One uppercase letter',
    'One lowercase letter',
    'One number',
    'One valid symbol (#?!@$%^&*+-)',
    '8-32 characters',
  ],
};
