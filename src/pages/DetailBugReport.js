import React, { useState, useEffect } from "react";
import { fetchBugReports } from "../api";
import Sentence from "../components/items/Sentence";
import { ToastContainer, toast } from "react-toastify";
import "./DetailBugReport.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { ControlToast, SetTab } from "../actions/bugReport";

export default function DetailBugReport(props) {
  const [bugReport, setBugReport] = useState([]);
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const notify = () => {
    toast("Add bug report successfully");
  };
  if (useSelector((state) => state.bugReport.loadToast)) {
    notify();
    dispatch(ControlToast(false));
  }
  useEffect(() => {
    dispatch(SetTab(null));
    fetchBugReports()
      .then((data) => {
        let tempItem = data.filter((item) => item.id_bug == id);
        setBugReport(tempItem);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [setBugReport, id, dispatch]);
  return (
    <div className="detail_page">
      {bugReport.length > 0 && (
        <div>
          <p className="report_title">{bugReport[0].title}</p>
          {bugReport.map((item, index) => (
            <div key={index} className="report_content">
              <Sentence sentence={item} />
            </div>
          ))}
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
