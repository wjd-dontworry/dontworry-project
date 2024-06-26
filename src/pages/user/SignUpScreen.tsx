import { useEffect, useState } from "react"
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { supabase } from "../../db/supabase"

type RootStackParamList = {
  Login: undefined
}

export default function SignUpScreen() {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [wrongMessage, setWrongMessage] = useState<string>("")
  const [inCorrentMessage, setInCorrentMessage] = useState<string>("")
  const [wrongCountPasswordMessage, setWrongCountPasswordMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    checkAuthSession()
  }, [])

  // 로그인 세션 체크 함수
  const checkAuthSession = async () => {
    const user = supabase.auth.getUser()
    if (!user) {
      // 로그인 세션이 없으면 로그인 화면으로 이동
      navigation.navigate("Login")
    }
  }

  // 회원가입
  async function signUpWithEmail() {
    if (!username || !email || !password || !confirmPassword) {
      setWrongMessage("모든 필드를 입력해주세요.")
      return
    } else if (password !== confirmPassword) {
      setInCorrentMessage("비밀번호가 일치하지 않습니다.")
      return
    } else if (password.length < 6) {
      setWrongCountPasswordMessage("비밀번호 6자리 이상 입력해주세요.")
      return
    } else {
      setWrongMessage("")
      setErrorMessage("")
      setWrongCountPasswordMessage("")
    }

    setLoading(true)
    try {
      const { error, data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            proflie_image: null,
          },
        },
      })

      if (error) {
        throw error
      }
      navigation.navigate("Login")
    } catch (error: any) {
      console.error("Sign up error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  // 이메일 형식이 올바른지 검사하는 함수
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // 이메일 형식 검사 및 상태 설정 함수
  const handleEmailChange = (text: any) => {
    setEmail(text)
    if (!validateEmail(text)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.")
    } else {
      setErrorMessage("")
    }
  }

  return (
    <SafeAreaView>
      <BackIcon
        name="chevron-left"
        onPress={() => {
          navigation.navigate("Login")
        }}
      />
      <UserUpdateContainer>
        <TitleContainer>
          <TextLabel>회원가입</TextLabel>
        </TitleContainer>
        <InputContainer>
          <InputLabel>닉네임</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={(text: string) => setUsername(text)} value={username} placeholder="닉네임을 입력하세요." autoCapitalize={"none"} />
          </InputTextContainer>
          <InputLabel>이메일</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={handleEmailChange} value={email} placeholder="이메일 입력해주세요." autoCapitalize={"none"} />
          </InputTextContainer>
          <ErrorMessage>{!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}</ErrorMessage>
          <InputLabel>비밀번호</InputLabel>
          <InputTextContainer>
            <StyledTextInput onChangeText={(text: string) => setPassword(text)} value={password} secureTextEntry={true} placeholder="비밀번호를 입력해주세요." autoCapitalize={"none"} />
          </InputTextContainer>
          <ErrorMessage correct={password.length < 6}>{wrongCountPasswordMessage}</ErrorMessage>
          <InputLabel>비밀번호 확인</InputLabel>
          <InputTextContainer>
            <StyledTextInput
              onChangeText={(text: string) => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="비밀번호를 다시 입력해주세요"
              autoCapitalize={"none"}
              secureTextEntry={true}
            />
          </InputTextContainer>
          <ErrorMessage correct={!(password !== confirmPassword)}>{inCorrentMessage}</ErrorMessage>
        </InputContainer>
        <ButtonContainer>
          <SaveButton onPress={signUpWithEmail}>
            <ButtonWhiteText>가입</ButtonWhiteText>
          </SaveButton>
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
  color: correct ? "blue" : "red",
}))

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

const ButtonWhiteText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  font-family: "Pretendard";
`
