import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isActive?: boolean;
}

export function MenuItem({ title, isActive = false, ...rest }: Props): JSX.Element {
  return (
    <Container
      isActive={isActive}
      {...rest}
    >
      <Entypo
        name={title === "Soft Skills" ? "user" : "tools"}
        color="#FFF"
        size={24}
      />


      <Title>{title}</Title>
    </Container>
  );
}