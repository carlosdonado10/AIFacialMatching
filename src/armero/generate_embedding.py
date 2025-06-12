import insightface
import cv2
from typing import List, Optional


def generate_embedding() -> Optional[List[float]]:
    """
    Generates a 512-dimensional face embedding from a local image using InsightFace.

    Loads a face from 'face.jpg', detects the most prominent face using the 'buffalo_l'
    model, and returns the corresponding embedding as a list of floats.

    Returns:
        Optional[List[float]]: A 512-dimensional embedding vector if a face is detected,
        otherwise None.
    """
    model = insightface.app.FaceAnalysis(name="buffalo_l")
    model.prepare(ctx_id=0)  # Use -1 for CPU if no GPU is available

    img = cv2.imread("im1.jpg")
    faces = model.get(img)

    embedding = None
    if faces:
        embedding = faces[0].embedding.tolist()  # 512-dim list

    return embedding

