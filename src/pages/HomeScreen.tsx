import { View, Text, Dimensions, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import Carousel from "../components/carousel"
import { fetchParticipationIdByUserId, fetchTop3Challenge } from "../db/api/challenge"
import { DefaultTheme } from "styled-components/native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

export default function HomeScreen() {
  const [mychallenge, setMyChallenge] = useState<any>([]);
  const [top3Challenge, setTop3Challenge] = useState<any>([]);
  const isFocused = useIsFocused();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const screenWidth = Math.round(Dimensions.get("window").width)

  const getTop3Challenge = async () => {
    const challengeData = await fetchTop3Challenge();

    const newIsLiked: { [key: number]: boolean } = {};
    const newLikeCount: { [key: number]: number } = {};
    challengeData.forEach((challenge) => {
      newIsLiked[challenge.challenge_id] = challenge.challenge_like.some(like => like.user_id === user?.id);
      newLikeCount[challenge.challenge_id] = challenge.challenge_like.length;
  });

    setTop3Challenge(challengeData);
  }

  const getMyChallenges = async (uuid: string | null) => {
    if (uuid) {
      const challengeData = await fetchParticipationIdByUserId(uuid);
      setMyChallenge(challengeData)
    }
  }

  useEffect(() => {
    if (user) {
      getTop3Challenge();
      getMyChallenges(user.id);
    }
  }, [user]);

  return (
    <View>
      <View style={{ paddingLeft: 30 }}>
        <Title>Best Challenges!</Title>
      </View>
      <Carousel gap={8} offset={8} pages={top3Challenge} pageWidth={screenWidth - (8 + 8) * 2} />
      <View style={{ paddingLeft: 30 }}>
        <Title>My Challenges!</Title>
      </View>
      <View style={{ padding: 15 }}>
        {mychallenge.length > 0 ? (
          mychallenge.map((item : any, index : number) => (
            <TouchableOpacity key={item.challenge.challenge_id} onPress={() => navigation.navigate('ChallengeDetail',
              {challengeId: item.challenge.challenge_id as number, title: item.challenge.title as string})
              }>
            <CardContainer key={index}>
              <CardItem>
                <Text style={{ fontWeight: "bold", width: "35%", marginRight: "auto" }}>{item.challenge.title}</Text>
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
              <Circle />
            </CardContainer>
            </TouchableOpacity>
          ))
        ) : (
          <EmptyCardContainer>
              <EmptyCardItem>
                <Text style={{ fontWeight: "bold"}}>현재, 참여하고 있는 챌린지가 없습니다.</Text>
                <Text style={{ fontWeight: "bold"}}>챌린지에 도전해보세요!</Text>
                <ChallengeButton>
                  <Text style={{color:'#FFFFFF'}}>도전</Text>
                </ChallengeButton>
              </EmptyCardItem>
              <EmptyCircle />
            </EmptyCardContainer>
        )}
      </View>
    </View>
  )
}

// ------------------- style ------------------- //
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`

const CardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  elevation: 1;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`

const CardItem = styled.View`
  padding: 30px 20px 30px 20px;
  display: flex;
  flex-direction: row;
`

const EmptyCardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  elevation: 1;
  margin-bottom: 10px;
  overflow: hidden;
`

const EmptyCardItem = styled.View`
  padding: 30px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const WeekBox = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

const WeekDays = styled.Text`
  background-color: ${({ theme } : DefaultTheme)=> theme.color.main};
  color: #ffffff;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
`

const Weekend = styled.Text`
  background-color: ${({ theme } : DefaultTheme)=> theme.color.sub};
  color: #ffffff;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
`

const Circle = styled.View`
  width: 20%;
  height: 100%;
  border-radius: 50px;
  background-color: #ffeee5;
  position: absolute;
  right: -7%;
`

const EmptyCircle = styled.View`
  width: 40%;
  height: 100%;
  border-radius: 300px;
  background-color: #ffeee5;
  position: absolute;
  right: -20%;
`

const ChallengeButton = styled.TouchableOpacity`
    padding: 5px 30px;
    background-color: #FFBE98;
    border-radius: 15px;
    height: 35px;
    width: 90px;
`;
