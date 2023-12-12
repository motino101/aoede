from flask import Flask, request, jsonify
from flask_cors import CORS
import openai 
from flask import Response
import json
import unittest
import os

app = Flask(__name__)
CORS(app)

openai.api_key = "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"

# set conversation history
conversation_history = []

# 1: Submit preferences to bot
@app.route('/submitForm', methods=['POST'])
def submitForm():
    
    # Get user input
    print(f"Request JSON: {request.json}")
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400
    scenario, t_language, n_language, level = request.json.get('scenario'), request.json.get('t_language'), request.json.get('n_language'), request.json.get('level')
    
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
    # Get user input
    print(f"Request JSON: {request.json}")
    if request.json is None: return jsonify({'error': 'Invalid JSON'}), 400
    usr_msg, scenario, t_language, n_language, level = request.json.get('usr_msg'), request.json.get('scenario'), request.json.get('t_language'), request.json.get('n_language'), request.json.get('level')
    prompt = f"""Analyze the following conversation snippet from a language learner
            who is learning to speak {t_language},
            
            Write your answer in {n_language}.

            Write one sentence with the key feedback on the learner's use of grammar, vocabulary, and sentence structure.
            If there is a glaring mistake, you can point it out, but also try to give some positive feedback.
            Write in simple language.
            Be as specific as possible.
            Give a modified version of the sentence if there is any room for improvement.
            The message to analyze is: {usr_msg}
            The conversation history is: {json.dumps(conversation_history)}
            ."""
    response = openai.Completion.create(
        model="text-davinci-003",  # Specify the model
        prompt=prompt,
        max_tokens=60  # Specify the maximum length of the response
    )
    # print("prompt: ", prompt)
    return jsonify({'analysis': response.get('choices')[0].get('text')})


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
        
if __name__ == '__main__':
        unittest.main()
        # app.run(debug=True)
