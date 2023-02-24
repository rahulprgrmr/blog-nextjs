import { toTitleCase } from "./string";

export function validate(
  data: Object,
  validationRules: Object,
  validationErrorMessages?: Object
): Object {
  let errors = {};
  for (const [field, value] of Object.entries(data)) {
    const inputValidationRules = validationRules[field as keyof typeof data]
      ? validationRules[field as keyof typeof data].toString()
      : "";
    if (inputValidationRules == "") {
      continue;
    }

    const inputValidationRulesList = inputValidationRules.split("|");
    inputValidationRulesList.forEach((validationRule) => {
      switch (validationRule) {
        case "required":
          if (!value || value.length < 1) {
            const errorMessage =
              validationErrorMessages &&
              validationErrorMessages[
                `${field}.required` as keyof typeof validationErrorMessages
              ]
                ? validationErrorMessages[
                    `${field}.required` as keyof typeof validationErrorMessages
                  ]
                : `${toTitleCase(
                    field.replaceAll("_", " ")
                  )} should not be empty.`;
            errors = {
              ...errors,
              [field]: errorMessage,
            };
          }
          break;
        case "confirmed":
          if (
            data[field as keyof typeof data] !=
            data[`${field}_confirmation` as keyof typeof data]
          ) {
            const errorMessage =
              validationErrorMessages &&
              validationErrorMessages[
                `${field}.confirmed` as keyof typeof validationErrorMessages
              ]
                ? validationErrorMessages[
                    `${field}.confirmed` as keyof typeof validationErrorMessages
                  ]
                : `${toTitleCase(
                    field.replaceAll("_", " ")
                  )} confirmation does not match.`;
            errors = {
              ...errors,
              [field]: errorMessage,
            };
          }
          break;
      }
    });
  }
  return errors;
}
