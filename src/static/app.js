@app.delete("/activities/{activity_name}/signup")
def unregister_from_activity(activity_name: str, email: str):
    """Remove a student from an activity"""
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")

    activity = activities[activity_name]
    if email in activity["participants"]:
        activity["participants"].remove(email)
        return {"message": f"Removed {email} from {activity_name}"}

    raise HTTPException(status_code=404, detail="Student not found in participants")
        
