import React, { useContext, useEffect, useRef, useState } from "react";
import DoctorMessageBubble from "./MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "./MessageBubbles/PatientMessageBubble";
import useChat from "../../../hooks/useChat";
import { ReactComponent as SendMessageArrow } from "../../../assets/utils/send_message.svg";
import { ReactComponent as UserIcon } from "../../../assets/utils/user_icon.svg";
import Doctor from "../../../assets/background-images/humans-standing.png";

import { useAuth } from "../../../Contexts/Auth.context";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import SuccessTick from "../../Globals/SuccessTick/SuccessTick";

// ROUTE -> '/consultation_chat'
const ConsultationChat = () => {
  const { user } = useAuth();

  const { getConsultationId, doctor } = useContext(ConsultationContext)!;

  const { messages, addMessage } = useChat(
    String(getConsultationId()),
    false,
    user!.language
  );

  const [currentMsg, setCurrentMsg] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentMsg.length > 0) {
        addMessage(currentMsg);
        setCurrentMsg("");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      {messages.length === 0 ? (
        <div className="h-full flex items-center px-3 flex-col">
          <SuccessTick size={150} />
          <h1 className="text-bold text-2xl text-center">
            Thank you for submitting!
          </h1>
          <h2 className="text-bold text-xl text-center">
            {doctor.firstName} {doctor.lastName} will be shortly with you.
          </h2>
          <img
            src={Doctor}
            alt="bg_human"
            className="absolute bottom-16 left-5 opacity-10 w-72 "
          />
        </div>
      ) : (
        <div className="flex-col flex justify-center w-screen overflow-hidden">
          <div className="relative flex flex-col shadow-md justify-evenly items-center p-3">
            <div className="w-full h-screen flex flex-col justify-end pt-3 pb-10">
              <div className="h-20 fixed top-0 left-0 w-full z-10 bg-green-light p-3 flex items-center justify-center">
                <h1 className="text-3xl text-bold">Your chat</h1>
              </div>
              <div className="relative flex flex-col h-full overflow-auto pt-16">
                {messages &&
                  messages.map((message, idx) =>
                    message.isAuthor ? (
                      <PatientMessageBubble message={message} key={idx} />
                    ) : (
                      <DoctorMessageBubble message={message} key={idx} />
                    )
                  )}
                <div ref={messagesEndRef}></div>
              </div>
              <form
                className="flex justify-center items-center p-3 fixed left-0 bottom-16 bg-white w-full"
                onSubmit={sendMessage}
              >
                <label hidden htmlFor="chat input" />
                <input
                  type="text"
                  name="chat input"
                  className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-11/12"
                  placeholder="Start messaging"
                  onChange={(e) => setCurrentMsg(e.target.value)}
                  value={currentMsg}
                />
                <button className="absolute right-12">
                  <SendMessageArrow />
                </button>
              </form>
            </div>
            <div className="bg-blue h-16 w-screen fixed bottom-0 flex items-center justify-center">
              <UserIcon />
              <h3 className="text-xl text-white-cream ml-3 font-extrabold">
                {doctor.firstName} {doctor.lastName}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationChat;
