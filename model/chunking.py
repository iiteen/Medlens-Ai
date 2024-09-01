from langchain_experimental.text_splitter import SemanticChunker
from langchain_community.embeddings import HuggingFaceEmbeddings


def traditional_chunking(text, chunk_size=500):
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]


def semantic_chunking(pdf_text):

    # Initialize the chunker
    chunker = SemanticChunker(HuggingFaceEmbeddings())

    # Example text (replace with your own long document)
    text = """
    Madam Speaker, Madam Vice President, our First Lady and Second Gentleman.
    Members of Congress and the Cabinet. Justices of the Supreme Court.
    My fellow Americans. Last year COVID-19 kept us apart. This year we are finally together again.
    Tonight, we meet as Democrats, Republicans, and Independents. But most importantly, as Americans.
    With a duty to one another, to the American people, and to the Constitution.
    And with an unwavering resolve that freedom will always triumph over tyranny.
    """

    # Perform semantic chunking
    chunks = chunker.split_text(pdf_text)

    return chunks
