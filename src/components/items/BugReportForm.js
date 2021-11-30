import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { ControlToast, SetSearchValue } from "../../actions/bugReport";
import { addNewBugReport, fetchBugReports } from "../../api";
import "./BugReportForm.css";
export default function BugReportForm() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [listBugReports, setListBugReport] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [bugReport, setBugReport] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const action = SetSearchValue("");
    dispatch(action);
    dispatch(ControlToast(true));
    e.preventDefault();
    setIsSubmit(true);
    const data = { title: title, content: content };
    addNewBugReport(data).then(() => {
      fetchBugReports().then((res) => setListBugReport(res));
    });
  };

  useEffect(() => {
    if (isSubmit && listBugReports.length > 0) {
      fetchBugReports().then((data) => {
        let tempList = [];
        let id = data[data.length - 1].id_bug;
        tempList = data.filter((item) => item.id_bug === id);
        setBugReport(tempList);
      });
      if (bugReport.length > 0) {
        setRedirect(true);
        setIsSubmit(false);
      }
      setTitle("");
      setContent("");
    }
  }, [bugReport, listBugReports, isSubmit]);

  return (
    <React.Fragment>
      {isSubmit === true ? (
        <div className="loading">Labeling</div>
      ) : redirect === true ? (
        <Redirect to={`/bug-report/${bugReport[0].id_bug}`} />
      ) : (
        <form className="bug_form" onSubmit={handleSubmit}>
          <input
            className="input_title"
            placeholder="Add your bug title here..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            className="input_form"
            placeholder="Add your bug content here..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button className="label_btn" type="submit">
            Add
          </button>
        </form>
      )}
    </React.Fragment>
  );
}
