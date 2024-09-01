from langchain.embeddings import HuggingFaceEmbeddings
from langchain_experimental.text_splitter import SemanticChunker
from langchain_core.documents import Document


def traditional_chunking(text, chunk_size=500):
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]


def semantic_chunking(pdf_text):
    """Create semantic chunks from extracted PDF text."""
    # Initialize the HuggingFace embeddings
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Initialize the SemanticChunker
    semantic_chunker = SemanticChunker(
        embedding_model, breakpoint_threshold_type="percentile"
    )

    # Convert the single text into a list of Document objects for the chunking process
    documents = [Document(page_content=pdf_text)]

    # Apply the SemanticChunker to create semantic chunks
    semantic_chunks = semantic_chunker.create_documents(
        [d.page_content for d in documents]
    )

    return semantic_chunks
