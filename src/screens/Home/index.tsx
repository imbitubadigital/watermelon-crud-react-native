import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { Menu, MenuTypeProps } from '../../components/Menu';
import { Skill } from '../../components/Skill';
import { Button } from '../../components/Button';

import { Container, Title, Input, Form, FormTitle } from './styles';
import { DB } from '../../database';
import { SkillModel } from '../../database/models/skill.model';

export function Home() {
  const [type, setType] = useState<MenuTypeProps>("soft");
  const [name, setName] = useState('');
  const [skillsData, setSkillsData] = useState<SkillModel[]>([]);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);



//  console.log('aaa', skillsData);

  const getSkills = async() => {
    const skillCollection = DB.get<SkillModel>('skills');

    const response = await skillCollection.query().fetch();

    setSkillsData(response);
  }

  useEffect(() => {
    getSkills()
  }, [])

  const handleSave = async() => {
    await DB.write(async () => {
      await DB.get<SkillModel>('skills').create(data => {
        data.name = name,
        data.type = type
      })
    })

    Alert.alert('Criado com sucesso.')

    bottomSheetRef.current?.collapse()
  }

  return (
    <Container>
      <Title>About me</Title>
      <Menu
        type={type}
        setType={setType}
      />

      <FlatList
        data={skillsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Skill
            data={item}
            onEdit={() => { }}
            onRemove={() => { }}
          />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}


        snapPoints={['2.5%', '35%']}
      >
        <Form>
          <FormTitle>New</FormTitle>

          <Input
            placeholder="New skill..."
            onChangeText={setName}
            value={name}
          />

          <Button
            title="Save"
            onPress={handleSave}
          />
        </Form>
      </BottomSheet>
    </Container>
  );
}
