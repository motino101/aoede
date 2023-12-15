Setting Up Environment Variables
Our application requires certain environment variables to be set in order to run properly. These variables might include database connection details, API keys, or other sensitive configurations that should not be hard-coded into the application code for security reasons.

In the root directory of the project, create a file named .env.

Add your configuration variables in the following format:

plaintext
Copy code
# .env file
OPENAI_API_KEY=value
Replace value with the actual OPENAI key.