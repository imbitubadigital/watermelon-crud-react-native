import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';


interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {

  return (
    <S.Container activeOpacity={0.7} {...rest}>
      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  );
}