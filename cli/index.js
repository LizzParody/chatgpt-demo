#!/usr/bin/env NODE_NO_WARNINGS=1 node --loader=import-jsx

import React, { useState } from 'react';
import { render, Text } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';


import { Configuration, OpenAIApi } from "openai";

const CHAT_BOTS = [
	{
		label: 'Leonardo Davinci',
		value: 'leonardo davinci'
	},
	{
		label: 'Physics professor',
		value: 'Physics professor'
	},
	{
		label: 'King of England',
		value: 'king of england'
	}
]

const ChatGPT = () => {
	const [chatbot, setChatbot] = useState('')
	const [question, setQuestion] = useState('')
	const [loading, setLoading] = useState(false)

	const configuration = new Configuration({ apiKey: env.OPENAI_API_KEY });
	const openai = new OpenAIApi(configuration);

	const setSelectedChatbot = (option) => {
		setChatbot(option.value)
	}

	// TODO: Call ChatGPT API from here
	const askQuestion = (input) => {
		setLoading(true)

	}

	const onQuestionChange = (question) => {
		setQuestion(question)
	}


	return <>
		{!chatbot && <Text color="green">What type of chatbot would you like to create?</Text>}
		{!chatbot && <SelectInput items={CHAT_BOTS} onSelect={setSelectedChatbot} />}
		{!loading && chatbot && <Text color="green">Perfect!, now tell me your question</Text>}
		{!loading && chatbot && <TextInput value={question} onChange={onQuestionChange} onSubmit={askQuestion} />}
		{loading && <Text color="blue"><Spinner type='flip' />&nbsp;Wait a moment, asking to ChatGPT: {question}</Text>}
	</>

};
render(<ChatGPT />);