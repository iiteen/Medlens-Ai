from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

number_of_chunks = 0

def vector_store(chunks):
    global number_of_chunks
    number_of_chunks = len(chunks)
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Create the Chroma collection
    chroma_db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        # persist_directory="data",  # Specify where to save the collection
        collection_name="lc_chroma_demo",  # Choose a name for your collection
    )

    return chroma_db

def context(user_query, chroma_db, k=5):
    if chroma_db is None:
        return [
            Document(
                page_content="No additional context is available. Please answer the query based on your own knowledge."
            )
        ]
    relevant_results = chroma_db.similarity_search(
        query=user_query, k=min(k, number_of_chunks)
    )
    if not relevant_results:
        return [
            Document(
                page_content="No relevant context found. Please answer the query based on your own knowledge."
            )
        ]

    return relevant_results
