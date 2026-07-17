import { snowStyle } from '../lib/snow';
import type { RoomId } from '../lib/rooms';

type CabinSceneProps = {
  room: RoomId;
};

function LivingRoom() {
  return (
    <>
      <p className="room-title">Living Room</p>
      <div className="fireplace" aria-hidden="true">
        <span className="fire" />
      </div>
      <div className="window-frame">
        <div className="window">
          <div className="moon" />
          {Array.from({ length: 36 }, (_, index) => (
            <span
              className="snowflake"
              key={index}
              style={snowStyle(index)}
            />
          ))}
          <span className="window-frost" />
        </div>
        <span className="window-sill" />
      </div>
      <div className="door-frame">
        <div className="door">
          <span className="door-grain" />
          <div className="door-panel" />
          <div className="door-panel" />
          <span className="peephole" />
          <span className="lock-plate" />
          <span className="knob" />
          <span className="hinge hinge-top" />
          <span className="hinge hinge-bottom" />
        </div>
      </div>
      <div className="cabin-trim" />
      <div className="floor-light" />
    </>
  );
}

function Kitchen() {
  return (
    <>
      <p className="room-title">Kitchen</p>
      <div className="kitchen-window">
        {Array.from({ length: 18 }, (_, index) => <span className="snowflake" key={index} style={snowStyle(index + 40)} />)}
      </div>
      <div className="kitchen-cabinets" />
      <div className="kitchen-counter">
        <span className="sink" />
        <span className="stove" />
      </div>
      <div className="fridge" />
      <div className="table">
        <span className="chair chair-left" />
        <span className="chair chair-right" />
        <span className="mug" />
      </div>
    </>
  );
}

function Bedroom() {
  return (
    <>
      <p className="room-title">Bedroom</p>
      <div className="bedroom-window">
        {Array.from({ length: 18 }, (_, index) => <span className="snowflake" key={index} style={snowStyle(index + 70)} />)}
      </div>
      <div className="bed">
        <span className="pillow" />
        <span className="blanket" />
      </div>
      <div className="nightstand">
        <span className="lamp" />
      </div>
      <div className="closet-door" />
    </>
  );
}

export function CabinScene({ room }: CabinSceneProps) {
  return (
    <section className={`cabin cabin--${room}`} aria-label={`Cabin ${room}`}>
      <div className="wall-planks" aria-hidden="true" />
      {room === 'living' && <LivingRoom />}
      {room === 'kitchen' && <Kitchen />}
      {room === 'bedroom' && <Bedroom />}
      <div className="ash-specks" aria-hidden="true">
        {Array.from({ length: 36 }, (_, index) => (
          <span
            key={index}
            style={{
              animationDelay: `${(index % 9) * 0.4}s`,
              left: `${(index * 37) % 100}%`,
              top: `${(index * 29) % 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
