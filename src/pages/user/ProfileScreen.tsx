import styled from "styled-components/native"
import { useEffect, useState } from "react"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { fetchParticipationIdByUserId } from "../../db/api/challenge"
import { supabase } from "../../db/supabase"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { AppDispatch, RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/actions/userActions"
import Icon from "react-native-vector-icons/FontAwesome"
import DownIcon from "react-native-vector-icons/AntDesign"
import OctiIcon from "react-native-vector-icons/Octicons"
import * as Progress from "react-native-progress"
import { ChallengeWithUser } from "../../redux/actions/challengeActions"

type RootStackParamList = {
  Home: undefined
  Login: undefined
  UserUpdate: undefined
}

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, error } = useSelector((state: RootState) => state.challengeReducer)
  const [isGoalOpen, setIsGoalOpen] = useState(false)
  const [isLikeOpen, setIsLikeOpen] = useState(false)
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({})
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({})
  const [challenge, setChallenge] = useState<ChallengeWithUser[]>([])
  const [mychallenge, setMyChallenge] = useState<any>([])

  const dispatch: AppDispatch = useDispatch()

  // test유저가 올린 전체 글에 대한 전체 공감수 쿼리 수정 필요
  // 현재 email 불러오는데 auth에서 현재 불러오는데 userName, profile_image redux에서 불러올 수 있도록

  const MemberOut = async () => {
    try {
      const {
        data: { user },
        error: getUserError,
      } = await supabase.auth.getUser()

      if (getUserError) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", getUserError)
        return
      }

      if (user) {
        const { error: deleteUserError } = await supabase.rpc("delete_user")
        if (deleteUserError) {
          console.error("회원 탈퇴 중에 문제가 생겼습니다:", deleteUserError.message)
        } else {
          alert("회원 탈퇴 되었습니다")
          navigation.navigate("Home")
        }
      } else {
        alert("사용자 정보를 가져올 수 없습니다.")
      }
    } catch (error) {
      console.error("회원 탈퇴 중 예기치 않은 오류 발생:", error)
      alert("회원 탈퇴 중에 문제가 생겼습니다.")
    }
  }

  const LogOut = async () => {
    dispatch(logout())
    navigation.navigate("Login")
  }

  const toggleGoalBox = () => setIsGoalOpen(prevState => !prevState)

  const toggleLikeBox = () => setIsLikeOpen(prevState => !prevState)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error || !session) {
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.")
        navigation.navigate("Login")
      }
    }

    checkSession()
  }, [navigation])

  const getMyLikeChallenges = async (orderBy: string, ascending: boolean) => {
    const challengeData = data
    console.log(challengeData)

    const newIsLiked: { [key: number]: boolean } = {}
    const newLikeCount: { [key: number]: number } = {}

    challengeData.forEach((challenge: ChallengeWithUser) => {
      newIsLiked[challenge.challenge_id] = challenge.challenge_like.some(like => like.user_id === user?.id)
      newLikeCount[challenge.challenge_id] = challenge.challenge_like.length
    })
    setIsLiked(newIsLiked)
    setLikeCount(newLikeCount)

    setChallenge(challengeData)
  }

  const getMyChallenges = async (uuid: string | null) => {
    if (uuid) {
      const challengeData = await fetchParticipationIdByUserId(uuid)
      setMyChallenge(challengeData)
    }
  }

  useEffect(() => {
    if (user) {
      getMyLikeChallenges("created_at", true)
      getMyChallenges(user.id)
    }
  }, [user])

  return (
    <ProfileTopBox>
      <ProfileBox>
        {user?.user_metadata.profile_image ? <UserProfile name="user-circle" /> : <UserProfile name="user-circle" />}
        <UserInfoBox>
          <Text>
            <UserNameLabel>{user?.user_metadata.username || ""}</UserNameLabel> <UserHelloLabel>님 {"\n"}안녕하세요</UserHelloLabel>
          </Text>
          <ButtonBox>
            <Button onPress={() => navigation.navigate("UserUpdate")}>
              <Text>회원정보 수정</Text>
              <Icon name="chevron-right" size={16} />
            </Button>
            <Button onPress={() => MemberOut()}>
              <Text>회원탈퇴</Text>
              <Icon name="chevron-right" size={16} />
            </Button>
          </ButtonBox>
        </UserInfoBox>
      </ProfileBox>
      <UserDataBox>
        <SliderAreaBox>
          <DropBox>
            <SlideBox>
              <GoalPercentText>달성률 확인하기</GoalPercentText>
              <DownIcon name="caretdown" size={15} onPress={() => toggleGoalBox()} />
            </SlideBox>
            {isGoalOpen && (
              <ShowSlideBox>
                <ChallengeGoalOuterListBox>
                  {mychallenge.length > 0 ? (
                    mychallenge.map((item: any, index: number) => (
                      <View key={item.challenge.challenge_id}>
                        <ChallengeGoalInnerListBox>
                          <ChallengeTextBox>
                            <ChallengeText>{item.challenge.title}</ChallengeText>
                          </ChallengeTextBox>
                          <ProgressBarBox>
                            <DataBox>
                              <GoalText>주간 달성률</GoalText>
                              <PercentText>50%</PercentText>
                              <ProgressBarData progress={0.5} color="#FFBE98" />
                            </DataBox>
                            <DataBox>
                              <GoalText>월간 달성률</GoalText>
                              <PercentText>30%</PercentText>
                              <ProgressBarData progress={0.3} color="#FFBE98" />
                            </DataBox>
                          </ProgressBarBox>
                        </ChallengeGoalInnerListBox>
                        <NextChallengeBox />
                      </View>
                    ))
                  ) : (
                    <>
                      <EmptyDataBox>
                        <EmptyText>아직 도전 중인 챌린지가 없습니다.</EmptyText>
                        <EmptyText>도전해보세요!</EmptyText>
                      </EmptyDataBox>
                    </>
                  )}
                </ChallengeGoalOuterListBox>
              </ShowSlideBox>
            )}
          </DropBox>
        </SliderAreaBox>
        <SliderAreaBox>
          <DropBox>
            <SlideBox>
              <GoalPercentText>내가 받은 공감 챌린지</GoalPercentText>
              <DownIcon name="caretdown" size={12} onPress={() => toggleLikeBox()} />
            </SlideBox>
            {isLikeOpen && (
              <ShowSlideBox>
                <MyBoardOuterListBox>
                  {data.length > 0 ? (
                    data.map((item: any, index: number) => (
                      <View key={index}>
                        <MyBoardInnerListBox>
                          <ListDataBox>
                            <BoardText>{item.title}</BoardText>
                          </ListDataBox>
                          <LikeDataBox>
                            <OctiIcon name="heart-fill" size={12} />
                            <LikedChallengesList>{likeCount[item.challenge_id as number]}</LikedChallengesList>
                          </LikeDataBox>
                        </MyBoardInnerListBox>
                        <NextChallengeBox />
                      </View>
                    ))
                  ) : (
                    <>
                      <EmptyDataBox>
                        <EmptyText>아직 공감을 받은 게시글 없습니다.</EmptyText>
                        <EmptyText>도전해보세요!</EmptyText>
                      </EmptyDataBox>
                    </>
                  )}
                </MyBoardOuterListBox>
              </ShowSlideBox>
            )}
          </DropBox>
        </SliderAreaBox>
      </UserDataBox>
      <LogOutBox>
        <Button onPress={() => LogOut()}>
          <Text>로그아웃</Text>
          <Icon name="chevron-right" size={16} />
        </Button>
      </LogOutBox>
    </ProfileTopBox>
  )
}

