Based on the Google Gemini API documentation, I found the issue with the current implementation:

1. The endpoint URL should be: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}
2. The request body structure needs to be corrected
3. The response parsing needs to be updated

Current issues in the code:
- Using wrong model name (gemini-pro instead of gemini-2.0-flash)
- Incorrect request body structure
- Wrong response parsing path

The correct curl example from the documentation:
```
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Write a story about a magic backpack."}]
  }]
}' 2> /dev/null
```

Need to fix:
1. Update the model name to gemini-2.0-flash
2. Fix the request body structure
3. Update response parsing to use data.candidates[0].content.parts[0].text

