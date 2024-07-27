from fastapi import FastAPI, UploadFile, HTTPException
import pytesseract
from PIL import Image
from pix2tex.cli import LatexOCR
import subprocess
import openai
import io
import tempfile
import os
import logging

app = FastAPI()

# 이미지에서 텍스트 인식
def ocr_from_image(img):
    text = pytesseract.image_to_string(img)
    return text

# 이미지에서 LaTeX 인식
def latex_from_image(img):
    if img is None:  # 이미지가 없을 경우
        return ""
    temp_dir = "./temp_files"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    # 임시 파일로 이미지 저장
    with tempfile.NamedTemporaryFile(suffix=".png", dir=temp_dir, delete=False) as temp:
        img.save(temp.name)
        try:
            result = subprocess.check_output(['pix2tex', temp.name], stderr=subprocess.STDOUT).decode("utf-8").strip()
            
            # 경로 부분 제거
            result = result.replace(temp.name + ": ", "")
            
            return result if result else None
        
        except subprocess.CalledProcessError as e:
            print("Error during pix2tex execution:", e.output.decode("utf-8"))
            return None

def ask_gpt(conversation, question):
    # OpenAI API 키 설정

    # 질문하기
    conversation.append({"role" : "user", "content" : question})
    conversation.append({"role" : "system", "content" : "풀이 중 사용된 이론에 대해서 출처를 남길 수 있으면 마지막에 '출처: ', 를 작성해서 남겨줘."})
    conversation.append({"role" : "system", "content" : "출처는 해당 정보에 대해 알 수 있는 url을 3개 남겨줘."})

    # GPT 통해서 답변 받기
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation
        )
    answer = response['choices'][0]['message']['content']

    # 답변 저장 및 출력
    conversation.append({"role": "assistant", "content": answer.strip()})

    return answer, conversation

# 로깅 설정
logging.basicConfig(level=logging.INFO)
@app.post("/ask_from_image/")

async def ask_from_images(conversation, quest_image: UploadFile, math_image: UploadFile=None):
    try:
        # 이미지를 메모리에서 열기
        quest_image_content = await quest_image.read()
        quest_image_path = Image.open(io.BytesIO(quest_image_content))
        text = ocr_from_image(quest_image_path)

        latex_formula = ""
        if math_image:
            logging.info("Processing math_image...") # 로깅 추가
            math_image_content = await math_image.read()
            math_image_path = Image.open(io.BytesIO(math_image_content))
            
            # latex_from_image 함수를 호출 전에 로깅 추가
            logging.info("Calling latex_from_image function...")
            latex_formula = latex_from_image(math_image_path)

            # 결과 로깅
            logging.info(f"Extracted LaTeX: {latex_formula}")

        # 문제와 수식 결합
        combined_text = text + " " + "$" + latex_formula + "$"
        
        answer, conversation = ask_gpt(conversation, combined_text)
        return {"question": combined_text, "answer": answer, "conversation": conversation}
    except Exception as e:
        logging.error(f"Error: {e}")  # 에러 로깅
        raise HTTPException(status_code=400, detail=f"Error processing images: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
