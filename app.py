from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ml_project_lifecycle import MLProjectLifecycle
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize and train the model
project = MLProjectLifecycle()
print("Training model...")
project.run() # This trains and logs to mlflow, but also sets project.model
print("Model trained.")

class IrisInput(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.post("/predict")
def predict(input_data: IrisInput):
    if project.model is None:
        raise HTTPException(status_code=500, detail="Model not trained")
    
    data = np.array([[input_data.sepal_length, input_data.sepal_width, input_data.petal_length, input_data.petal_width]])
    prediction = project.model.predict(data)
    
    # Map prediction to class name (Iris dataset target names)
    target_names = ['setosa', 'versicolor', 'virginica']
    predicted_class = target_names[int(prediction[0])]
    
    return {"prediction": predicted_class}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
