import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { heroSliderStyles } from '@/components/Hero-slider/hero-slider.styles';
import { ProgressContainerProps } from '@/components/Progress-container/progress-container.types';

const ProgressContainer: FC<ProgressContainerProps> = ({ slidesCount, currentIndex, progress }) => {
  const progressIds = useMemo(
    () => Array.from({ length: slidesCount }, (_, i) => `progress-${Math.random()}-${i}`),
    [slidesCount]
  );

  return (
    <View style={heroSliderStyles.progressContainer}>
      {Array.from({ length: slidesCount }).map((_, index) => (
        <View key={progressIds[index]} style={heroSliderStyles.progressBarBackground}>
          <View
            style={[
              heroSliderStyles.progressBarFill,
              {
                width:
                  index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

export default ProgressContainer;
