import type { CharacterQuestion, QuestionKey } from './questions';
import type { VisitorKind } from './visitors';

export type ConversationProfile = CharacterQuestion[];

export function answerQuestion(
  name: string,
  kind: VisitorKind,
  profile: ConversationProfile,
  key: QuestionKey,
  repeated: boolean,
) {
  void name;
  void kind;
  if (repeated) return 'I already answered that.';
  return profile.find((question) => question.id === key)?.answer ?? 'I would rather not answer that.';
}
