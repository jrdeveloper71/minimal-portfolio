import React, { useState } from 'react';
import './screenshots-slider.styles.scss';
// Modules
import usePrevious from '../../../utils/usePrevious';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const ScreenshotsSlider = ({ screenshots: { desktop, mobile } }) => {
  const [index, setIndex] = useState(desktop.length * 10000);
  const prevIndex = usePrevious(index);
  const isNextSlide = prevIndex < index;

  const transition = useTransition(desktop[index % desktop.length], null, {
    initial: {
      opacity: 1,
      transform: 'translateX(0px)'
    },
    from: isNextSlide ? rightPosHidden : leftPosHidden,
    enter: centerPosShown,
    leave: isNextSlide ? leftPosHidden : rightPosHidden,
    config: {
      mass: 1.3,
      clamp: true
    }
  });

  const nextSlide = () => setIndex(index + 1);
  const previousSlide = () => setIndex(index - 1);

  return (
    <div className="screenshots-slider">
      {transition.map(({ item, key, props }) => (
        <animated.img
          className="screenshot-item"
          style={props}
          src={item}
          key={key}
          alt="screenshot"
        />
      ))}
      <div className="arrows">
        <div className="left-arrow" onClick={previousSlide}>
          <Icon icon="chevron-left" />
        </div>
        <div className="zoom-in" />
        <div className="right-arrow" onClick={nextSlide}>
          <Icon icon="chevron-right" />
        </div>
      </div>
    </div>
  );
};

export default ScreenshotsSlider;

const rightPosHidden = {
  opacity: 0,
  transform: 'translateX(200px)'
};

const centerPosShown = {
  opacity: 1,
  transform: 'translateX(0px)'
};

const leftPosHidden = {
  opacity: 0,
  transform: 'translateX(-200px)'
};
