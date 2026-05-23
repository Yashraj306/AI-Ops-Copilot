from dotenv import load_dotenv
import os

load_dotenv()

try:
    from google import genai

    client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
    )

    GEMINI_AVAILABLE = True

except Exception:
    GEMINI_AVAILABLE = False


def local_fallback_analysis(task_text):

    return f"""
Summary:
The task focuses on: {task_text}

Priority:
Medium to High

Suggested Action:
1. Gather operational data
2. Analyze performance metrics
3. Identify bottlenecks
4. Create optimization strategy
"""


def analyze_task(task_text):

    prompt = f"""
    Analyze this business task:
    {task_text}

    Give:
    1. Summary
    2. Priority
    3. Suggested Action
    """

    if GEMINI_AVAILABLE:

        try:

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )

            return response.text

        except Exception as e:

            print("Gemini API Failed:", e)

            return local_fallback_analysis(task_text)

    return local_fallback_analysis(task_text)