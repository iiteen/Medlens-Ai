from pdf2image import convert_from_path
import pytesseract
import os


def extract_text_from_pdf(pdf_path):
    images = convert_from_path(pdf_path)
    text = ""
    for image in images:
        text += pytesseract.image_to_string(image)
    return text


# this may be needed to set these env variables
# pytesseract.pytesseract.tesseract_cmd = (
#     r"C:\Users\sunil\miniconda3\envs\hilabs\Library\bin\tesseract.exe"
# )
# os.environ["TESSDATA_PREFIX"] = r"C:\Users\sunil\miniconda3\envs\hilabs\share\tessdata"
