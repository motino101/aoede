from flask import Flask, request, jsonify
from flask_cors import CORS
import openai 
from flask import Response
import json
import unittest
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# set conversation history and global vars
conversation_history = []
scenario = ""
t_language = ""
n_language = "English"
level = ""

# 1: Submit preferences to bot
@app.route('/submitForm', methods=['POST'])
def submitForm():
    global scenario, t_language, n_language, level  # Declare global variables
    
    # Get user input
    print(f"Request JSON: {request.json}")
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400

    # update global vars
    scenario = request.json.get('scenario')
    t_language = request.json.get('t_language')
    # n_language = request.json.get('n_language')
    level = request.json.get('level')

    # Add user input to history
    conversation_history.append({"role": "system", "content": 
            f"""You are an AI that is good at role-playing. 
            You are simulating a typical conversation. See the below specifications.
            - SCENARIO: {scenario}.
                You are assuming your role. For example, if scenario is "ordering food at restaurant", assume you are the person
                being spoken to, in this case, you would most likely be a waiter.
            - LANGUAGE: {t_language}. Your conversation should only be conducted in this language.
                Do not translate. This simulated conversation is designed for the language learner
                to learn real-life  conversations in this language.
            - PROFICIENCY: {level}. You should assume the learners' proficiency level in the language is this level.
                If the level is first year, use as basic and simple vocabulary and
                sentence structures as possible. Must avoid idioms, slang, 
                and complex grammatical constructs.
                If the level is third year, use a wider range of vocabulary and a variety of sentence structures. 
                You can include some idioms and colloquial expressions, 
                but avoid highly technical language or complex literary expressions.
                If the language is fifth year, use sophisticated vocabulary, complex sentence structures, idioms, 
                colloquial expressions, and technical language where appropriate.
                If the level is in between two levels, use a mix of the two levels.
            Make your conversation with user natural and typical in the considered scenario in 
            the cultural context of the language."""
    })
    return jsonify({'conversation_history': conversation_history})

# 2: Add message to conversation history
@app.route('/chat', methods=['POST'])
def chat():
    # Get user input
    if request.json is None:
        return jsonify({'error': 'Invalid JSON'}), 400
    user_input = request.json.get('message')
    if user_input is None:
        return jsonify({'error': 'No message field in JSON'}), 400
    print(f"User message: {user_input}")

    # Add user input to history
    conversation_history.append({"role": "user", "content": user_input})

    # Get bot output
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation_history
    )
    chatbot_response = response['choices'][0]['message']["content"]
    
    # Add bot output to history
    conversation_history.append({"role": "assistant", "content": chatbot_response})
    return jsonify({'message': chatbot_response})

# 3: Analyze message
@app.route('/analyze', methods=['POST'])
def analyze():
    global scenario, t_language, n_language, level  # Declare global variables
    
    print(f"Analyze Message Entered. Input: {request.json}")
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400
    msg = request.json.get('msg')
    prompt = f"""Analyze the following conversation snippet from a language learner, the message to analyze is: {msg}.
            The language learner is texting in a conversation about {scenario}. 
            The learner is learning to speak {t_language},
            Write your answer in {n_language}.
            If there is a glaring mistake, you can point it out, but also try to give some positive feedback.
            Write in simple language.
            Be as specific as possible.
            The conversation history is: {json.dumps(conversation_history)}.
            Make sure the output is two sentence with the key feedback on the learner's use of grammar, vocabulary, and sentence structure, with no extra space on top or below.
            Make sure you write all complete sentences. Please note the language learner is aiming to speak at {level} level.
            if there are no glaring mistakes, just say something simple and encouraging! no need to corrcet every mistake.
            ."""
    response = openai.Completion.create(
        model="text-davinci-003",  # Specify the model
        prompt=prompt,
        max_tokens=60  # Specify the maximum length of the response
    )
    # print("prompt: ", prompt)
    print(f"The output is: {response.get('choices')[0].get('text')}")
    return jsonify({'analysis': response.get('choices')[0].get('text')})

# 4: Translate message
@app.route('/translate', methods=['POST'])
def translate():
    print(f"Translate Message Entered. Input: {request.json}")
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400
    msg = request.json.get('msg')
    global t_language, n_language, level  # Declare global variables
    prompt = f"Translate this message {msg} written in {t_language} at {level} level difficulty to {n_language}. Only return the translated output."
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt = prompt,
        max_tokens=60
    )
    print(f"The output:{response.get('choices')[0].get('text')}")
    return jsonify({'analysis': response.get('choices')[0].get('text')})

# 5: Summarise conversation history # NO INPUTS, only just global convo history
@app.route('/summarise', methods=['POST'])
def summarise():
    print(f"Summarise Conversation History Entered.")
    global scenario, t_language, n_language, level  # Declare global variables
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400
    prompt = f"""The following text is a simulated conversation in 
        {t_language}. The goal of this text is to aid {t_language} learners to learn
        real-life usage of {t_language}. Therefore, your task is to summarize the key 
        learning points based on the given text. Specifically, you should summarize 
        the key vocabulary, grammar points, and function phrases that could be important 
        for students learning {t_language}. Your summary should be conducted in English, but
        use examples from the text in the original language where appropriate.
        Remember your target students have a proficiency level of 
        {level} in {t_language}. You summarization must match with their 
        proficiency level. 

        The conversation is: {json.dumps(conversation_history)}.
        """
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt = prompt,
        max_tokens=60
    )
    print(f"The output:{response.get('choices')[0].get('text')}")
    return jsonify({'translation': response.get('choices')[0].get('text')})



# ________________________________________________________ TEST CASES

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.conversation_history = []

    # TEST 1: SUBMIT FORM
    def test_submitForm(self):
        response = self.app.post('/submitForm', data=json.dumps({
            'scenario': 'You are ordering food at a restaurant',
            't_language': 'Chinese',
            'n_language': 'English',
            'level': 'First-Year'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'conversation_history': conversation_history})
        # to do: Test with missing field
        # to do: Test with invalid JSON
        print(f"Test 1: conversation history: {conversation_history}")
    
    # TEST 2: CHAT
    def test_addMessage(self):
        response = self.app.post('/chat', data=json.dumps({
            'message': 'I order pizza sir'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': conversation_history[-1]['content']})
        print(f"Test 2: message: {conversation_history[-1]['content']}")

    # TEST 3: ANALYZE
    def test_analyze(self):
        response = self.app.post('/analyze', data=json.dumps({
            'usr_msg': 'I order pizza sir',
            'scenario': 'ordering food at a restaurant',
            't_language': 'Chinese',
            'n_language': 'English',
            'level': 'First-Year'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        print(f"Test 3: analysis: {response.get_json()}")

    def test_translate(self):
        response = self.app.post('/translate', data=json.dumps({
            'msg': 'I order pizza sir',
            'scenario': 'ordering food at a restaurant',
            't_language': 'Chinese',
            'n_language': 'English',
            'level': 'First-Year'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        print(f"Test 4: translation: {response.get_json()}")
    
    def test_summarise(self):
        response = self.app.post('/summarise', data=json.dumps({
            'scenario': 'ordering food at a restaurant',
            't_language': 'Chinese',
            'n_language': 'English',
            'level': 'First-Year'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        print(f"Test 5: summarisation: {response.get_json()}")
        
if __name__ == '__main__':
        unittest.main()
        # app.run(debug=True)
