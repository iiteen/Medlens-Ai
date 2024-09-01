from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from pipeline import pdf, query

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def hello_world():
    return 'Hello World'

def process_file(file_path):
    pdf(file_path)
    # print(file_path)
    return f'The provided file is successfully uploaded: {file_path}'


def answer_to_queries(text):
    ans = query(text)
    print(ans)
    return ans


# Add the missing route decorator here
@app.route('/upload-file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        print("uploading file")
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        result = process_file(file_path)

        return jsonify({"message": result}), 200

@app.route('/get-query',methods=['POST'])
def get_query():
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    text=data['text']
    print("query received successfully")
    
   
    result = answer_to_queries(text)
    
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)
