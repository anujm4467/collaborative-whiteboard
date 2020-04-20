/* eslint-disable react/prop-types */
import React from 'react';
import { CutRange } from '../../models';

export interface CutUiProps {
  cutLength?: number;
  cutRange?: CutRange;
  cutRangeHandler?: (cutRange: CutRange) => void;
  cutHandler?: (cutRange: CutRange) => void;
}

const CutUi: React.FC<CutUiProps> = ({
  cutLength,
  cutRange: [from, to],
  cutRangeHandler,
  cutHandler
}) => {
  const lastPosition = Math.max(1, cutLength);
  const position = from + 1;
  const spread = to - from + 1;

  const getCutRange = (newPosition: number, newSpread: number): CutRange => {
    const newFrom = newPosition - 1;
    const newTo = newFrom + newSpread - 1;
    return [newFrom, newTo];
  };

  const positionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = +event.target.value;
    cutRangeHandler(getCutRange(newPosition, spread));
  };

  const spreadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpread = +event.target.value;
    cutRangeHandler(getCutRange(position, newSpread));
  };

  const cutBtnHandler = () => cutHandler(getCutRange(position, spread));

  return (
    <>
      <div className="cw-control">
        <div className="cw-control__label">
          <span className="cw-control__label-inner">Position</span>
        </div>
        <input
          className="cw-control__field"
          type="range"
          min="1"
          max={lastPosition}
          value={position}
          onChange={positionHandler}
        />
        <span className="cw-control__number">{position}</span>
      </div>
      <div className="cw-control">
        <div className="cw-control__label">
          <span className="cw-control__label-inner">Spread</span>
        </div>
        <input
          className="cw-control__field"
          type="range"
          min="1"
          max={lastPosition}
          value={spread}
          onChange={spreadHandler}
        />
        <span className="cw-control__number">{spread}</span>
      </div>
      <div className="cw-control">
        <button
          type="button"
          className="cw-control__button"
          onClick={cutBtnHandler}
        >
          Cut
        </button>
      </div>
    </>
  );
};

CutUi.defaultProps = {
  cutLength: 1,
  cutRange: [0, 0],
  cutRangeHandler: () => {},
  cutHandler: () => {}
};

export default CutUi;