import axios from "axios";

export default {

  //axios.post(url[, data[, config]])
  //axios.put(url[, data[, config]])


  // Gets all goals
  getGoals: function() {
    return axios.get("/api/goals");
  },
  // Gets the goal with the given id
  getGoal: function(id) {
    return axios.get("/api/goals/" + id);
  },
  updateGoal: function(id, updateObject) {
    return axios.put("/api/goals/" + id, updateObject);
  },
  // Deletes the goal with the given id
  deleteGoal: function(id) {
    return axios.delete("/api/goals/" + id);
  },
  // Saves a goal to the database
  saveGoal: function(goalData) {
    return axios.post("/api/goals", goalData);
  }
};
