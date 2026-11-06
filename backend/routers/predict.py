from fastapi import APIRouter, HTTPException, Depends
from schemas import PredictRequest
from data import db
from models import cognitive_model, combiner
from utils.auth import get_current_user

router = APIRouter(prefix="/predict", tags=["Predict"])

@router.post("/")
def predict(request: PredictRequest, current_user: str = Depends(get_current_user)):
    database = db.read_db()
    found_user = None
    session_data = None
    
    user_data = database.get("users", {}).get(current_user, {})
    for s in user_data.get("sessions", []):
        if s["session_id"] == request.session_id:
            found_user = current_user
            session_data = s
            break
            
    if not session_data:
        raise HTTPException(status_code=404, detail="Session not found or not authorized")
        
    speech_analysis = session_data.get("speech_analysis")
    cognitive_raw = session_data.get("cognitive_raw_scores")
    
    if not speech_analysis or not cognitive_raw:
        raise HTTPException(status_code=400, detail="Missing submission data for prediction")
        
    cog_analysis = cognitive_model.analyze_cognitive(
        cognitive_raw["mmse"],
        cognitive_raw["cdrsb"],
        cognitive_raw["total13"],
        session_data.get("age", 70) # default to 70 if missing
    )
    
    final_result = combiner.combine_scores(
        speech_analysis["score"],
        cog_analysis["score"]
    )
    
    # Add domain breakdown
    final_result["domain_breakdown"] = cog_analysis["domain_scores"]
    final_result["speech_domain_breakdown"] = speech_analysis.get("domain_scores", {})
    
    db.update_session(found_user, request.session_id, {
        "scores": final_result
    })
    
    return final_result
