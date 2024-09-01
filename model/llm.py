from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM


def LLM(contexts, user_query, def_model="llama3.1"):

    template = """Question: {question}

    Answer: Let's think step by step."""

    prompt = ChatPromptTemplate.from_template(template)

    model = OllamaLLM(model=def_model)

    chain = prompt | model
    context = "\n".join([chunk.page_content for chunk in contexts])
    input_text = f"""
    Objective:
    Generate a concise and accurate answer to the query based on the provided context.

    Task Instructions:
    - Use the provided context to generate a precise and accurate response that directly addresses the query.
    - The answer must be based solely on the information in the context.
    - Avoid introductory phrases like "Based on the provided context, here's a concise and accurate answer to the user's query:".
    - If the context does not fully address the query, acknowledge the limitation and provide a response based on the available information.

    Handling Ambiguity:
    - If the context is insufficient or the query is ambiguous, indicate this in your response. If appropriate, suggest that the user provide more details or refer to the document for further information.

    Task:
    Use the Context to answer the question asked.

    Context:
    {context}

    Question:
    {user_query}

    Answer:
    """
    ans = chain.invoke({"question": input_text})
    return ans
