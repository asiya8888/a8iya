import type { Visitor } from '../lib/visitors';
import { InteractionLog } from './InteractionLog';
import { VisitorFace } from './VisitorFace';

type VisitorCardProps = {
  visitor: Visitor;
  entries: string[];
  outcome?: string;
  disabled: boolean;
  onAsk: () => void;
  onLook: () => void;
  onAllow: () => void;
  onRefuse: () => void;
};

export function VisitorCard({
  visitor,
  entries,
  outcome,
  disabled,
  onAsk,
  onLook,
  onAllow,
  onRefuse,
}: VisitorCardProps) {
  return (
    <section className="visitor-card" key={visitor.id}>
      {visitor.face ? <VisitorFace face={visitor.face} /> : <div className="empty-porch">No one is there.</div>}
      <div className="visitor-copy">
        <p className="label">{visitor.groupSize > 1 ? 'Multiple visitors' : 'Someone is at the door'}</p>
        <h2>{visitor.name}</h2>
        {visitor.eventText && <p className="event-text">{visitor.eventText}</p>}
        {visitor.dialogue.map((line) => (
          <p className="quote" key={line}>
            "{line}"
          </p>
        ))}
      </div>
      <InteractionLog entries={entries} outcome={outcome} />
      <div className="choices">
        <button disabled={disabled || visitor.answers.length === 0} onClick={onAsk}>
          Ask Questions
        </button>
        <button disabled={disabled || visitor.inspections.length === 0} onClick={onLook}>
          Look Closer
        </button>
        <button disabled={disabled} onClick={onAllow}>
          Let Them In
        </button>
        <button disabled={disabled} onClick={onRefuse}>
          Refuse Entry
        </button>
      </div>
    </section>
  );
}
