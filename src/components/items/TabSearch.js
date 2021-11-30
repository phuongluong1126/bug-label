import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetTab } from "../../actions/bugReport";
import BugReport from "./BugReport";
import "./TabSearch.css";

export default function TabSearch({ listBugReports }) {
  const [toggleState, setToggleState] = useState(1);
  const dispatch = useDispatch();
  const problemList = listBugReports.filter((item) => {
    let count = 0;
    item.forEach((unit) => {
      if (unit.result_label === 1) count++;
      item["count"] = count;
    });
    return item["count"] > 0;
  });
  const solutionList = listBugReports.filter((item) => {
    let count = 0;
    item.forEach((unit) => {
      if (unit.result_label === 2) count++;
      item["count"] = count;
    });
    return item["count"] > 0;
  });
  const otherList = listBugReports.filter((item) => {
    let count = 0;
    item.forEach((unit) => {
      if (unit.result_label === 3) count++;
      item["count"] = count;
    });
    return item["count"] > 0;
  });
  // console.log("problemList", problemList);
  // console.log("solutionList", solutionList);
  // console.log("otherList", otherList);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc_tabs">
        <button
          className={
            toggleState === 1 ? "tabs active-tabs all_tab" : "tabs tab1 "
          }
          onClick={() => {
            toggleTab(1);
            dispatch(SetTab("all"))
          }}
        >
          All
        </button>
        <button
          className={
            toggleState === 2 ? "tabs active-tabs problem_tab" : "tabs tab2"
          }
          onClick={() => {
            toggleTab(2);
             dispatch(SetTab("problem"))
          }}
        >
          Problem
        </button>
        <button
          className={
            toggleState === 3 ? "tabs active-tabs solution_tab" : "tabs tab3"
          }
          onClick={() => {
            toggleTab(3);
             dispatch(SetTab("solution"))
          }}
        >
          Solution
        </button>

        <button
          className={
            toggleState === 4 ? "tabs active-tabs other_tab" : "tabs tab4"
          }
          onClick={() => {
            toggleTab(4);
            dispatch(SetTab("other"))

          }}
        >
          Other
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {listBugReports.length > 0 ? (
            listBugReports.map((item, index) => (
              <BugReport bugReport={item} filter="all" key={index} />
            ))
          ) : (
            <h2 className="No-result">No result found :(</h2>
          )}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {problemList.length > 0 ? (
            problemList.map((item, index) => (
              <BugReport bugReport={item} filter="problem" key={index} />
            ))
          ) : (
            <h2 className="No-result">No result found :(</h2>
          )}
        </div>
        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {solutionList.length > 0 ? (
            solutionList.map((item, index) => (
              <BugReport bugReport={item} filter="solution" key={index} />
            ))
          ) : (
            <h2 className="No-result">No result found :(</h2>
          )}
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          {otherList.length > 0 ? (
            otherList.map((item, index) => <BugReport bugReport={item} filter="other" key={index}  />)
          ) : (
            <h2 className="No-result">No result found :(</h2>
          )}
        </div>
      </div>
    </div>
  );
}
