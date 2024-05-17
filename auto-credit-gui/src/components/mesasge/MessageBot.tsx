import { BotImage, Container, Content } from "./Message.styles";

interface MessageProps {
  text: string
}


function MessageBot({ text }: MessageProps) {
  return (
    <Container>
      <BotImage />
      <Content>{text}</Content>
    </Container>
  );
}

export default MessageBot;