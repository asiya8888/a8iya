import type { FaceFeature } from '../lib/visitors';

type VisitorFaceProps = {
  characterId?: string;
  face: FaceFeature;
  portrait?: string;
};

export function VisitorFace({ characterId, face, portrait }: VisitorFaceProps) {
  if (portrait) {
    const portraitType = characterId === 'twin-sisters'
      ? 'portrait--group'
      : portrait.includes('/random/') ? 'portrait--random' : 'portrait--main';

    return (
      <div className={`portrait portrait--photo ${portraitType}`}>
        <img alt="Visitor portrait" src={portrait} />
      </div>
    );
  }
  const eyes = face.eyes === 'three' ? [0, 1, 2] : [0, 1];

  return (
    <div className={`portrait portrait--${face.clothes} portrait--${face.lighting}`}>
      <span className="shoulders" />
      <div className={`face face--${face.eyes} face--${face.skin} face--${face.age} face--${face.expression}`}>
        <span className={`hair hair--${face.hair}`} />
        {face.shadow && <span className="face-shadow" />}
        <span className={`brow brow--left brow--${face.brows}`} />
        <span className={`brow brow--right brow--${face.brows}`} />
        {eyes.map((eye) => (
          <span className={`eye eye--${eye}`} key={eye} />
        ))}
        {face.nose === 'normal' && <span className="nose" />}
        {face.scar && <span className="scar" />}
        <span className={`mouth mouth--${face.mouth}`} />
      </div>
      {face.breath && <span className="breath" />}
    </div>
  );
}
