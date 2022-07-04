import React,{ Component} from "react";
import { useNavigate, useParams } from "react-router-dom";


export const WithRouter = (Component) => {
    const WithRouter = (props) => {
      const navigate = useNavigate();
      const params = useParams();
      return <Component {...props} navigate={navigate} params={params} />;
    }
    return WithRouter;
  }