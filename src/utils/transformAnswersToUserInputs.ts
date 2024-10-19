export type UserInputs = {
  hairType: string;
  washFrequency: string;
  benefit: string;
  concern: string;
  hairColor: string;
};

type StoredAnswers = {
  [key: string]: string;
};

const questionIdToKeyMap: { [key: string]: keyof UserInputs } = {
  1: "hairType",
  2: "washFrequency",
  3: "benefit",
  4: "concern",
  5: "hairColor",
};

export function transformAnswersToUserInputs(
  storedAnswers: StoredAnswers
): UserInputs {
  const userInputs = {} as UserInputs;

  Object.keys(storedAnswers).forEach((questionId) => {
    const key = questionIdToKeyMap[questionId];
    if (key) {
      userInputs[key] = storedAnswers[questionId];
    }
  });

  return userInputs;
}