// ------------------- style ------------------- //

const ProfileTopBox = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  align-items: center;
`

const ProfileBox = styled.View`
  width: 85%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const UserProfile = styled(Icon)`
  font-size: 50px;
`

const UserInfoBox = styled(View)`
  flex-direction: column;
  gap: 10px;
`

const ButtonBox = styled(View)`
  flex-direction: row;
  gap: 15px;
`

const UserNameLabel = styled(Text)`
  font-size: 16px;
  font-family: "LINE Seed Sans KR";
  font-weight: 700;
`

const UserHelloLabel = styled(Text)`
  font-size: 16px;
  font-family: "LINE Seed Sans KR";
`

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const UserDataBox = styled(View)`
  width: 100%;
  height: 70%;
  align-items: center;
  flex-direction: column;
  background-color: #f1f1f1;
`

const SliderAreaBox = styled(View)`
  width: 100%;
  height: 50%;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const DropBox = styled(View)`
  width: 90%;
  height: 90%;
`

const SlideBox = styled(View)`
  height: 20%;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`

const GoalPercentText = styled(Text)`
  font-family: "LINE Seed Sans KR";
  font-size: 15px;
  font-weight: 600;
`

const ShowSlideBox = styled(View)`
  width: 90%;
  height: 80%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 20px;
`

const ChallengeGoalOuterListBox = styled(ScrollView)`
  width: 90%;
  margin: 20px auto;
`

const ChallengeGoalInnerListBox = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 5px;
`

const ChallengeTextBox = styled(View)`
  width: 25%;
  justify-content: center;
  align-items: center;
`

const ChallengeText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const ProgressBarBox = styled(View)`
  gap: 5px;
  width: 70%;
  flex-direction: column;
`

const DataBox = styled(View)`
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const GoalText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const PercentText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const ProgressBarData = styled(Progress.Bar)`
  width: 50%;
  height: 50%;
  background-color: #ffeee5;
`

const NextChallengeBox = styled(View)`
  width: 100%;
  border: 2px solid #ffebe0;
  border-radius: 20%;
  margin-top: 8px;
  margin-bottom: 8px;
`

const MyBoardOuterListBox = styled(ScrollView)`
  width: 90%;
  margin: 20px auto;
`

const MyBoardInnerListBox = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 5px;
`

const ListDataBox = styled(View)`
  width: 80%;
  justify-content: center;
`

const BoardText = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const LikeDataBox = styled(View)`
  align-items: center;
  justify-content: center;
  width: 10%;
  flex-direction: row;
  gap: 5px;
`

const LikedChallengesList = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  font-family: "LINE Seed Sans KR";
`

const EmptyDataBox = styled(View)`
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`

const EmptyText = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  font-family: "LINE Seed Sans KR";
`

const LogOutBox = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`
