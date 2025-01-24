import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Uk2PasswordRuleModel, Uk2PasswordValidationResult } from './models';
import { uk2PasswordRulesConstants } from './constants/constants';

@Component({
  selector: 'uk2-password-rules',
  templateUrl: './uk2-password-rules.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2PasswordRulesComponent implements OnInit, OnChanges {
  @Output() processValidation: EventEmitter<Uk2PasswordValidationResult> = new EventEmitter();
  @Input() inputToValidate: any = null;
  @Input() passwordRules: Uk2PasswordRuleModel[] = [
    new Uk2PasswordRuleModel({
      svgIconName: uk2PasswordRulesConstants.defaultIconName,
      ruleName: uk2PasswordRulesConstants.ruleName[0],
      ruleRegex: /([A-Z])/,
      ruleIsMet: false,
    }),
    new Uk2PasswordRuleModel({
      svgIconName: uk2PasswordRulesConstants.defaultIconName,
      ruleName: uk2PasswordRulesConstants.ruleName[1],
      ruleRegex: /([a-z])/,
      ruleIsMet: false,
    }),
    new Uk2PasswordRuleModel({
      svgIconName: uk2PasswordRulesConstants.defaultIconName,
      ruleName: uk2PasswordRulesConstants.ruleName[2],
      ruleRegex: /([0-9])/,
      ruleIsMet: false,
    }),
    new Uk2PasswordRuleModel({
      svgIconName: uk2PasswordRulesConstants.defaultIconName,
      ruleName: uk2PasswordRulesConstants.ruleName[3],
      ruleRegex: /^(?=.*[a-zA-Z \d#?!@$%^&*+-])(?=.*[#?!@$%^&*+-])[a-zA-Z\d#?!@$%^&*+-]+$/,
      ruleIsMet: false,
    }),
    new Uk2PasswordRuleModel({
      svgIconName: uk2PasswordRulesConstants.defaultIconName,
      ruleName: uk2PasswordRulesConstants.ruleName[4],
      ruleRegex: /(^.{8,32}$)/,
      ruleIsMet: false,
    }),
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.validatePassword(changes.inputToValidate.currentValue, this.passwordRules);
  }

  ngOnInit(): void {
    for (const rule of this.passwordRules) {
      /* istanbul ignore else */
      if (rule.ruleRegex == undefined) {
        throw new Error(uk2PasswordRulesConstants.errorRuleRegexUndefined);
      }
      /* istanbul ignore else */
      if (rule.ruleName == undefined) {
        throw new Error(uk2PasswordRulesConstants.errorRuleNameUndefined);
      }
    }
  }

  validatePassword(input: string, rules: Uk2PasswordRuleModel[]) {
    rules.map(r => this.evaluateRuleRegex(input, r));
    const validationResult = this.buildValidationResult(input, rules);
    this.processValidation.emit(validationResult);
  }

  private evaluateRuleRegex(input: string, rule: Uk2PasswordRuleModel): Uk2PasswordRuleModel {
    if (rule.ruleRegex != undefined) {
      rule.ruleIsMet = rule.ruleRegex.test(input) || false;
    } else {
      throw new Error(uk2PasswordRulesConstants.errorRuleRegexUndefined);
    }

    return rule;
  }

  private buildValidationResult(input: string, rules: Uk2PasswordRuleModel[]): Uk2PasswordValidationResult {
    const regexLeadingOrTrailingWhitespaces = /^[\s]+|[\s]+$/;
    if (regexLeadingOrTrailingWhitespaces.test(input)) {
      const validationResult = {
        allRulesPassed: false,
        forceInputErrorState: true,
        resultErrorMessage: uk2PasswordRulesConstants.resultErrorLeadingOrTrailingSpaces,
      };

      return validationResult;
    }

    let validationResult = new Uk2PasswordValidationResult(rules.every(r => r.ruleIsMet));
    let failedRules = rules.filter(r => r.ruleIsMet === false);
    for (const failedRule of failedRules) {
      const regexOnlyLetterAndDigit = /^[a-zA-Z0-9]*$/;
      if (
        input != '' &&
        failedRule.ruleName == uk2PasswordRulesConstants.ruleName[3] &&
        !regexOnlyLetterAndDigit.test(input)
      ) {
        validationResult.resultErrorMessage = uk2PasswordRulesConstants.resultErrorMessageSymbol;
        validationResult.forceInputErrorState = true;
        break;
      }
    }

    return validationResult;
  }
}
