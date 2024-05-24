import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../db/supabase';
import { Tables } from '../db/types/supabase';
import styled from "styled-components/native";
import Carousel from '../components/carousel';

export default function HomeScreen() {
  const [challenge, setChallenge] = useState<Tables<'challenge'>[]>([]);

  //캐러셀
  const screenWidth = Math.round(Dimensions.get('window').width);
  const PAGES = [
    {
      index: 1,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
      viewCount: 12,
    },
    {
      index: 2,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
      viewCount: 12,
    },
    {
      index: 3,
      title: '홍길동 자바 마스터 챌린지',
      writer: '홍길동',
      likeCount: 0,
      writeDateTime: '2024.05.10',
      viewCount: 12,
    }
  ];


  const fetchUserById = async () => {
    try {
      const { data, error } = await supabase
        .from('challenge')
        .select('*')
        .returns<Tables<'challenge'>[]>();

      if (error) {
        console.log('Error :', error);
        return [];
      }

      return data;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

  useEffect(() => {
    const getChallenges = async () => {
      const challengeData = await fetchUserById();
      console.log(challengeData);
      setChallenge(challengeData);
    };

    getChallenges()
  }, []);

  return (
    <View>
      <View style={{paddingLeft:30}}>
        <Title>Best Challenges!</Title>
      </View>
      <Carousel
          gap={8}
          offset={8}
          pages={PAGES}
          pageWidth={screenWidth - (8 + 8) * 2}
        />  
      <View style={{paddingLeft:30}}>
        <Title>My Challenges!</Title>
      </View>
      <View style={{padding:15}}>
        {challenge.length > 0 ? (
            challenge.map((item, index) => (
              <CardContainer key={index}>
                <CardItem>
                  <Text style={{fontWeight:'bold',  width: '35%', marginRight:'auto'}}>{item.title}</Text>
                  <WeekBox>
                    <Weekend>일</Weekend>
                    <WeekDays>월</WeekDays>
                    <WeekDays>화</WeekDays>
                    <WeekDays>수</WeekDays>
                    <WeekDays>목</WeekDays>
                    <WeekDays>금</WeekDays>
                    <Weekend>토</Weekend>
                  </WeekBox>
                </CardItem>
                <Circle/>
              </CardContainer>
            ))
          ) : (
            <Text>데이터가 없습니다.</Text>
          )}
      </View>
    </View>
  );
}


// ------------------- style ------------------- //
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom:10px;
`;

const CardContainer = styled.View`
  background-color: #FFFFFF;
  border-radius: 20px;
  elevation: 1;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const CardItem = styled.View`
  padding: 30px 20px 30px 20px;
  display: flex;
  flex-direction: row;
`;

const WeekBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const WeekDays = styled.Text`
  background-color: #FFBE98;
  color: #FFFFFF;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
`;

const Weekend = styled.Text`
  background-color: #FF8741;
  color: #FFFFFF;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
`;

const Circle = styled.View`
  width: 20%;
  height: 100%;
  border-radius: 50px;
  background-color: #FFEEE5;
`;