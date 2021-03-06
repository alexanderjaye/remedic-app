import { useEffect, useRef, useState } from "react";
import io , {Socket} from "socket.io-client";
import convertTextToSpeech from "../services/api.text.to.speech";
import { getTranslatedText } from "../services/api.translate";
import { Message } from "../types";

const useChat = (roomId: string, isDoctor: boolean, docName: string, patName: string, patientLanguage : string, onConsultationFinish: () => void) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<typeof Socket>();

  useEffect(()=> {

    socketRef.current = io(process.env.REACT_APP_CHAT_URL as string)
    socketRef.current.emit('join chat', roomId);

    socketRef.current.on('leave consultation', () => {
      if (socketRef.current) {
        socketRef.current.emit('leave consultation', roomId);
        onConsultationFinish();
      }
    });

    socketRef.current.on('doctor message', async (msg: string) => {
      const newMessage = {
        name: docName,
        content: msg,
        audio: '',
        isAuthor: isDoctor,
        timestamp:''
      }

      if (!isDoctor) {
        msg = await getTranslatedText(msg, 'en', patientLanguage);
        const convertedText = await convertTextToSpeech(patientLanguage, msg);
        newMessage.content = msg;
        newMessage.audio = convertedText;
      }
      

      setMessages(prevMessages => [...prevMessages, newMessage])
    });

    socketRef.current.on('patient message',async (msg: string) => {

      if (isDoctor) {
        msg = await getTranslatedText(msg, patientLanguage, 'en');
      }

      const newMessage = {
        name: patName,
        content: msg,
        audio: '',
        isAuthor: !isDoctor,
        timestamp:''
      }
      setMessages(prevMessages => [...prevMessages, newMessage])
    });

  }, [roomId, isDoctor])

  const addMessage = (msg: string) => {
    const messageType = isDoctor ? 'doctor message' : 'patient message';
    if (socketRef.current) {
      socketRef.current.emit(messageType, roomId, msg);
    }
  }

  const endConsultation = () => {
    if (socketRef.current) {
    socketRef.current.emit('end consultation', roomId);
    }
  }

  return {messages, addMessage, endConsultation}
}

export default useChat
