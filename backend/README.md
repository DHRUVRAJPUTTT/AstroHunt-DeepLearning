# Exoplanet Hunt Backend

This backend exposes the ML prediction API used by the frontend.

## Run locally

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Then open the frontend app and it will call:

- http://localhost:8000/api/health
- http://localhost:8000/api/analyze

## Frontend connection

The frontend already expects the backend at:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

This project uses a lightweight demo ML classifier until a trained model file is added to `ml/model`.
