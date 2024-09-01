from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document


def vector_store(chunks):
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    # Assuming 'chunks' is a list of text chunks
    documents = [Document(page_content=chunk) for chunk in chunks]

    # Create the Chroma collection
    chroma_db = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        # persist_directory="data",  # Specify where to save the collection
        collection_name="lc_chroma_demo",  # Choose a name for your collection
    )

    return chroma_db


def context(user_query, chroma_db, k=5):
    if chroma_db is None:
        return [
            "This query donot need any extra context, So answer on your own understanding of the question."
        ]
    relevant_results = chroma_db.similarity_search(query=user_query, k=k)
    return relevant_results
