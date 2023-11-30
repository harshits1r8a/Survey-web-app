# Survey Web App

## Overview

This web app allows users to participate in a survey by answering five questions. The answers are stored in a JavaScript object, and users can confirm their responses at the end. Additionally, a thank you message is displayed, which can be used for further actions, such as sending the data to a database.

## Features

- User-friendly survey interface.
- Storage of survey responses in a JavaScript object.
- Confirmation step for users to review and confirm their answers.
- Thank you message at the end.

## Usage

1. **Start the Survey:**
   - Navigate to the welcome page.
   - Click on the "Start" button to begin the survey.

2. **Answer Questions:**
   - Respond to the five survey questions.

3. **Confirmation:**
   - After answering all questions, a confirmation step is presented.
   - Users can review their responses and confirm with a "Yes" or "No."

4. **Thank You Message:**
   - Upon confirmation, a thank you message is displayed.

## Data Storage

Survey responses are stored in a JavaScript object. The structure of the object is as follows:

```javascript
const surveyData = {
  question1: 'user response 1',
  question2: 'user response 2',
  question3: 'user response 3',
  question4: 'user response 4',
  question5: 'user response 5',
};
