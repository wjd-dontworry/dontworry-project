import { View, Text, Dimensions, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { Tables } from "../db/types/supabase"
import styled from "styled-components/native"
import Carousel from "../components/carousel"
import { fetchChallengeById, fetchTop3Challenge } from "../db/api/challenge"
import { supabase } from "../db/supabase"
import { DefaultTheme } from "styled-components/native"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/navigation"

export default function HomeScreen() {
  const [mychallenge, setMyChallenge] = useState<Tables<"challenge">[]>([]);
  const [top3Challenge, setTop3Challenge] = useState<any>([]);
  const [userUUID, setUserUUID] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});
  const isFocused = useIsFocused();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const screenWidth = Math.round(Dimensions.get("window").width)

  const getTop3Challenge = async () => {
    const challengeData = await fetchTop3Challenge();
    console.log(challengeData);

    const newIsLiked: { [key: number]: boolean } = {};
    const newLikeCount: { [key: number]: number } = {};
    challengeData.forEach((challenge) => {
      newIsLiked[challenge.challenge_id] = challenge.challenge_like.some(like => like.user_id === userUUID);
      newLikeCount[challenge.challenge_id] = challenge.challenge_like.length;
  });
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    setTop3Challenge(challengeData);
  }

  const getUserUUID = async (): Promise<string | null> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error("Error fetching user:", error)
      return null
    }
    return user?.id || null
  }

  const fetchUserUUID = async () => {
    const uuid = await getUserUUID()
    setUserUUID(uuid)

    return uuid
  }

  const getMyChallenges = async (uuid: string | null) => {
    if (uuid) {
      const challengeData = await fetchChallengeById(uuid)
      setMyChallenge(challengeData)
    }
  }

  useEffect(() => {
    if (isFocused) {
    getTop3Challenge();
    fetchUserUUID().then(result => getMyChallenges(result))
  }
  }, [isFocused])

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
          mychallenge.map((item, index) => (
            <TouchableOpacity key={item.challenge_id} onPress={() => navigation.navigate('ChallengeDetail',
              {challengeId: item.challenge_id as number, title: item.title as string})
              }>
            <CardContainer key={index}>
              <CardItem>
                <Text style={{ fontWeight: "bold", width: "35%", marginRight: "auto" }}>{item.title}</Text>
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
          <Text>데이터가 없습니다.</Text>
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
`
