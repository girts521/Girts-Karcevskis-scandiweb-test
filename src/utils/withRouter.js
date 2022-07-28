import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export const WithRouter = (Component) => {
  const WithRouter = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation()
    return <Component {...props} navigate={navigate} params={params} location={location} />;
  };
  return WithRouter;
};
