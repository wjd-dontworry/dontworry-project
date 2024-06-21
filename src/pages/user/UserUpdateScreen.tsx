import { useEffect, useState } from "react"
import { supabase } from "../../db/supabase"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

type RootStackParamList = {
  Profile: undefined
}

export default function UserUpdateScreen() {
  const [user, setUser] = useState<any | null>(null)
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
  const [nickname, setNickname] = useState<string>("")
  const [wrongMessage, setWrongMessage] = useState<string>("")
  const [incorrectMessage, setIncorrectMessage] = useState<string>("")

  const email = user?.email

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        console.log("Logged in user:", data.user?.email)
        setUser(data?.user ?? null)
      } catch (error) {}
    }

    fetchUser()
  }, [])

  const handlePasswordUpdate = async () => {
    newPassword !== confirmNewPassword ? setIncorrectMessage("새 비밀번호가 서로 일치하지 않습니다.") : setIncorrectMessage("새 비밀번호가 일치합니다")

    // password !== currentPassword ? setWrongMessage("현재 비밀번호가 일치하지 않습니다.") : setWrongMessage("현재 비밀번호가 일치합니다.")

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (error) {
        if (confirmNewPassword === null) {
          alert("변경하실 비밀번호를 다시 입력하세요")
          return
        }
        if (newPassword === null) {
          alert("변경하실 비밀번호를 입력하세요")
          return
        }
        if (currentPassword === null) {
          alert("현재 비밀번호를 입력하세요")
          return
        }
      } else {
        alert("비밀번호 변경 성공 비밀번호가 성공적으로 변경되었습니다.")
        setIncorrectMessage("")
        setWrongMessage("")
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:")
      alert("오류 발생 비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.")
    }
  }
  return (
    <SafeAreaView>
      <BackIcon
        name="chevron-left"
        onPress={() => {
          navigation.navigate("Profile")
        }}
      />
      <UserUpdateContainer>
        <TitleContainer>
          <TextLabel>회원정보수정</TextLabel>
        </TitleContainer>
        <UsrProfileContainer>
          <UsrEditText>+</UsrEditText>
        </UsrProfileContainer>
        <InputContainer>
          <InputLabel>닉네임</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={(text: string) => setNickname(text)} value={nickname} placeholder="변경할 닉네임을 입력하세요." autoCapitalize={"none"} />
          </InputTextContainer>
          <InputLabel>이메일</InputLabel>
          <InputTextContainer>
            <StyledEmailInput editable={false} autoCapitalize="none">
              {email}
            </StyledEmailInput>
          </InputTextContainer>
          <InputLabel>현재 비밀번호</InputLabel>
          <InputTextContainer>
            <StyledTextInput
              onChangeText={(text: string) => setCurrentPassword(text)}
              value={currentPassword}
              secureTextEntry={true}
              placeholder="현재 비밀번호를 입력해주세요."
              autoCapitalize={"none"}
            />
          </InputTextContainer>
          <ErrorMessage correct={user?.password === currentPassword}>{wrongMessage}</ErrorMessage>
          <InputLabel>새 비밀번호</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={(text: string) => setNewPassword(text)} value={newPassword} placeholder="새 비밀번호를 입력해주세요" autoCapitalize={"none"} secureTextEntry={true} />
          </InputTextContainer>
          <InputLabel>새 비밀번호 확인</InputLabel>
          <InputTextContainer>
            <StyledTextInput
              onChangeText={(text: string) => setConfirmNewPassword(text)}
              value={confirmNewPassword}
              placeholder="새 비밀번호를 다시 입력해주세요"
              autoCapitalize={"none"}
              secureTextEntry={true}
            />
          </InputTextContainer>
          <ErrorMessage correct={newPassword === confirmNewPassword}>{incorrectMessage}</ErrorMessage>
        </InputContainer>
        <ButtonContainer>
          <SaveButton onPress={handlePasswordUpdate}>
            <ButtonWhiteText>저장하기</ButtonWhiteText>
          </SaveButton>
        </ButtonContainer>
        <ButtonContainer>
          <CancleButton>
            <ButtonBlackText
              onPress={() => {
                navigation.navigate("Profile")
              }}>
              취소
            </ButtonBlackText>
          </CancleButton>
        </ButtonContainer>
      </UserUpdateContainer>
    </SafeAreaView>
  )
}

const UserUpdateContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

const BackIcon = styled(Icon)`
  font-size: 60px;
`

const TitleContainer = styled(View)`
  margin-bottom: 20px;
`

const TextLabel = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  font-family: "LINE Seed Sans KR";
`

const ErrorMessage = styled(Text)<{ correct?: boolean }>(({ correct }: any) => ({
  width: "90%",
  color: correct ? "#007AFF" : "red",
}))

const UsrProfileContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: #f4d9a5;
  opacity: 0.5;
  border-radius: 50px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
`

const UsrEditText = styled(Text)`
  text-align: center;
  font-size: 20px;
  font-family: "LINE Seed Sans KR";
  font-weight: 700;
  color: #000;
`

const InputContainer = styled(View)`
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
`

const InputLabel = styled(Text)`
  width: 90%;
  margin-bottom: 20px;
`

const InputTextContainer = styled(View)`
  width: 90%;
  border-color: #ccc;
  border-bottom-width: 1;
  margin-bottom: 15px;
`

const StyledTextInput = styled(TextInput)`
  width: 90%;
  padding: 0px 10px;
`

const StyledEmailInput = styled(TextInput)`
  width: 90%;
  padding: 0px 10px;
  color: #000;
  font-weight: 700;
`
const ButtonContainer = styled(View)`
  width: 90%;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-around;
`

const SaveButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  background-color: #ffbe98;
`
const CancleButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #ffe6bf;
`

const ButtonWhiteText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
`

const ButtonBlackText = styled(Text)`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
`
