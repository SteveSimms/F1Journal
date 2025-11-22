import chromadb
from chromadb.utils import embedding_functions
import json
import os
from typing import List, Dict, Any, Optional

# Initialize ChromaDB Client
# Using a persistent client so data is saved to disk
CHROMA_DATA_PATH = "./chroma_db"
client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)

# Initialize Embedding Function
# Using a small, fast model suitable for CPU usage
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(model_name=EMBEDDING_MODEL_NAME)

# Create or Get Collection
collection = client.get_or_create_collection(
    name="career_steps",
    embedding_function=embedding_func,
    metadata={"hnsw:space": "cosine"}
)

DATA_FILE_PATH = "data/career_data.json"

def ingest_data():
    """
    Loads data from JSON and ingests it into ChromaDB if the collection is empty.
    """
    if collection.count() > 0:
        print(f"Collection already has {collection.count()} documents. Skipping ingestion.")
        return

    if not os.path.exists(DATA_FILE_PATH):
        print(f"Data file not found at {DATA_FILE_PATH}")
        return

    print("Ingesting data into Vector Store...")
    with open(DATA_FILE_PATH, 'r') as f:
        data = json.load(f)

    ids = []
    documents = []
    metadatas = []

    for item in data:
        ids.append(item['id'])
        # Create a rich document string for embedding
        doc_text = f"{item['title']}. {item['description']} Category: {item['category']}. Requirements: {', '.join(item['requirements'])}."
        documents.append(doc_text)
        
        # Store the full item in metadata so we can retrieve it later
        # Chroma metadata values must be str, int, float, or bool. Lists are not supported directly in metadata in some versions,
        # so we'll store the JSON string of the item to be safe and flexible.
        metadatas.append({"json_data": json.dumps(item)})

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    print(f"Successfully ingested {len(ids)} documents.")

def search_career_steps(query: str, n_results: int = 3) -> List[Dict[str, Any]]:
    """
    Semantic search for career steps.
    """
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    
    parsed_results = []
    if results['metadatas']:
        for metadata in results['metadatas'][0]:
            if 'json_data' in metadata:
                item = json.loads(metadata['json_data'])
                # Add a relevance score placeholder (Chroma returns distances, converting to similarity is optional)
                item['relevance'] = 0.9 # Mock relevance for now as distance conversion varies
                parsed_results.append(item)
    
    return parsed_results

def get_step_by_id(step_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a specific career step by ID.
    """
    result = collection.get(ids=[step_id])
    
    if result['metadatas'] and len(result['metadatas']) > 0:
        metadata = result['metadatas'][0]
        if 'json_data' in metadata:
            return json.loads(metadata['json_data'])
            
    return None
