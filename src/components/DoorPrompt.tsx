type DoorPromptProps = {
  onLook: () => void;
};

export function DoorPrompt({ onLook }: DoorPromptProps) {
  return (
    <section className="door-prompt">
      <p className="label">A knock at the door</p>
      <h2>Someone is outside.</h2>
      <p>Three slow knocks. Then silence.</p>
      <div className="choices door-choices">
        <button onClick={onLook} type="button">Look through the peephole</button>
      </div>
    </section>
  );
}
