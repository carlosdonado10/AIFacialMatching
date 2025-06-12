"""
Initializes an Azure Cosmos DB container for storing photo embeddings with vector search support.

Creates a database and container if they do not already exist, and applies a vector indexing policy
for 512-dimensional embeddings using cosine similarity.
"""


from azure.cosmos import CosmosClient, PartitionKey
import os

from dotenv import load_dotenv

load_dotenv(verbose=True)
endpoint = os.getenv("COSMOS_ENDPOINT")

key = os.getenv("COSMOS_KEY")

if endpoint is None:
    raise ValueError("COSMOS_ENDPOINT must be set")

if key is None:
    raise ValueError("COSMOS_KEY must be set")

client = CosmosClient(endpoint, key)
db_name = "photo_embeddings"
container_name = "images"

if __name__ == '__main__':

    db = client.create_database_if_not_exists(id=db_name)

    # Vector index policy defined as a dictionary
    indexing_policy = {
        "automatic": True,
        "indexingMode": "consistent",
        "vectorPolicy": {
            "vectors": [
                {
                    "path": "/embedding",  # Field in your JSON document
                    "type": "flat",  # Algorithm: flat or hnsw (if supported)
                    "dimension": 512,  # Your vector size
                    "distanceFunction": "cosine"  # Distance metric
                }
            ]
        }
    }

    container = db.create_container_if_not_exists(
        id=container_name,
        partition_key=PartitionKey(path="/id"),
        indexing_policy=indexing_policy
    )
