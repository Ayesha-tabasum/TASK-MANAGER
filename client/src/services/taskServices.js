import api from "./api";



//get task
export const getTask = async (page, limit) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/task?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


    //search task

   export const searchTask=async (keyword) => {
 const token=localStorage.getItem("token");
      const search=await api.get(`/search?keyword=${keyword}`,{
              headers: {
                  Authorization: `Bearer ${token}`,
            }
      })
      return search.data;
    }

  export  const filterTask=async (priority) => {
 const token=localStorage.getItem("token");
      const filter=await api.get(`/filter?priority=${priority}`,{
              headers: {
                  Authorization: `Bearer ${token}`,
            }
      })
      return filter.data;
    }


    //edit function

    export const editTask=async (id,data) => {
      const token= localStorage.getItem("token");
      const task=await api.put(`/${id}`,data,{
                   headers:{
                  Authorization: `Bearer ${token}`,
            }}
      
      );
      return task.data;
    }

    //delete function
    export const deleteTask=async (id) => {
      const token=localStorage.getItem("token");
      const task=await api.delete(`/${id}`,{
                   headers:{
                  Authorization: `Bearer ${token}`,
            }}
      
      );
      return task.data;
    }