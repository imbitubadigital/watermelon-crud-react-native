import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Q} from '@nozbe/watermelondb';

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
  const [skill, setSkill] = useState<SkillModel>({} as SkillModel);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getSkills = async() => {
    const skillCollection = DB.get<SkillModel>('skills');

    const response = await skillCollection.query(Q.where('type', type)).fetch();

    setSkillsData(response);
  }

  useEffect(() => {
    getSkills()
  }, [type])

  const handleSave = async() => {
    if(skill.id){
      await DB.write(async()=>{
        await skill.update(data => {
          data.name = name
          data.type = type
        })
      })

      setSkill({} as SkillModel);

    }else {

      await DB.write(async () => {
        await DB.get<SkillModel>('skills').create(data => {
          data.name = name,
          data.type = type
        })
      })
    }



    bottomSheetRef.current?.collapse()
    setName('')
    Keyboard.dismiss()
    getSkills()
  }

  const handleRemove = async (item: SkillModel) => {
    await DB.write(async() => {
      await item.destroyPermanently();
    })
    getSkills()
  }

  const handleEdit = async(item: SkillModel) => {
    setSkill(item);
    setName(item.name);
    bottomSheetRef.current?.expand();
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
            onEdit={() => handleEdit(item)}
            onRemove={() => handleRemove(item)}
          />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}


        snapPoints={['2.5%', '35%']}
      >
        <Form>
          <FormTitle>{!skill.id ? 'Novo': 'Editando'}</FormTitle>

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
