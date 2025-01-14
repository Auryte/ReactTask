import { ERRORS } from '../constants/errors';
import { VALIDATORS_STRINGS } from '../constants/validatorStrings';
import { VALIDATOR } from '../constants/validator';

interface ValidatorItem {
  valName: string;
  param: number;
}

export const isInputValid = (name: string, value: string): string => {
  const inputMessage: string[] = [];
  const inputValidators = VALIDATORS_STRINGS[name];
  inputValidators.forEach((validator: ValidatorItem): void => {
    if (VALIDATOR[validator.valName](value, validator.param)) {
      inputMessage.push(ERRORS[validator.valName](name, validator.param));
    }
  });
  const formatedInputMessage = inputMessage.join(' ');
  return formatedInputMessage;
};
