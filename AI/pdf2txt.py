from PyPDF2 import PdfReader
import openai
import os

def chat_completion(param):
    openai.api_key = ""
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {'role': 'system', 'content': ''},
            {'role': 'user', 'content': 'Answer the numbered questions in the following text : ' + param}
        ],
        temperature=0.5
    )
    return response.choices[0].message.content
    #return response['choices'][0]['message']['content']


def save_file_list(path):
    file_list = []
    for root, dirs, files in os.walk(path):
        for file_name in files:
            if file_name[-4:] == '.pdf':
                file_list.append(root+'/'+file_name)
    return file_list

# Input folder directory
#folder_path = input("Enter folder directory for PDFs >> ").strip()
folder_path = "QUEST"
f_list = save_file_list(folder_path)
print(f'Total of {len(f_list)} PDFs')

for i in range(len(f_list)):
    #Initialize texts string
    texts = ''

    # Initialize answer string
    ans = ''

    # Fetch file directory from file list array
    f_dir = f_list[i]

    # Set output location, name
    output = folder_path + '/' + os.path.splitext(os.path.basename(f_dir))[0] +'_GPTAnswer' + ".txt"

    # Read PDF and save answer
    with open(f_dir, "rb") as f:
        pdf_reader = PdfReader(f)
        for page in pdf_reader.pages:
            texts += page.extract_text()

    print(f'PDF #{i + 1} Solving...')
    ans = chat_completion(texts)
    print(ans)

    # Write answer to txt file
    with open(output, "w", encoding='utf-8') as file:
        try:
            file.write(ans+"\n")
        except UnicodeEncodeError:
            print(f'PDF #{i+1} Error!')
            continue

    print(f'PDF #{i+1} Complete!')
