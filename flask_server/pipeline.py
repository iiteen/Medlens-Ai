from extract_pdf import extract_text_from_pdf
from chunking import traditional_chunking, semantic_chunking
from embedding import vector_store, context
from llm import LLM

chroma_db = None


def delete():
    global chroma_db
    chroma_db = None


def pdf(pdf_path):
    global chroma_db
    text = extract_text_from_pdf(pdf_path)
    chunks = semantic_chunking(text)
    chroma_db = vector_store(chunks)


def query(user_query):
    contexts = context(user_query, chroma_db)
    ans = LLM(contexts, user_query)
    return ans
